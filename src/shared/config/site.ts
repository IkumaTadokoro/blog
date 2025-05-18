type Site = {
	siteUrl: string;
	publishedYear: string;
	author: string;
	description: string;
	title: string;
};

export const SITE = {
	siteUrl: import.meta.env.PROD ? 'https://ikuma-t.com' : 'http://localhost:4321',
	publishedYear: '2024',
	author: 'ikuma-t',
	description: 'プログラマikuma-tの個人サイト',
	title: 'ikuma-t.com',
} as const satisfies Site;

export const SOCIAL_ACCOUNT = {
	GitHub: 'https://github.com/IKumaTadokoro',
	X: 'https://x.com/ikumatdkr',
	Zenn: 'https://zenn.dev/ikuma',
	SpeakerDeck: 'https://speakerdeck.com/ikumatadokoro',
	SizuMe: 'https://sizu.me/ikuma',
} as const;
