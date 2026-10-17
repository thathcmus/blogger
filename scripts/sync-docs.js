/**
 * scripts/sync-docs.js
 * Automated Verification & Documentation Synchronization Script.
 *
 * Capabilities:
 * 1. Checks JavaScript syntax across all standalone HTML widgets.
 * 2. Extracts exact line counts, QA count, and current date.
 * 3. Synchronizes metrics automatically into corresponding CURRENT_INFO.md docs.
 * 4. Staged updated docs via git if --git-add flag is provided.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const shouldGitAdd = process.argv.includes('--git-add');

// Format a number with commas (e.g., 2673 -> "2,673")
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
        console.warn(`[WARN] No <script> tags found in ${fileName}`);
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
            console.error(err.message);
            return false;
        }
    }
    return true;
}

// Sync CAN FD Widget Docs
function syncCanFdWidget() {
    const htmlPath = path.join(ROOT_DIR, 'widget_can_fd.html');
    const docPath = path.join(ROOT_DIR, 'docs', 'can_fd', 'CURRENT_INFO.md');

    if (!fs.existsSync(htmlPath)) {
        console.error(`[ERROR] File not found: ${htmlPath}`);
        return false;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const isValid = validateJsSyntax(html, 'widget_can_fd.html');
    if (!isValid) return false;

    const lineCount = html.split('\n').length;
    const formattedLines = formatNumber(lineCount);
    const today = getTodayDate();

    // Extract Q&A items count from qaData array
    const qaMatch = html.match(/id:\s*["']q_[a-zA-Z0-9_]+["']/g);
    const qaCount = qaMatch ? qaMatch.length : 0;

    console.log(`✅ [widget_can_fd.html] Syntax OK | Lines: ${formattedLines} | Q&A Items: ${qaCount}`);

    if (fs.existsSync(docPath)) {
        let docContent = fs.readFileSync(docPath, 'utf8');
        let modified = false;

        // 1. Update line count in Version description: tổng cộng X dòng code
        const versionLineRegex = /(\* \*\*Phiên bản hiện tại\*\*:.*?)tổng cộng\s+[\d,]+\s+dòng code/g;
        if (versionLineRegex.test(docContent)) {
            docContent = docContent.replace(versionLineRegex, `$1tổng cộng ${formattedLines} dòng code`);
            modified = true;
        }

        // 2. Update date: * **Ngày cập nhật**: `YYYY-MM-DD`
        const dateRegex = /(\* \*\*Ngày cập nhật\*\*:\s*`)(\d{4}-\d{2}-\d{2})(`)/g;
        if (dateRegex.test(docContent)) {
            docContent = docContent.replace(dateRegex, `$1${today}$3`);
            modified = true;
        }

        // 3. Update line count in Section 4 summary: (File tổng cộng X dòng, 100% comment Tiếng Anh...)
        const section4Regex = /(File tổng cộng\s+)[\d,]+(\s+dòng,\s+100%\s+comment\s+Tiếng\s+Anh)/g;
        if (section4Regex.test(docContent)) {
            docContent = docContent.replace(section4Regex, `$1${formattedLines}$2`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(docPath, docContent, 'utf8');
            console.log(`📄 [SYNC] docs/can_fd/CURRENT_INFO.md updated with line count (${formattedLines}) and date (${today}).`);
            if (shouldGitAdd) {
                try {
                    execSync(`git add "${docPath}"`, { cwd: ROOT_DIR });
                    console.log(`📌 [GIT] Staged docs/can_fd/CURRENT_INFO.md`);
                } catch (gitErr) {
                    console.warn(`[WARN] Failed to git add ${docPath}:`, gitErr.message);
                }
            }
        } else {
            console.log(`📄 [UP-TO-DATE] docs/can_fd/CURRENT_INFO.md is already up to date.`);
        }
    }

    return true;
}

// Sync FlexRay Widget Docs
function syncFlexRayWidget() {
    const htmlPath = path.join(ROOT_DIR, 'widget_flexray.html');
    const docPath = path.join(ROOT_DIR, 'docs', 'flexray', 'CURRENT_INFO.md');

    if (!fs.existsSync(htmlPath)) return true;

    const html = fs.readFileSync(htmlPath, 'utf8');
    const isValid = validateJsSyntax(html, 'widget_flexray.html');
    if (!isValid) return false;

    const lineCount = html.split('\n').length;
    const formattedLines = formatNumber(lineCount);
    console.log(`✅ [widget_flexray.html] Syntax OK | Lines: ${formattedLines}`);

    if (fs.existsSync(docPath)) {
        let docContent = fs.readFileSync(docPath, 'utf8');
        const today = getTodayDate();
        let modified = false;

        // 1. Update line count in Version description: tổng cộng X dòng code
        const versionLineRegex = /(\* \*\*Phiên bản hiện tại\*\*:.*?)tổng cộng\s+[\d,]+\s+dòng code/g;
        if (versionLineRegex.test(docContent)) {
            docContent = docContent.replace(versionLineRegex, `$1tổng cộng ${formattedLines} dòng code`);
            modified = true;
        }

        // 2. Update date: * **Ngày cập nhật**: `YYYY-MM-DD`
        const dateRegex = /(\* \*\*Ngày cập nhật\*\*:\s*`)(\d{4}-\d{2}-\d{2})(`)/g;
        if (dateRegex.test(docContent)) {
            docContent = docContent.replace(dateRegex, `$1${today}$3`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(docPath, docContent, 'utf8');
            console.log(`📄 [SYNC] docs/flexray/CURRENT_INFO.md updated (lines: ${formattedLines}, date: ${today}).`);
            if (shouldGitAdd) {
                try {
                    execSync(`git add "${docPath}"`, { cwd: ROOT_DIR });
                    console.log(`📌 [GIT] Staged docs/flexray/CURRENT_INFO.md`);
                } catch (gitErr) {
                    console.warn(`[WARN] Failed to git add ${docPath}:`, gitErr.message);
                }
            }
        } else {
            console.log(`📄 [UP-TO-DATE] docs/flexray/CURRENT_INFO.md is already up to date.`);
        }
    }

    return true;
}

// Sync C++ OOP Widget Docs
function syncCppOopWidget() {
    const htmlPath = path.join(ROOT_DIR, 'widget_cpp_oop.html');
    const docPath = path.join(ROOT_DIR, 'docs', 'cpp_oop', 'CURRENT_INFO.md');

    if (!fs.existsSync(htmlPath)) return true;

    const html = fs.readFileSync(htmlPath, 'utf8');
    const isValid = validateJsSyntax(html, 'widget_cpp_oop.html');
    if (!isValid) return false;

    const lineCount = html.split('\n').length;
    const formattedLines = formatNumber(lineCount);
    console.log(`✅ [widget_cpp_oop.html] Syntax OK | Lines: ${formattedLines}`);

    if (fs.existsSync(docPath)) {
        let docContent = fs.readFileSync(docPath, 'utf8');
        const today = getTodayDate();
        let modified = false;

        // 1. Update line count in Version description: tổng cộng X dòng code
        const versionLineRegex = /(\* \*\*Phiên bản hiện tại\*\*:.*?)tổng cộng\s+[\d,]+\s+dòng code/g;
        if (versionLineRegex.test(docContent)) {
            docContent = docContent.replace(versionLineRegex, `$1tổng cộng ${formattedLines} dòng code`);
            modified = true;
        }

        // 2. Update date: * **Ngày cập nhật**: `YYYY-MM-DD`
        const dateRegex = /(\* \*\*Ngày cập nhật\*\*:\s*`)(\d{4}-\d{2}-\d{2})(`)/g;
        if (dateRegex.test(docContent)) {
            docContent = docContent.replace(dateRegex, `$1${today}$3`);
            modified = true;
        }

        // 3. Update line count in Section 4 summary (if exists)
        const section4Regex = /(File tổng cộng\s+)[\d,]+(\s+dòng)/g;
        if (section4Regex.test(docContent)) {
            docContent = docContent.replace(section4Regex, `$1${formattedLines}$2`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(docPath, docContent, 'utf8');
            console.log(`📄 [SYNC] docs/cpp_oop/CURRENT_INFO.md updated (lines: ${formattedLines}, date: ${today}).`);
            if (shouldGitAdd) {
                try {
                    execSync(`git add "${docPath}"`, { cwd: ROOT_DIR });
                    console.log(`📌 [GIT] Staged docs/cpp_oop/CURRENT_INFO.md`);
                } catch (gitErr) {
                    console.warn(`[WARN] Failed to git add ${docPath}:`, gitErr.message);
                }
            }
        } else {
            console.log(`📄 [UP-TO-DATE] docs/cpp_oop/CURRENT_INFO.md is already up to date.`);
        }
    }

    return true;
}

// Main execution flow
function main() {
    console.log('====================================================');
    console.log('🔍 RUNNING PRE-COMMIT VERIFICATION & DOCS AUTO-SYNC');
    console.log('====================================================');

    const canFdOk = syncCanFdWidget();
    const flexRayOk = syncFlexRayWidget();
    const cppOopOk = syncCppOopWidget();

    console.log('----------------------------------------------------');
    if (canFdOk && flexRayOk && cppOopOk) {
        console.log('🎉 ALL CHECKS PASSED: JavaScript Syntax OK & Docs Synchronized!');
        console.log('====================================================\n');
        process.exit(0);
    } else {
        console.error('❌ VERIFICATION FAILED: Please fix syntax or file issues above!');
        console.log('====================================================\n');
        process.exit(1);
    }
}

main();
