import type { CollectionEntry } from 'astro:content';

export type TalkEntry = CollectionEntry<'talks'>;

const SPEAKERDECK_URL_REGEXP = /https:\/\/speakerdeck.com\/ikumatadokoro\/(.+)/;

/**
 * feedLoaderから取得されるIDが取得元のURLになるため、URL部分を削除してIDとする
 */
export const TalkID = (talk: TalkEntry) => {
	const match = talk.id.match(SPEAKERDECK_URL_REGEXP);
	return match ? match[1] : '';
};
