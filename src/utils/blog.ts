import { loadRenderers } from 'astro:container';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { render } from 'astro:content';
import { getContainerRenderer } from '@astrojs/mdx';
import type { RSSFeedItem } from '@astrojs/rss';
import { experimental_AstroContainer } from 'astro/container';
import sanitizeHtml from 'sanitize-html';
import { SITE } from '../config';

export type Collections = Array<CollectionEntry<'blog'>>;

export async function getBlogs() {
	const posts = await getCollection('blog', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
	return sortByDate(posts);
}

export function sortByDate(collections: Collections) {
	return collections.sort(
		(a, b) =>
			new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime(),
	);
}

export function buildUrl(id: string) {
	return `/blog/${id}`;
}

export async function buildRssItem(post: CollectionEntry<'blog'>): Promise<RSSFeedItem> {
	const container = await experimental_AstroContainer.create({
		renderers: await loadRenderers([getContainerRenderer()]),
	});
	const content = await container.renderToString((await render(post)).Content);
	const sanitizedContent = sanitizeHtml(content, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
	});
	const rawText = sanitizedContent.replace(/<\/?[^>]+(>|$)/g, '');
	const plainText = rawText.replace(/\s+/g, '').trim();
	const summary = plainText.slice(0, 100);

	const rssItem: RSSFeedItem = {
		title: post.data.title,
		description: summary,
		link: buildUrl(post.id),
		pubDate: post.data.publishDate,
		content: sanitizedContent,
		author: SITE.author,
	};

	return rssItem;
}
