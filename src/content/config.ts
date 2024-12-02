import { defineCollection, z } from 'astro:content';
import { feedLoader } from '@ascorbic/feed-loader';
import { type Loader, type LoaderContext, glob } from 'astro/loaders';

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

export const awesomeLoader = (options: { yourApiOptions: string }): Loader => {
	const schema = z.object({
		title: z.string(),
		createdAt: z.date(),
	});

	const load = async (context: LoaderContext) => {
		// 1. データを取得し、必要に応じて加工する
		const apiUrl = 'https://...';
		const data = await fetch(apiUrl);
		const json = await data.json();

		// 2. 取得したデータのバリデーションを行う
		const parsedData = await context.parseData(json);

		// 3. データをStoreに保存する
		const store = context.store;
		store.set({
			id: '1',
			data: parsedData,
		});
	};

	return { name: 'awesomeLoader', schema, load };
};

const diary = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		createdAt: z.date(),
	}),
});

export const collections = {
	blog: blogCollection,
	talks,
};
