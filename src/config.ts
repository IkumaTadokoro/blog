import type { Site } from './types';

export const SITE = {
	siteUrl: import.meta.env.PROD ? 'https://ikuma-t.com' : 'http://localhost:4321',
	publishedYear: '2024',
	author: 'ikuma-t',
	description: 'プログラマikuma-tの個人サイト',
	title: 'ikuma-t.com',
} satisfies Site;
