import { render } from '../test-util';
import TocButton from './toc-button.astro';

test('toc-button', async () => {
	const { raw } = await render(TocButton, {
		props: {
			title: 'toc',
			headings: [
				{
					depth: 1,
					slug: 'heading-1',
					text: 'heading 1',
				},
			],
		},
		printAsHtml: true,
	});

	expect(raw).toMatchFileSnapshot('./__snapshots__/toc-button.html');
});
