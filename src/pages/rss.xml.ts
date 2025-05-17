import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { buildRssItem, getBlogs } from '../features/blog/model/blog';
import { SITE } from '../shared/config/site';

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
