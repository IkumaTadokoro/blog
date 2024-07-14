import { getCollection } from 'astro:content';

// 記事一覧を取得。開発環境では下書きも取得する
const blogEntries = await getCollection('blog', ({ data }) => {
	return import.meta.env.PROD ? data.draft !== true : true;
});
const sortedBlogEntries = blogEntries.sort((a, b) => {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
});

export { sortedBlogEntries };
