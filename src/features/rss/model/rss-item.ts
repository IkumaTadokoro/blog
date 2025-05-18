import { loadRenderers } from 'astro:container';
import { render } from 'astro:content';
import { getContainerRenderer } from '@astrojs/mdx';
import type { RSSFeedItem } from '@astrojs/rss';
import rss from '@astrojs/rss';
import { experimental_AstroContainer } from 'astro/container';
import sanitizeHtml from 'sanitize-html';
import type { BlogEntry } from '../../../entities/blog/model/schema';
import { SITE } from '../../../shared/config/site';

export const buildRssFeed = async (blogCollections: Array<BlogEntry>, siteURL: URL) => {
	const items = await Promise.all(
		blogCollections.map(async (post) => buildRssItem(post)),
	);
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: siteURL,
		items,
	});
};

type RssItem = Required<
	Pick<RSSFeedItem, 'title' | 'description' | 'link' | 'pubDate' | 'content' | 'author'>
>;

export const buildRssItem = async (blogCollections: BlogEntry): Promise<RssItem> => {
	const container = await experimental_AstroContainer.create({
		renderers: await loadRenderers([getContainerRenderer()]),
	});
	const content = await container.renderToString((await render(blogCollections)).Content);
	const sanitizedContent = sanitizeHtml(content, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
	});
	const rawText = sanitizedContent.replace(/<\/?[^>]+(>|$)/g, '');
	const plainText = rawText.replace(/\s+/g, '').trim();
	const summary = plainText.slice(0, 100);

	const rssItem = {
		title: blogCollections.data.title,
		description: summary,
		link: `/blog/${blogCollections.id}`,
		pubDate: blogCollections.data.publishDate,
		content: sanitizedContent,
		author: SITE.author,
	} satisfies RssItem;

	return rssItem;
};
