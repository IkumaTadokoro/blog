import { defineCollection, z } from 'astro:content';
import { feedLoader } from '@ascorbic/feed-loader';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/*.(md|mdx)', base: './src/data/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		publishDate: z.date(),
		category: z.enum(['tech', 'idea', 'life']).default('idea'),
		draft: z.boolean().default(true),
		tags: z.optional(z.array(z.string())),
	}),
});

const talks = defineCollection({
	loader: feedLoader({
		url: 'https://speakerdeck.com/ikumatadokoro.rss',
	}),
});

export const collections = {
	blog: blogCollection,
	talks,
};
