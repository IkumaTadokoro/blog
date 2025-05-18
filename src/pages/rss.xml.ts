import type { APIContext } from 'astro';
import { listBlog } from '../entities/blog/api';
import { buildRssFeed } from '../features/rss/model/rss-item';

export async function GET(context: APIContext) {
	if (!context.site) throw new TypeError('context.site is required');
	const blog = await listBlog();
	const feed = await buildRssFeed(blog, context.site);

	return feed;
}
