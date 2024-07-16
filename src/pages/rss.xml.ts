import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { buildRssItem, getBlogs } from '../utils/blog';

export async function GET(context: APIContext) {
	if (!context.site) {
		throw new TypeError('context.site is required');
	}
	const blog = await getBlogs();
	const items = await Promise.all(blog.map(async (post) => buildRssItem(post)));

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site,
		items,
	});
}
