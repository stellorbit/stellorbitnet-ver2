import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const inputPath = path.join(root, 'docs', 'astro-post-workflow.html');
const outputPath = path.join(root, 'docs', 'astro-post-workflow.pdf');

const edgeCandidates = [
	'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
	'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
	'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
	'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

async function fileExists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function findBrowser() {
	for (const candidate of edgeCandidates) {
		if (await fileExists(candidate)) return candidate;
	}
	throw new Error('Microsoft Edge or Google Chrome was not found.');
}

async function main() {
	const browser = await findBrowser();
	await fs.mkdir(path.dirname(outputPath), { recursive: true });

	const args = [
		'--headless',
		'--disable-gpu',
		'--no-first-run',
		`--print-to-pdf=${outputPath}`,
		`file:///${inputPath.replace(/\\/g, '/')}`,
	];

	await new Promise((resolve, reject) => {
		const child = spawn(browser, args, { stdio: 'inherit' });
		child.on('error', reject);
		child.on('exit', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`PDF generation failed with exit code ${code}.`));
		});
	});

	console.log(`Created ${path.relative(root, outputPath)}`);
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
