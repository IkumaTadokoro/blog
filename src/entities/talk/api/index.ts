import { getCollection } from 'astro:content';
import { ofetch } from 'ofetch';
import type { DeepPartial } from '../../../shared/lib/deep-partial';
import {
	appendAttributeToIframe,
	removeAttributeFromIframe,
} from '../../../shared/lib/iframe';
import { buildMarkdownContent } from '../../../shared/lib/markdown';
import type { TalkEntry } from '../model/schema';

export const getTalks = async () => {
	const talks = await getCollection('talks');
	return talks;
};

export const groupByTalkYear = async (talks: Array<TalkEntry>) => {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	return Map.groupBy(talks, (talk) => talk.data.pubdate!.getFullYear());
};

type GetTalkResult = {
	slideIframeString: string;
	entry: TalkEntry;
};

export const getTalk = async (entry: TalkEntry): Promise<GetTalkResult> => {
	const iframe = await getTalkEmbedUrl(entry.data.link, entry.data.title ?? '');
	const markdownContent = await buildMarkdownContent(entry.data.description ?? '');
	return {
		slideIframeString: iframe,
		entry: {
			...entry,
			rendered: {
				html: markdownContent,
			},
		},
	};
};

/**
 * SpeakerDeckのURLから埋め込み用のURLを取得する
 */
const getTalkEmbedUrl = async (
	talkUrl: TalkEntry['data']['link'],
	slideTitle: string,
	loading: 'lazy' | 'eager' = 'eager',
) => {
	const data = await ofetch<{
		type: string;
		version: string;
		provider_name: string;
		provider_url: string;
		title: string;
		author_name: string;
		author_url: string;
		html: string;
		width: string;
		height: string;
	}>('oembed.json', {
		baseURL: 'https://speakerdeck.com/',
		query: {
			url: talkUrl,
		},
	});
	const title = `プレゼンテーションスライド：${slideTitle}`;
	const noWidthHeightIframe = removeAttributeFromIframe(data.html, [
		'width',
		'height',
		'style',
	]);
	const iframe = appendAttributeToIframe(noWidthHeightIframe, {
		title,
		style: talkIframeStyle,
		loading,
	});
	return iframe;
};

const talkIframeStyle: DeepPartial<CSSStyleDeclaration> = {
	border: '0px',
	background: 'padding-box padding-box rgba(0, 0, 0, 0.1)',
	margin: '0px',
	padding: '0px',
	borderRadius: '6px',
	boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 40px',
	width: '100%',
	height: 'auto',
	aspectRatio: '560 / 315',
};
