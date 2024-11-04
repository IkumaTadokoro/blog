---
title: "CSSで親のコンテナのサイズをはみ出す子要素を作る"
description: "共通のコンテナを定義した際に、特定の要素、たとえばヘッダーやフッターはコンテナをはみ出したいケースがあります。CSSのcalcを利用することで、コンテナの外に要素をはみ出させることができます。"
publishDate: 2024-11-04
category: tech
tags:
    - CSS
draft: false
---

## コンテナから要素をはみ出したい

このブログでは全体のレイアウトを定義した上で、その中にヘッダーやフッター、メインコンテンツを配置しています。

イメージとしては次のようなHTML構造です。

```html
<div class="container">
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</div>
```

`.container`に対しては`max-width`を設定して、コンテンツが画面幅いっぱいに広がらないようにしています。

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

これによって共通の幅を確保できるのはいいのですが、たとえばヘッダーは横幅いっぱいに広げたい場合どうすればいいでしょうか？

解決策の1つはスタイルを共通ではなく、各セクションごとに定義することです。

```html
<div>
  <header class="full-width">...</header>
  <main class="container">...</main>
  <footer class="container">...</footer>
</div>
```

これでもよいのですが、そのほかのスタイルをTailwind CSSで複数適用していたため、できれば共通のスタイルを使いたいところです。

## calcでネガティブマージンを利用してはみ出す

はみ出したい子要素に対して、以下のスタイルを適用することで、やりたいことを実現できます。

```css
/* ヘッダーをはみださせる */
header {
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  /* 親の幅に要素を寄せたい場合 */
  /* padding-inline: calc(50vw - 50%); */
}

/* 変更なし */
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

HTMLについては、次のようになります。

```html
<div class="container">
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</div>
```

適用のイメージについて、個人的には次のように考えるとわかりやすいかと思います。

1. 親要素を基準に、`100vw`で要素を横幅いっぱいに広がる。親基準なので、画面の端からではなく親の端から広がる。これを調整したい。
2. 親要素の左右それぞれに対して（つまり半分ずつに分割して考える）、画面幅の要素から親要素を引いた値をうめたい。これをネガティブマージンで再現する。
3. `margin-inline`を利用して、水平方向に対して、2のマージンを適用する。

## 参考

[コンテナからの解放。](https://lopan.jp/breaking-out/)
