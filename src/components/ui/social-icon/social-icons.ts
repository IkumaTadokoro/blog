import Github from './icons/Github.svg';
import SizuMe from './icons/SizuMe.svg';
import SpeakerDeck from './icons/SpeakerDeck.svg';
import X from './icons/X.svg';
import Zenn from './icons/Zenn.svg';

export const socialIcons = {
	Github,
	X,
	Zenn,
	SpeakerDeck,
	SizuMe,
};

export type SocialIcon = keyof typeof socialIcons;

type SocialObjects = {
	[name in keyof typeof socialIcons]: {
		href: string;
		linkTitle: string;
	};
};

export const socials: SocialObjects = {
	Github: {
		href: 'https://github.com/IkumaTadokoro',
		linkTitle: 'GitHub',
	},
	X: {
		href: 'https://x.com/ikumatdkr',
		linkTitle: 'X',
	},
	Zenn: {
		href: 'https://zenn.dev/ikuma',
		linkTitle: 'Zenn',
	},
	SpeakerDeck: {
		href: 'https://speakerdeck.com/ikumatadokoro',
		linkTitle: 'SpeakerDeck',
	},
	SizuMe: {
		href: 'https://sizu.me/ikuma',
		linkTitle: 'しずかなインターネット',
	},
};
