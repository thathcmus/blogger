/**
 * scripts/build.js
 * Commercial-grade Single-File Bundler & Synchronizer for Tech Blogger Widgets.
 *
 * Workflow:
 * 1. Reads clean source files from `src/widget_*.html`.
 * 2. Compiles modular content from `src/data/<topic>/questions.json`.
 * 3. Injects compiled data into the distribution bundles.
 * 4. Outputs production artifacts to `dist/widget_*.html` and mirrors to root `widget_*.html`.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function getTopicName(widgetFileName) {
    return widgetFileName.replace(/^widget_/, '').replace(/\.html$/i, '');
}

function buildWidgets() {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    if (!fs.existsSync(SRC_DIR)) {
        console.error('❌ [BUILD ERROR] src directory not found!');
        return false;
    }

    const srcFiles = fs.readdirSync(SRC_DIR).filter(f => f.startsWith('widget_') && f.endsWith('.html'));

    let count = 0;
    for (const file of srcFiles) {
        const topic = getTopicName(file);
        const srcPath = path.join(SRC_DIR, file);
        const distPath = path.join(DIST_DIR, file);
        const rootPath = path.join(ROOT_DIR, file);

        let html = fs.readFileSync(srcPath, 'utf8');

        // Check if data exists for this widget
        const qaDataJsonPath = path.join(SRC_DIR, 'data', topic, 'questions.json');
        if (fs.existsSync(qaDataJsonPath)) {
            try {
                const rawJson = fs.readFileSync(qaDataJsonPath, 'utf8');
                const parsed = JSON.parse(rawJson);
                if (Array.isArray(parsed)) {
                    const syncRegex = /(\/\*\s*QA_DATA_AUTO_SYNC_START\s*\*\/)[\s\S]*?(\/\*\s*QA_DATA_AUTO_SYNC_END\s*\*\/)/;
                    if (syncRegex.test(html)) {
                        const compiledBlock = `/* QA_DATA_AUTO_SYNC_START */\n        const qaData = ${JSON.stringify(parsed, null, 4)};\n        /* QA_DATA_AUTO_SYNC_END */`;
                        html = html.replace(syncRegex, compiledBlock);
                        console.log(`📦 [COMPILED] ${parsed.length} questions from src/data/${topic}/questions.json into ${file}`);
                    }
                }
            } catch (err) {
                console.error(`❌ [BUILD JSON ERROR] ${qaDataJsonPath}: ${err.message}`);
                return false;
            }
        }

        // Write to dist/
        fs.writeFileSync(distPath, html, 'utf8');
        // Mirror to root for GitHub Pages live links
        fs.writeFileSync(rootPath, html, 'utf8');

        count++;
    }

    console.log(`✨ [BUILD SUCCESS] Compiled ${count} widget(s) to dist/ and root!`);
    return true;
}

if (require.main === module) {
    buildWidgets();
}

module.exports = { buildWidgets };
