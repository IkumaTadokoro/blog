import { defineCollection } from 'astro:content';
import { feedLoader } from '@ascorbic/feed-loader';
import { loader as blogLoader } from '../entities/blog/api/loader';
import { schema as blogSchema } from '../entities/blog/model/schema';

const blog = defineCollection({
	loader: blogLoader,
	schema: blogSchema,
});

const talks = defineCollection({
	loader: feedLoader({
		url: 'https://speakerdeck.com/ikumatadokoro.rss',
	}),
});

export const collections = {
	blog,
	talks,
};
