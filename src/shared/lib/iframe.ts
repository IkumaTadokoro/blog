import { JSDOM } from 'jsdom';
import type { DeepPartial } from './deep-partial';

export const appendAttributeToIframe = (
	html: string,
	attribute: DeepPartial<HTMLIFrameElement>,
) => {
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
};

export const removeAttributeFromIframe = (
	html: string,
	attributes: Array<keyof HTMLIFrameElement>,
) => {
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
};
