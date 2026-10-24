// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { buildMarkdownContent } from '../../../shared/lib/markdown';
import { sanitizeSpeakerDeckIframe, sanitizeTalkDescription } from './sanitize';

describe('sanitizeTalkDescription', () => {
	it('keeps markdown headings, lists, and links', async () => {
		const rendered = await buildMarkdownContent(`## 概要

Nihonbashi.js #9 のLT資料です。

https://nihonbashi-js.connpass.com/event/332328/

## 参考リンク

- [csf](https://github.com/ComponentDriven/csf)
`);
		const sanitized = sanitizeTalkDescription(rendered);

		expect(sanitized).toContain('<h2 id="概要">概要</h2>');
		expect(sanitized).toContain(
			'<a href="https://nihonbashi-js.connpass.com/event/332328/">https://nihonbashi-js.connpass.com/event/332328/</a>',
		);
		expect(sanitized).toContain(
			'<a href="https://github.com/ComponentDriven/csf">csf</a>',
		);
		expect(sanitized).toContain('<ul>');
	});

	it('strips scripts, event handlers, and javascript urls from markdown html', async () => {
		const rendered = await buildMarkdownContent(
			'<img src="x" onerror="alert(1)"> <script>alert(2)</script> [x](javascript:alert(3))',
		);
		const sanitized = sanitizeTalkDescription(rendered);

		expect(rendered).toContain('onerror');
		expect(rendered).toContain('<script>');
		expect(rendered).toContain('javascript:');
		expect(sanitized).not.toContain('onerror');
		expect(sanitized).not.toContain('<script');
		expect(sanitized).not.toContain('<img');
		expect(sanitized).not.toContain('javascript:');
		expect(sanitized).toContain('>x</a>');
	});
});

describe('sanitizeSpeakerDeckIframe', () => {
	it('keeps a speakerdeck iframe and drops layout attributes from oEmbed', () => {
		const html =
			'<iframe id="talk_frame_1" class="speakerdeck-iframe" src="https://speakerdeck.com/player/abc" width="710" height="399" style="border:0" frameborder="0" allowtransparency="true" allowfullscreen="allowfullscreen"></iframe>';
		const sanitized = sanitizeSpeakerDeckIframe(html);

		expect(sanitized).toContain('src="https://speakerdeck.com/player/abc"');
		expect(sanitized).toContain('allowfullscreen="allowfullscreen"');
		expect(sanitized).toContain('frameborder="0"');
		expect(sanitized).not.toContain('talk_frame_1');
		expect(sanitized).not.toContain('speakerdeck-iframe');
		expect(sanitized).not.toContain('width=');
		expect(sanitized).not.toContain('style=');
		expect(sanitized).not.toContain('allowtransparency');
	});

	it('keeps protocol-relative speakerdeck player urls', () => {
		const sanitized = sanitizeSpeakerDeckIframe(
			'<iframe src="//speakerdeck.com/player/abc"></iframe>',
		);

		expect(sanitized).toContain('src="//speakerdeck.com/player/abc"');
	});

	it('drops iframes whose host is not speakerdeck.com', () => {
		const sanitized = sanitizeSpeakerDeckIframe(
			[
				'<iframe src="https://evil.example/embed"></iframe>',
				'<iframe src="https://speakerdeck.com.evil.com/player/abc"></iframe>',
				'<iframe src="https://www.speakerdeck.com/player/abc"></iframe>',
				'<iframe src="https://player.speakerdeck.com/embed"></iframe>',
				'<iframe src="javascript:alert(1)"></iframe>',
				'<script>alert(1)</script>',
			].join(''),
		);

		expect(sanitized).not.toContain('<iframe');
		expect(sanitized).not.toContain('evil');
		expect(sanitized).not.toContain('script');
		expect(sanitized).not.toContain('javascript:');
	});
});
