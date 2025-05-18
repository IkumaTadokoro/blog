export const Author = {
	name: 'ikuma-t',
	bio: 'フロントエンドエンジニア',
	portalSite: 'https://bento.me/ikuma',
	social: {
		GitHub: 'https://github.com/IKumaTadokoro',
		X: 'https://x.com/ikumatdkr',
		Zenn: 'https://zenn.dev/ikuma',
		SpeakerDeck: 'https://speakerdeck.com/ikumatadokoro',
		SizuMe: 'https://sizu.me/ikuma',
	},
} as const;

export type SocialAccount = keyof typeof Author.social;
