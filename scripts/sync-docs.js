/**
 * scripts/sync-docs.js
 * Automated Verification, Documentation Synchronization & Invariant Enforcement Script.
 *
 * Capabilities:
 * 1. AUTOMATED BUILD: Runs buildWidgets() to compile modular src/ + src/data/ into dist/ and root.
 * 2. DYNAMIC AUTO-DISCOVERY: Scans src/ and root for all `widget_*.html` files.
 * 3. ATOMIC UNIT INVARIANT: Enforces that every widget has corresponding `docs/<topic>/CURRENT_INFO.md`
 *    and `docs/<topic>/BACKLOG.md`. Fails hard (Exit 1) if missing.
 * 4. SHOWCASE INVARIANT: Enforces that every widget is listed in `README.md` and `README.vi.md` showcase tables.
 * 5. JAVASCRIPT SYNTAX VERIFICATION: Validates syntax of all internal script blocks using Node.js Function parser.
 * 6. METRICS AUTO-SYNC: Updates exact line counts and current date into each `CURRENT_INFO.md`.
 * 7. GIT AUTO-STAGE: Automatically stages modified documentation & source files if `--git-add` flag is provided.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildWidgets } = require('./build');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const shouldGitAdd = process.argv.includes('--git-add');

// Format a number with commas (e.g., 2929 -> "2,929")
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Get today's local date in YYYY-MM-DD format
function getTodayDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Validate JavaScript syntax inside <script> tags
function validateJsSyntax(htmlContent, fileName) {
    const scriptMatches = htmlContent.match(/<script(?:\s+type="text\/javascript")?>([\s\S]*?)<\/script>/gi);
    if (!scriptMatches) {
        console.warn(`⚠️ [WARN] No <script> tags found in ${fileName}`);
        return true;
    }

    for (let i = 0; i < scriptMatches.length; i++) {
        const scriptTag = scriptMatches[i];
        // Skip external scripts with src attribute
        if (/src\s*=/i.test(scriptTag.slice(0, scriptTag.indexOf('>') + 1))) {
            continue;
        }

        const jsContent = scriptTag.replace(/<script[\s\S]*?>/i, '').replace(/<\/script>/i, '');
        if (!jsContent.trim()) continue;

        try {
            new Function(jsContent);
        } catch (err) {
            console.error(`\n❌ [SYNTAX ERROR] Failed in ${fileName} (Script block #${i + 1}):`);
            console.error(`   ${err.message}`);
            return false;
        }
    }
    return true;
}

// Derive topic name from widget filename (e.g., "widget_can_fd.html" -> "can_fd")
function getTopicName(widgetFileName) {
    return widgetFileName.replace(/^widget_/, '').replace(/\.html$/i, '');
}

// Sync single widget metrics and verify atomic invariants
function processWidget(widgetFileName, readmeContent, readmeViContent) {
    let hasError = false;
    const topic = getTopicName(widgetFileName);
    const rootHtmlPath = path.join(ROOT_DIR, widgetFileName);
    const srcHtmlPath = path.join(SRC_DIR, widgetFileName);
    const docsDir = path.join(ROOT_DIR, 'docs', topic);
    const currentInfoPath = path.join(docsDir, 'CURRENT_INFO.md');
    const backlogPath = path.join(docsDir, 'BACKLOG.md');

    // 1. Check Root & Src HTML exists
    if (!fs.existsSync(rootHtmlPath)) {
        console.error(`❌ [FILE NOT FOUND] Root widget HTML missing: ${widgetFileName}`);
        return false;
    }

    if (!fs.existsSync(srcHtmlPath)) {
        console.error(`❌ [FILE NOT FOUND] Source widget HTML missing: src/${widgetFileName}`);
        return false;
    }

    const rootHtml = fs.readFileSync(rootHtmlPath, 'utf8');
    const srcHtml = fs.readFileSync(srcHtmlPath, 'utf8');

    const lineCount = rootHtml.split('\n').length;
    const formattedLines = formatNumber(lineCount);
    const srcLineCount = srcHtml.split('\n').length;
    const formattedSrcLines = formatNumber(srcLineCount);

    // 2. Validate JS Syntax on both Source and Compiled bundle
    const isSrcSyntaxValid = validateJsSyntax(srcHtml, `src/${widgetFileName}`);
    const isRootSyntaxValid = validateJsSyntax(rootHtml, widgetFileName);

    if (!isSrcSyntaxValid || !isRootSyntaxValid) {
        hasError = true;
    }

    // Extract Q&A count if available
    const qaMatch = rootHtml.match(/id:\s*["']q_[a-zA-Z0-9_]+["']/g);
    const qaCount = qaMatch ? qaMatch.length : 0;
    const qaInfo = qaCount > 0 ? ` | Q&A Items: ${qaCount}` : '';

    if (isSrcSyntaxValid && isRootSyntaxValid) {
        console.log(`✅ [${widgetFileName}] Syntax OK | Src Lines: ${formattedSrcLines} | Dist Lines: ${formattedLines}${qaInfo}`);
    }

    // 3. Invariant: Check Atomic Unit Documents
    if (!fs.existsSync(currentInfoPath)) {
        console.error(`❌ [INVARIANT VIOLATION] Missing docs/${topic}/CURRENT_INFO.md for ${widgetFileName}!`);
        console.error(`   👉 Every widget must have a corresponding CURRENT_INFO.md.`);
        hasError = true;
    }

    if (!fs.existsSync(backlogPath)) {
        console.error(`❌ [INVARIANT VIOLATION] Missing docs/${topic}/BACKLOG.md for ${widgetFileName}!`);
        console.error(`   👉 Every widget must have a corresponding BACKLOG.md.`);
        hasError = true;
    }

    // 4. Invariant: Check Showcase Tables in README.md & README.vi.md
    if (!readmeContent.includes(widgetFileName)) {
        console.error(`❌ [INVARIANT VIOLATION] ${widgetFileName} is NOT listed in README.md showcase table!`);
        hasError = true;
    }
    if (!readmeViContent.includes(widgetFileName)) {
        console.error(`❌ [INVARIANT VIOLATION] ${widgetFileName} is NOT listed in README.vi.md showcase table!`);
        hasError = true;
    }

    // 5. If CURRENT_INFO.md exists, sync line count & date
    if (fs.existsSync(currentInfoPath)) {
        let docContent = fs.readFileSync(currentInfoPath, 'utf8');
        const today = getTodayDate();
        let modified = false;

        // A. Update line count in Version description: tổng cộng X dòng code
        const versionLineRegex = /(\* \*\*Phiên bản hiện tại\*\*:.*?)tổng cộng\s+[\d,]+\s+dòng code/g;
        if (versionLineRegex.test(docContent)) {
            docContent = docContent.replace(versionLineRegex, `$1tổng cộng ${formattedLines} dòng code`);
            modified = true;
        }

        // B. Update date: * **Ngày cập nhật**: `YYYY-MM-DD`
        const dateRegex = /(\* \*\*Ngày cập nhật\*\*:\s*`)(\d{4}-\d{2}-\d{2})(`)/g;
        if (dateRegex.test(docContent)) {
            docContent = docContent.replace(dateRegex, `$1${today}$3`);
            modified = true;
        }

        // C. Update line count in Section 4 summary if present
        const section4Regex = /(File tổng cộng\s+)[\d,]+(\s+dòng)/g;
        if (section4Regex.test(docContent)) {
            docContent = docContent.replace(section4Regex, `$1${formattedLines}$2`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(currentInfoPath, docContent, 'utf8');
            console.log(`📄 [SYNC] docs/${topic}/CURRENT_INFO.md updated (lines: ${formattedLines}, date: ${today}).`);
            if (shouldGitAdd) {
                try {
                    execSync(`git add "${currentInfoPath}"`, { cwd: ROOT_DIR });
                    console.log(`📌 [GIT] Staged docs/${topic}/CURRENT_INFO.md`);
                } catch (gitErr) {
                    console.warn(`[WARN] Failed to git add ${currentInfoPath}:`, gitErr.message);
                }
            }
        } else {
            console.log(`📄 [UP-TO-DATE] docs/${topic}/CURRENT_INFO.md is up to date.`);
        }
    }

    return !hasError;
}

// Main execution flow
function main() {
    console.log('====================================================');
    console.log('🏗️ RUNNING COMPILATION (src/ -> dist/ & root)');
    console.log('====================================================');

    const buildOk = buildWidgets();
    if (!buildOk) {
        console.error('❌ Build failed!');
        process.exit(1);
    }

    console.log('\n====================================================');
    console.log('🔍 RUNNING PRE-COMMIT VERIFICATION & DOCS AUTO-SYNC');
    console.log('====================================================');

    // 1. Dynamic Auto-Discovery of widgets
    const rootEntries = fs.readdirSync(ROOT_DIR);
    const widgetFiles = rootEntries.filter(file => file.startsWith('widget_') && file.endsWith('.html')).sort();

    if (widgetFiles.length === 0) {
        console.error('❌ [ERROR] No widget_*.html files found in repository root!');
        process.exit(1);
    }

    console.log(`🔎 Discovered ${widgetFiles.length} widget(s): ${widgetFiles.join(', ')}\n`);

    // 2. Read READMEs for showcase invariant verification
    const readmePath = path.join(ROOT_DIR, 'README.md');
    const readmeViPath = path.join(ROOT_DIR, 'README.vi.md');

    const readmeContent = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '';
    const readmeViContent = fs.existsSync(readmeViPath) ? fs.readFileSync(readmeViPath, 'utf8') : '';

    if (!readmeContent || !readmeViContent) {
        console.warn('⚠️ [WARN] README.md or README.vi.md missing or empty.');
    }

    // 3. Process each widget
    let overallSuccess = true;
    for (const widgetFileName of widgetFiles) {
        const isOk = processWidget(widgetFileName, readmeContent, readmeViContent);
        if (!isOk) {
            overallSuccess = false;
        }
    }

    // Auto-stage all generated / updated files if --git-add
    if (shouldGitAdd) {
        try {
            execSync('git add dist/ src/ widget_*.html package.json', { cwd: ROOT_DIR });
        } catch (e) {}
    }

    console.log('\n----------------------------------------------------');
    if (overallSuccess) {
        console.log('🎉 ALL CHECKS PASSED: JavaScript Syntax OK, Docs Synchronized & Invariants Verified!');
        console.log('====================================================\n');
        process.exit(0);
    } else {
        console.error('❌ VERIFICATION FAILED: Please fix syntax or file invariant issues listed above!');
        console.log('====================================================\n');
        process.exit(1);
    }
}

main();
