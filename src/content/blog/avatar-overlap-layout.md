---
title: "アイコンが重なってて、ホバーするとニュッとするそれ"
description: "ピカチュウのアイコンはiconifyにあった"
publishDate: 2023-05-28

tags: [CSS, GridLayout, Animation]
draft: false
---

## アイコンが重なってて、ホバーするとニュッとするそれを作ろう

![dev_to_sample](/blog/avatar-overlap-layout/dev_to_sample.png)

これは dev.to の記事リアクションの表示です。Slack でハドルミーティングが発生している時の参加者の表示にもこういったアイコンを重ねるレイアウトがよく見られます。

よく見かけるけど自分では作ったことがなかったので、[CSS Animated Grid Layouts](https://web.dev/css-animated-grid-layouts/)を参考にしつつ、今回はこちらを少し捻ったもの練習として作ってみました。

![sample](/blog/avatar-overlap-layout/sample.gif)

## 要件

- アイコンの数は 1〜5 個
- アイコンは重ねて表示する
- アイコンのいずれかをホバーすると、全体が広がり、後ろのアイコンも見えるようになる

## 実装

<iframe
  height="600"
  style="width: 100%;"
  scrolling="no"
  title="アイコンが重なってて、ホバーするとニュッとするそれ"
  src="https://codepen.io/ikumatadokoro/embed/RweOMXb?default-tab=css%2Cresult"
  frameborder="no"
  loading="lazy"
  allowtransparency="true"
  allowfullscreen="true">
  See the Pen{" "}
  <a href="https://codepen.io/ikumatadokoro/pen/RweOMXb">
    アイコンが重なってて、ホバーするとニュッとするそれ
  </a>
</iframe>

https://codepen.io/ikumatadokoro/pen/RweOMXb?editors=1100

## 実装メモ

1 次元配置なので、Flexbox でもいけると思うのですが、今回は参考ソースに合わせて GridLayout での実装になります。

### アイコンを重ねて表示する

このレイアウトの中核は、アイコンより狭めに設定された列トラックです。

今回は横方向にアイコンを積んでいくため、`grid-auto-flow: column`を指定した上で、`grid-template-columns`で列の数を指定します。

このとき、列幅を以下のように定義しています（必要部分のみ抜粋）。

```css
.icons {
  --gap: 1em;
  --icon-size: 5em; /* 実際のアイコンのサイズ */
  --overlap-size: 2em; /* 列トラックのサイズ。アイコンよりも小さめ */
  --num-children-1: calc(var(--num-children) - 1);
  --grid-cell-size: var(
    --overlap-size
  ); /* アイコンよりも小さめの列トラックが定義されているので、重なって見える */

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(var(--num-children), var(--grid-cell-size));
  grid-auto-columns: var(--grid-cell-size);
  gap: var(--gap);
  /* 植木算的な感じで全体の幅を要素に応じて調整している */
  width: calc(
    var(--grid-cell-size) * var(--num-children-1) + var(--gap) * var(
        --num-children
      ) + var(--icon-size) + var(--border-size)
  );
}
```

これで各列が重なるようになりました。

### ホバー表示

ホバー時は、`scale`を使って拡大表示しています。また、`z-index`を指定して、ホバーしたアイコンが最前面に表示されるようにしています。

```css
.icons > div:hover {
  scale: 1.1;
  z-index: 100;
  border-width: var(--border-size);
  border-color: var(--icon-color);
}
```

### 要素数に応じて幅計算を行うための CSS 変数

```css
.icons:where(:has(> *:nth-of-type(1):last-child)) {
  --num-children: 1;
}
.icons:where(:has(> *:nth-of-type(2):last-child)) {
  --num-children: 2;
}
.icons:where(:has(> *:nth-of-type(3):last-child)) {
  --num-children: 3;
}
.icons:where(:has(> *:nth-of-type(4):last-child)) {
  --num-children: 4;
}
.icons:where(:has(> *:nth-of-type(5):last-child)) {
  --num-children: 5;
}
```

だいぶ力技感がありますが、5 個までの制約のもとに CSS だけで幅を計算するために、上記のような CSS 変数を定義しています。

- `where`: 条件を満たす要素を選択する。
- `has`：子要素又は子孫要素の中に、指定したセレクタにマッチする要素が存在する場合に、その親要素を選択する。

つまりこのセレクタでは「`.icons`クラスの要素で、その最後の子要素が`nth-of-type(1)`の要素を持っているもの（=1 番目の要素）を選択する」という意味になります。
要素数が 2 個の場合は、`nth-of-type(2)`の要素を持っているもの（=2 番目の要素）を選択する、というように、要素数に応じて幅を計算することが可能になります。

## おわりに

全ての要素を削減したくはないけど、なんとなくの全体感を把握したい。そんなときに使えるのが「重ねて表示する」レイアウトと考えており、
その目的に hover での展開を加えるメリットがあまりないので、実際にはこのレイアウトを使う日は少ないかも？と思っています
（hover を実装したい時は「各要素は細かく見えるようにしたいけど、全体を見た時に他の要素も多いため、通常時は少し詰めて表示したい」と考えるときではないでしょうか）。

いずれにせよアイコンを重ねる実装自体は共通で使えるので、grid によるレイアウトの引き出しとして今後も活用していきたいと思います！
