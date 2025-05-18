import { feedLoader } from '@ascorbic/feed-loader';
import { SOCIAL_ACCOUNT } from '../../../shared/config/site';

export const loader = feedLoader({
	url: `${SOCIAL_ACCOUNT.SpeakerDeck}.rss`,
});
