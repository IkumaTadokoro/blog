import { createMarkdownProcessor } from '@astrojs/markdown-remark';

export const buildMarkdownContent = async (content: string) => {
	const processor = await createMarkdownProcessor();
	const markdownContent = await processor.render(content);

	return markdownContent.code;
};
