import sanitizeHtml from 'sanitize-html';

const SPEAKERDECK_HOSTNAME = 'speakerdeck.com';

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

/**
 * SpeakerDeck の description を Markdown 変換したあとの HTML を無害化する。
 * 見出しの id は Markdown 処理が付与するもので、表示中のフラグメントを保つ。
 */
export const sanitizeTalkDescription = (html: string) =>
	sanitizeHtml(html, {
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			...Object.fromEntries(headingTags.map((tag) => [tag, ['id']])),
		},
	});

/**
 * oEmbed の HTML から speakerdeck.com の iframe だけを残す。
 * 許可されない iframe は src ごと落とす。
 */
export const sanitizeSpeakerDeckIframe = (html: string) =>
	sanitizeHtml(html, {
		allowedTags: ['iframe'],
		allowedAttributes: {
			iframe: ['src', 'allowfullscreen', 'frameborder'],
		},
		allowedSchemes: ['https'],
		allowedIframeHostnames: [SPEAKERDECK_HOSTNAME],
		exclusiveFilter: (frame) => frame.tag === 'iframe' && !frame.attribs.src,
	});
