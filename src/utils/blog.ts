import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Collections = Array<CollectionEntry<'blog'>>;

export async function getBlogs() {
	const posts = await getCollection('blog');

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
