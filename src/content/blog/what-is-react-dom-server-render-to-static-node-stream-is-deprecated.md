---
publishDate: 2024-05-01
title: Astro で Warning ReactDOMServer.renderToStaticNodeStream() is deprecated. が出るようになった原因と対応
category: tech
tags:
  - Astro
  - React
  - Today I Learned
---

## Astro で突然非推奨の警告が出るようになった

このサイトは Astro で実装されており、一部コンポーネントに React を使用しています。
ある日を境に、開発サーバの起動ログに以下のような警告が出るようになりました。

```bash
Warning: ReactDOMServer.renderToStaticNodeStream() is deprecated. Use ReactDOMServer.renderToPipeableStream() and wait to `pipe` until the `onAllReady` callback has been called instead.
```

メッセージで検索してみると、同様の Issue が GitHub に起票されており、対応の Pull Request もマージされていました。

https://github.com/withastro/astro/issues/10899

https://github.com/withastro/astro/pull/10893

2024/05/01 時点ではまだリリースされていませんが、数日以内にリリースされると思われるため、@astrojs/react のバージョンアップで修正されると考えられます。

> 2024/05/03 追記: 変更がリリースされ、警告が出なくなりました。
> https://github.com/withastro/astro/blob/HEAD/packages/integrations/react/CHANGELOG.md#332

この記事ではそもそもなぜこの警告が出るようになったのかを調査しました。

## 前提

- astro: 4.7.0
- @astrojs/react 3.3.1
- react 18.3.1
- react-dom 18.3.1

## どの箇所を起因として警告が出るようになったのか

https://github.com/withastro/astro/blob/c238aa81ee91ce85f40740234fe6878faa27dceb/packages/integrations/react/server.js#L153-L173

Astro の react インテグレーションで `ReactDOM.renderToStaticNodeStream()` が使用されている箇所がありました。

https://github.com/facebook/react/pull/28874

https://github.com/facebook/react/blob/main/CHANGELOG.md#react-dom

React 側では 2024/04/25 の 18.3.0 のリリースでこの警告を追加しています。

description を確認すると次の理由から非推奨に指定されたことがわかります。

> This API has been legacy, is not widely used (renderToStaticMarkup is more common) and has semantically eqiuvalent implementations with renderToReadableStream and renderToPipeableStream.

- `ReactDOM.renderToStaticMarkup()` がより一般的に使われている。
- 加えて `ReactDOM.renderToReadableStream()` と `ReactDOM.renderToPipeableStream()` が同等の実装を持っている。

## ReactDOMServer.renderToStaticNodeStream() とは何か？

ReactDOMServer は、サーバ上で React コンポーネントをレンダリングするための API を指しており、具体的なパッケージは `react-dom/server` です。
いわゆる Static-Site Generation や Server-Side Rendering と言われるような事前レンダリングに用いられます。

https://ja.react.dev/reference/react-dom/server

この API 群には動作環境とレンダリング結果の分類によっていくつかのメソッドが用意されているようです。

| 環境                   | メソッド                   | ストリーム | ハイドレーション |
| ---------------------- | -------------------------- | ---------- | ---------------- |
| Node.js                | `renderToPipeableStream`   | 可         | 可               |
| Node.js                | `renderToStaticNodeStream` | 可         | 不可             |
| Web Stream             | `renderToReadableStream`   | 可         | 可               |
| ストリームサポートなし | `renderToString`           | 不可       | 不可             |
| ストリームサポートなし | `renderToStaticMarkup`     | 不可       | 不可             |

上記の表の繰り返しになりますが、renderToStaticNodeStream は Node.js 環境において、React コンポーネントをストリームとして出力するための API を指します。

## React ではなぜ ReactDOMServer.renderToStaticNodeStream() が非推奨となったのか

ドキュメントを参照すると、注意点として以下の内容が記載されています。

> renderToStaticNodeStream の出力はハイドレーションすることができません。
> React 18 時点において、このメソッドはすべての出力をバッファリングするため、実際にはストリームを使用する利点が得られません。

この特徴を踏まえると、`renderToStaticNodeStream` は実際にはストリームとしての利点を享受できないため、ケースによって既存のメソッドに置き換えることができそうです。

- ハイドレーションが不要で、ストリームも不要な場合：`renderToStaticMarkup`
- ハイドレーションが必要で、ストリームも必要な場合：`renderToPipeableStream`（Node.js環境）、`renderToReadableStream`（Web Stream）

ユースケースをカバーできる他の API があるので、`renderToStaticNodeStream` は非推奨となったと考えられます。

### 補足: Astro における対応

```typescript
if ("renderToReadableStream" in ReactDOM) {
  html = await renderToReadableStreamAsync(vnode, renderOptions);
} else {
  html = await renderToPipeableStreamAsync(vnode, renderOptions);
}
```

Astro では、環境に応じて `renderToReadableStream` か `renderToPipeableStream` を使うようになっていました。

## 参考

https://www.reddit.com/r/astrojs/comments/1cdbito/libsupabase_error_v46_and_v47_warning/?onetap_auto=true&one_tap=true&rdt=62227
