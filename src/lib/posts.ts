import { getCollection } from 'astro:content';
import { astroPosts } from '../content/astro-posts';

export interface ListedPost {
	slug: string;
	title: string;
	description?: string;
	pubDate: Date;
	updatedDate?: Date;
	tags: string[];
	categories: string[];
	link: string;
}

export async function getListedPosts(): Promise<ListedPost[]> {
	const mdxPosts = await getCollection('blog', ({ data }) => !data.draft);
	const normalizedMdxPosts = mdxPosts.map((post) => ({
		slug: post.id,
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		updatedDate: post.data.updatedDate,
		tags: post.data.tags,
		categories: post.data.categories,
		link: `/posts/${post.id}/`,
	}));

	const normalizedAstroPosts = astroPosts
		.filter((post) => !post.draft)
		.map((post) => ({
			slug: post.slug,
			title: post.title,
			description: post.description,
			pubDate: post.pubDate,
			updatedDate: post.updatedDate,
			tags: post.tags,
			categories: post.categories,
			link: `/posts/${post.slug}/`,
		}));

	return [...normalizedMdxPosts, ...normalizedAstroPosts].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
	);
}
