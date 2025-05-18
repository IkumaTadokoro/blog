import { getCollection } from 'astro:content';
import type { BlogEntry } from '../model/schema';

type Filter = (entry: BlogEntry) => boolean;

const defaultFilter: Filter = (entry) => {
	return !(import.meta.env.PROD && entry.data.draft);
};

const sortByDateDesc = (a: BlogEntry, b: BlogEntry) => {
	return new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime();
};

/**
 * ブログ記事をすべて取得します。
 *
 * @params filter - 取得した記事に対するフィルタ。デフォルト：本番環境ではドラフト記事を除外します。
 * @return ブログ記事の一覧。公開日の降順でソートされています。
 */
export async function listBlog(filter: Filter = defaultFilter) {
	const post = await getCollection('blog', filter);
	return post.sort(sortByDateDesc);
}
