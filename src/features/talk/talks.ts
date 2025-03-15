import { type CollectionEntry, getCollection } from 'astro:content';
import { JSDOM } from 'jsdom';
import { ofetch } from 'ofetch';

export async function getTalks() {
	const talks = await getCollection('talks');
	return talks;
}

const SPEAKERDECK_URL_REGEXP = /https:\/\/speakerdeck.com\/ikumatadokoro\/(.+)/;
export const getTalkId = (talk: CollectionEntry<'talks'>) => {
	const match = talk.data.guid.match(SPEAKERDECK_URL_REGEXP);
	return match ? match[1] : '';
};

export async function groupByTalkYear(talks: Array<CollectionEntry<'talks'>>) {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	return Map.groupBy(talks, (talk) => talk.data.pubdate!.getFullYear());
}

/**
 * SpeakderDeckのURLから埋め込み用のURLを取得する
 */
export async function getTalkEmbedUrl(
	talkUrl: CollectionEntry<'talks'>['data']['link'],
	slideTitle: string,
	loading: 'lazy' | 'eager' = 'eager',
) {
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
		style: {
			border: '0px',
			background: 'padding-box padding-box rgba(0, 0, 0, 0.1)',
			margin: '0px',
			padding: '0px',
			borderRadius: '6px',
			boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 40px',
			width: '100%',
			height: 'auto',
			aspectRatio: '560 / 315',
		},
		loading,
	});
	return iframe;
}

export function buildUrl(id: string) {
	return `/talk/${id}`;
}

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<DeepPartial<U>>
		: T[P] extends ReadonlyArray<infer UU>
			? ReadonlyArray<DeepPartial<UU>>
			: DeepPartial<T[P]>;
};

function appendAttributeToIframe(
	html: string,
	attribute: DeepPartial<HTMLIFrameElement>,
) {
	const {
		window: { document },
	} = new JSDOM(html);
	const iframe = document.querySelector('iframe');
	if (iframe) {
		for (const [key, value] of Object.entries(attribute)) {
			if (value) {
				if (typeof value === 'object') {
					// 動的にStyleを設定する。aspect-ratioのようなハイフンを含むプロパティはキャメルケースからハイフン区切りに変換する
					const style = Object.entries(value).map(([key, value]) => {
						const hyphenKey = key.replace(
							/([A-Z])/g,
							(match) => `-${match.toLowerCase()}`,
						);
						return `${hyphenKey}:${value}`;
					});
					iframe.setAttribute('style', style.join(';'));
				} else {
					iframe.setAttribute(key, value.toString());
				}
			}
		}
	}

	return document.body.innerHTML;
}

function removeAttributeFromIframe(
	html: string,
	attributes: Array<keyof HTMLIFrameElement>,
) {
	const {
		window: { document },
	} = new JSDOM(html);
	const iframe = document.querySelector('iframe');
	if (iframe) {
		for (const attribute of attributes) {
			iframe.removeAttribute(attribute);
		}
	}

	return document.body.innerHTML;
}
