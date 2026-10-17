/**
 * scripts/pack-context.js
 * Cross-platform LLM Context Packer for Tech Blogger Widgets.
 *
 * Usage:
 *   node scripts/pack-context.js          # Lightweight mode: Architecture & Docs only (~59k tokens)
 *   node scripts/pack-context.js --full   # Full mode: Includes all standalone HTML widgets (~145k tokens)
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');
const isFullMode = process.argv.includes('--full');

console.log('====================================================');
console.log('📦 REPOSITORY CONTEXT PACKER FOR AI');
console.log('====================================================');

const modeText = isFullMode 
    ? 'FULL MODE (Includes HTML widgets, ~145k tokens)' 
    : 'LIGHTWEIGHT MODE (Architecture & Docs only, ~59k tokens)';

console.log(`🚀 Mode: ${modeText}\n`);

let tempConfigFile = null;
try {
    let command = 'npx -y repomix';

    if (isFullMode) {
        tempConfigFile = path.join(ROOT_DIR, '.repomix.full.json');
        fs.writeFileSync(tempConfigFile, JSON.stringify({
            output: { filePath: 'repomix-output.xml', style: 'xml' },
            ignore: {
                useGitignore: true,
                useDefaultPatterns: true,
                customPatterns: ['repomix-output.*', '.repomix.full.json']
            }
        }, null, 2));
        command = `npx -y repomix --config "${tempConfigFile}"`;
    }

    execSync(command, {
        cwd: ROOT_DIR,
        stdio: 'inherit'
    });

    console.log('\n----------------------------------------------------');
    console.log('✅ Context packed successfully: repomix-output.xml');
    console.log('💡 Hướng dẫn sử dụng:');
    console.log('   1. Kéo thả file `repomix-output.xml` lên 4.1 Argon Web / Claude / AI Studio.');
    console.log('   2. Yêu cầu AI Web đóng vai Tech Lead lập Master Plan.');
    console.log('   3. Đưa Master Plan về Antigravity IDE cho Gemini 3.8 Flash thực thi!');
    console.log('====================================================\n');
} catch (error) {
    console.error('❌ [ERROR] Failed to pack repository context:', error.message);
    process.exit(1);
} finally {
    if (tempConfigFile && fs.existsSync(tempConfigFile)) {
        try { fs.unlinkSync(tempConfigFile); } catch (e) {}
    }
}
