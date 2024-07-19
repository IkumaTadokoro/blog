import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
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

export function buildUrl(slug: string) {
	return `/blog/${slug}`;
}

export async function buildRssItem(post: CollectionEntry<'blog'>): Promise<RSSFeedItem> {
	const container = await experimental_AstroContainer.create();
	const content = await container.renderToString((await post.render()).Content);
	const sanitizedContent = sanitizeHtml(content, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
	});
	const rawText = sanitizedContent.replace(/<\/?[^>]+(>|$)/g, '');
	const plainText = rawText.replace(/\s+/g, '').trim();
	const summary = plainText.slice(0, 100);

	const rssItem: RSSFeedItem = {
		title: post.data.title,
		description: summary,
		link: buildUrl(post.slug),
		pubDate: post.data.publishDate,
		content: sanitizedContent,
		author: SITE.author,
	};

	return rssItem;
}
