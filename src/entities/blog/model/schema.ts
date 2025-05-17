import { z } from 'zod';

export const schema = z.object({
	title: z.string(),
	description: z.string().optional(),
	publishDate: z.date(),
	category: z.enum(['tech', 'idea', 'life']).default('idea'),
	draft: z.boolean().default(true),
	tags: z.optional(z.array(z.string())),
});
