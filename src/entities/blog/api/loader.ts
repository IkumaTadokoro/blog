import { glob, type Loader } from 'astro/loaders';

export const loader: Loader = glob({
	pattern: '**/*.(md|mdx)',
	base: './src/data/blog',
});
