import type { CollectionEntry } from 'astro:content';

export type TalkEntry = CollectionEntry<'talks'>;

const SPEAKERDECK_URL_REGEXP = /https:\/\/speakerdeck.com\/ikumatadokoro\/(.+)/;

/**
 * feed-loader v2 のエントリ ID は item.id（無ければ url）。
 * SpeakerDeck の guid はスライド URL なので、そのパス部分を ID とする
 */
export const TalkID = (talk: TalkEntry) => {
	const match = talk.id.match(SPEAKERDECK_URL_REGEXP);
	return match ? match[1] : '';
};
