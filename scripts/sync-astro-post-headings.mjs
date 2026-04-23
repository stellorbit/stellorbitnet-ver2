import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

function parseSlugs(argv) {
	const slugIndex = argv.indexOf('--slug');
	if (slugIndex >= 0 && argv[slugIndex + 1]) {
		return new Set([argv[slugIndex + 1]]);
	}
	return null;
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function decodeEntities(value) {
	return value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&#x26;/g, '&');
}

function extractHeadings(article) {
	return [...article.matchAll(/<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)].map((match) => ({
		depth: Number(match[1]),
		slug: match[2],
		text: decodeEntities(match[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()),
	}));
}

function formatHeadings(headings) {
	if (headings.length === 0) return '\t\theadings: [],';
	return `\t\theadings: [
${headings
	.map((heading) => {
		return `\t\t\t{ depth: ${heading.depth}, slug: ${JSON.stringify(heading.slug)}, text: ${JSON.stringify(heading.text)} }`;
	})
	.join(',\n')},
\t\t],`;
}

function findEntryRange(source, slug) {
	const slugMatch = new RegExp(`\\n\\t\\{\\n\\t\\tslug:\\s*['"]${escapeRegExp(slug)}['"]`).exec(source);
	if (!slugMatch) return null;
	const start = slugMatch.index + 1;
	let depth = 0;
	for (let index = start; index < source.length; index += 1) {
		const char = source[index];
		if (char === '{') depth += 1;
		if (char === '}') {
			depth -= 1;
			if (depth === 0) {
				let end = index + 1;
				if (source[end] === ',') end += 1;
				return { start, end };
			}
		}
	}
	return null;
}

function replaceHeadings(entry, headings) {
	const replacement = formatHeadings(headings);
	if (/^\t\theadings:\s*\[/m.test(entry)) {
		const start = entry.search(/^\t\theadings:\s*\[/m);
		const endMatch = /\n\t\t\],?/.exec(entry.slice(start));
		if (!endMatch) throw new Error('Could not find headings end.');
		const end = start + endMatch.index + endMatch[0].length;
		return `${entry.slice(0, start)}${replacement}${entry.slice(end)}`;
	}
	const insertAt = entry.lastIndexOf('\n\t}');
	return `${entry.slice(0, insertAt)}\n${replacement}${entry.slice(insertAt)}`;
}

async function main() {
	const selectedSlugs = parseSlugs(process.argv.slice(2));
	const metaPath = path.join(root, 'src', 'content', 'astro-posts.ts');
	let meta = await fs.readFile(metaPath, 'utf8');
	const slugs = [...meta.matchAll(/\n\t\{\n\t\tslug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
	const targetSlugs = selectedSlugs ? slugs.filter((slug) => selectedSlugs.has(slug)) : slugs;

	for (const slug of targetSlugs) {
		const articlePath = path.join(root, 'src', 'articles', `${slug}.astro`);
		try {
			const article = await fs.readFile(articlePath, 'utf8');
			const headings = extractHeadings(article);
			const range = findEntryRange(meta, slug);
			if (!range) throw new Error(`Metadata not found: ${slug}`);
			const entry = meta.slice(range.start, range.end);
			const updatedEntry = replaceHeadings(entry, headings);
			meta = `${meta.slice(0, range.start)}${updatedEntry}${meta.slice(range.end)}`;
			console.log(`Synced ${slug}: ${headings.length} headings`);
		} catch (error) {
			if (error.code === 'ENOENT') continue;
			throw error;
		}
	}

	await fs.writeFile(metaPath, meta);
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
