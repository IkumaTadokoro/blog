---
title: "remarkでtableのMarkdownを解釈できるようにする"
description: "過去ブログからの移行記事"
publishDate: 2022-05-28

tags: []
draft: false
---


## tableはCommonMarkdownではない

このブログはremarkを使用してMarkdownをパースしているわけですが、tableを投稿してみたところ原文のまま表示されてしまいました。

![](../../assets/images/support-table-markdown-in-remark/unsupported-table.png)

なんでかな〜と思って調べてみると、[unifiedjsのドキュメント](https://unifiedjs.com/learn/recipe/remark-table/)に

> Tables are a non-standard feature in markdown: they are not defined in CommonMark and will not work everywhere.

という記述を見つけました。tableのスタイルってGitHub Flavored Markdownなんですね〜。というわけでGitHub Flavored Markdownもパースできるように改修していきます。

## remark-gfmを適用する

```bash
yarn add remark-gfm
```

```typescript
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
// remarkGfmを追加する
import remarkGfm from 'remark-gfm'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: false }).use(prism).use(remarkGfm).process(markdown)
  return result.toString()
}
```

ここまでで、tableタグとして解釈されるようになりました。

![](../../assets/images/support-table-markdown-in-remark/suppor-table-by-gfm.png)

## スタイルを適用する

シンプルに`table`関連タグが適用されているだけなので、それに従ってスタイルを適用します。このブログではTailwind CSSを利用しているので、次のような感じです。

```css
table {
  @apply w-full text-sm text-left text-gray-500 overflow-x-auto shadow-md sm:rounded-lg;
}

thead {
  @apply text-sm text-gray-700 bg-gray-50;
}

th {
  @apply px-6 py-3;
}

tr {
  @apply border-b;
}

td {
  @apply px-6 py-3;
}
```

これでいい感じにテーブルが表示されるようになりました。

![](../../assets/images/support-table-markdown-in-remark/styled-table.png)
