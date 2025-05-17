import { type Loader, glob } from 'astro/loaders';

export const loader: Loader = glob({
	pattern: '**/*.(md|mdx)',
	base: './src/data/blog',
});
