import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import expressiveCode from 'astro-expressive-code';

/*
 * @see https://expressive-code.com/
 */

const expressiveCodeOptions = {
	defaultProps: {
		wrap: true,
	},
	themes: ['github-light', 'github-dark-dimmed'],
	themeCssSelector: (theme) => {
		if (theme.type === 'light') {
			return `[data-theme='light']`;
		}

		return `[data-theme='dark']`;
	},
	plugins: [pluginLineNumbers()],
} satisfies Parameters<typeof expressiveCode>[0];

export const expressiveCodePlugin = expressiveCode(expressiveCodeOptions);
