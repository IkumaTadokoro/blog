import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface DirectiveNode extends Node {
	name: string;
	data?: Record<string, unknown>;
	children: Array<unknown>;
	attributes?: { title?: string };
}

export const remarkTips: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, 'containerDirective', (node: Node) => {
			const directiveNode = node as DirectiveNode;
			if (directiveNode.name !== 'tip') return;

			if (!directiveNode.data) {
				directiveNode.data = {};
			}
			const data = directiveNode.data;
			const tagName = 'article';

			data.hName = tagName;
			data.hProperties = {
				class:
					'border-l-4 border-muted rounded-rt-md px-6 py-4 mt-8 bg-muted-foreground rounded-r-md',
			};

			// タイトルを h4 要素として最初に追加
			if (directiveNode.attributes?.title) {
				const titleNode = {
					type: 'heading' as const,
					depth: 4 as const,
					children: [{ type: 'text' as const, value: directiveNode.attributes.title }],
					data: {
						hProperties: {
							class: '!mt-2 mb-4',
						},
					},
				};

				directiveNode.children = [titleNode, ...directiveNode.children];
			}
		});
	};
};
