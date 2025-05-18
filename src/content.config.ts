import { defineCollection } from 'astro:content';
import { loader as blogLoader } from './entities/blog/api/loader';
import { schema as blogSchema } from './entities/blog/model/schema';
import { loader as talkLoader } from './entities/talk/api/loader';

const blog = defineCollection({
	loader: blogLoader,
	schema: blogSchema,
});

const talks = defineCollection({
	loader: talkLoader,
});

export const collections = {
	blog,
	talks,
};
