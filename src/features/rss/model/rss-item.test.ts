// @vitest-environment node
import { getEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import { buildRssItem } from './rss-item';

describe('buildRssItem', async () => {
	const post = await getEntry('blog', 'test');
	it('should return a valid RSS item', async () => {
		if (!post) {
			throw new Error('post not found');
		}
		const rssItem = await buildRssItem(post);

		expect(rssItem.title).eq('テスト用のサンプル記事');
		expect(rssItem.description).toContain(
			'この記事はテスト用に作成した物です。削除しないでください。見出し1',
		);
		expect(rssItem.link).eq('/blog/test');
		expect(rssItem.pubDate).toEqual(new Date('9999-01-01T00:00:00.000Z'));
		expect(rssItem.content).toContain(
			'<p>この記事はテスト用に作成した物です。削除しないでください。</p>',
		);
	});
});
