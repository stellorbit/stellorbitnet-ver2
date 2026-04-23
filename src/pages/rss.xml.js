import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getListedPosts } from '../lib/posts';

export async function GET(context) {
	const posts = await getListedPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: post.pubDate,
			link: post.link,
		})),
	});
}
