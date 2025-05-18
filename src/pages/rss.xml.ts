import type { APIContext } from 'astro';
import { getBlogs } from '../features/blog/model/blog';
import { buildRssFeed } from '../features/rss/model/rss-item';

export async function GET(context: APIContext) {
	if (!context.site) throw new TypeError('context.site is required');
	const blog = await getBlogs();
	const feed = await buildRssFeed(blog, context.site);

	return feed;
}
