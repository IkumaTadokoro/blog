import {
	type ContainerRenderOptions,
	experimental_AstroContainer,
} from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export async function render<T extends AstroComponentFactory>(
	component: T,
	options?: Omit<ContainerRenderOptions, 'props'> & {
		props?: Parameters<T>[0];
		printAsHtml?: boolean;
	},
) {
	const astroContainer = await experimental_AstroContainer.create();
	const contentString = await astroContainer.renderToString(component, options);
	document.body.innerHTML = contentString;

	const content = options?.printAsHtml
		? new DOMParser().parseFromString(contentString, 'text/html').body.firstElementChild
		: contentString;

	return {
		document,
		raw: content,
	};
}
