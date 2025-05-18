import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import expressiveCode from 'astro-expressive-code';

import rehypeAutolinkHeadingsPlugin from 'rehype-autolink-headings';
import rehypeExternalLinksPlugin from 'rehype-external-links';
import rehypeSlugPlugin from 'rehype-slug';

import type { RehypePlugins } from 'astro';

import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import type { Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings';
import type { Options as RehypeExternalLinksOptions } from 'rehype-external-links';

/*
 * @see https://expressive-code.com/
 */

const expressiveCodeOptions = {
	defaultProps: {
		wrap: true,
		showLineNumbers: false,
	},
	themes: ['github-light', 'github-dark-dimmed'],
	themeCssSelector: (theme) => {
		if (theme.type === 'light') {
			return `[data-theme='light']`;
		}

		return `[data-theme='dark']`;
	},
	plugins: [pluginLineNumbers()],
} satisfies Parameters<typeof expressiveCode>[0];

export const expressiveCodePlugin = expressiveCode(expressiveCodeOptions);

export const rehypePlugins: RehypePlugins = [
	rehypeSlugPlugin,
	[
		rehypeAutolinkHeadingsPlugin,
		{ behavior: 'prepend' } satisfies RehypeAutolinkHeadingsOptions,
	],
	[
		rehypeExternalLinksPlugin,
		{
			target: '_blank',
			rel: ['noopener', 'noreferrer'],
		} satisfies RehypeExternalLinksOptions,
	],
];

export const buildMarkdownContent = async (content: string) => {
	const processor = await createMarkdownProcessor();
	const markdownContent = await processor.render(content);

	return markdownContent.code;
};
