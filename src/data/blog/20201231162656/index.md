---
title: "年始に向けてブログのデザインを整える"
publishDate: 2020-12-31 16:26:56
category: tech
draft: false
description: "年始に向けてブログのデザインを整える"
tags:
  - 日常
  - CSS
author: ikuma-t
slug: "20201231162656"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231150902.png

 ![f:id:ikmbear:20201231150902p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231150902.png) 

みなさん年末いかがお過ごしでしょうか。私は職場の勉強会の資料を作りたくなくて、現実逃避しています。

さて今日で一年も終わり。来年はたくさんブログを書けるように、CSSのカスタムCSSを利用してブログのデザインを変更してみました。

大した変更ではありませんが、地味にハマったところを自分への備忘録として書き残しておきたいと思います。

- [カスタムCSSの使い方](#カスタムCSSの使い方)
- [変更点（ざっくり）](#変更点ざっくり)

  - [記事全体](#記事全体)
  - [目次](#目次)
  - [コードブロック](#コードブロック)
  - [引用ブロック](#引用ブロック)
  - [サイドバーのアイテム](#サイドバーのアイテム)

- [やっていてつまったところ](#やっていてつまったところ)

  - [メディアクエリが適用されない](#メディアクエリが適用されない)
  - [1階層目のリストにだけ、CSSを適用するセレクタ](#1階層目のリストにだけCSSを適用するセレクタ)

- [おわりに](#おわりに)

## カスタムCSSの使い方

カスタムCSSを開くには、まずCSSの右上に表示されている「デザイン」メニューを選択します。

 ![f:id:ikmbear:20201231151440p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231151440.png) 

次に、表示されたデザインメニューのサイドバーから「カスタマイズ」を選択します。

 ![f:id:ikmbear:20201231151639p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231151639.png) 

カスタマイズタブにある「カスタムCSS」の欄にCSSを書いていくことで、デザインが適用されます。

 ![f:id:ikmbear:20201231151724p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231151724.png) 

フォームからフォーカスが外れるとプレビューが更新され、画面上部の「変更を保存する」ボタンを押すことでブログにCSSが反映されます。カスタムCSSの使い方は以上です。

## 変更点（ざっくり）

デザインについては、無料配布されている[soboku](https://blog.hatena.ne.jp/-/store/theme/17391345971627985862)というテーマをベースにしています。

### 記事全体

 ![f:id:ikmbear:20201231152541p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231152541.png) 

- 囲んで影つけて、各アイテムごとのタイトル文字を太くしました。

```
#wrapper {    box-shadow: 0 2px 4px rgba(67,133,187,.1);    padding: 20px 30px;    border-radius: 12px;    background-color: #fdfdfd;}/* スマホ用 */@media screen and  (max-width: 559px){#container {    padding: 10px}#wrapper {    padding: 10px 10px;}}.entry-content h2 {    font-weight: 700;}.entry-content h3 {    font-weight: 600;}.entry-title-link {    font-weight: 700;    }
```

### 目次

 ![f:id:ikmbear:20201231161001p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231161001.png) 

- noteっぽくしました
- 「◆目次」を追加しました

```
.entry-content .table-of-contents {    background-color: #f7f9f9;    border-radius: 5px;    padding: 16px 20px;    margin: 36px 0;    border: none;}.entry-content .table-of-contents:before {    content: "◆目次";    border-bottom: 1px solid #e6e6e6;    font-weight: 600;    margin-bottom: 16px;    color: #787c7b;}    .entry-content .table-of-contents>li>a {    font-weight: 600;    padding-top: 3px;}.entry-content .table-of-contents * {    color: #787c7b;    text-decoration: none;    list-style: none;    padding: 8px 4px;}
```

### コードブロック

 ![f:id:ikmbear:20201231152655p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231152655.png) 

- 背景を黒にしました

```
.entry-content pre {    padding: 16px;    border-radius: 3px;    background-color: #2c2d3a;    color: #F7F7F7;}
```

### 引用ブロック

 ![f:id:ikmbear:20201231152726p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231152726.png) 

- 背景色をグレーに変更して、文字色も薄くしました。
- 全体的に余白を大きく取っています

```
.entry-content blockquote {    border: none;    color: #626e77;    margin: 1.4rem 0;    padding: 25px 36px;    line-height: 36px;    background: #f7f9f9;    border-radius: 3px;}
```

### サイドバーのアイテム

 ![f:id:ikmbear:20201231152435p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231152435.png) 

- 囲んで影つけて、各アイテムごとのタイトル文字を太くしました。

```
.hatena-module {    padding: 15px 20px 15px;    box-shadow: 0 2px 4px rgba(67,133,187,.1);    border-radius: 12px;    background-color: #fdfdfd;}.hatena-module-title {    font-weight: 700;    }
```

## やっていてつまったところ

### メディアクエリが適用されない

記事全体について、修正初期段階では$1で見ると少し幅が狭かったです。

> ブログのCSS少しいじった。PCは良さげだけど、CSSだともっと画面いっぱいに広げた方が読みやすそう。  
> 暇な時変えよう [pic.twitter.com/GB2l3QTyOa](https://t.co/GB2l3QTyOa)
>
> — Ikuma_t (@ikumatdkr) [2020年12月31日](https://twitter.com/ikumatdkr/status/1344492755905433601?ref_src=twsrc%5Etfw)

メディアクエリで$1の場合だけpaddingを広げようとしたのですが、なぜか適用されませんでした。

```
/* ミスっていた時のCSS * //* スマホ用 */@media screen and  (max-width: 559px){#container {    padding: 10px}#wrapper {    padding: 10px 10px;}}#wrapper {    box-shadow: 0 2px 4px rgba(67,133,187,.1);    padding: 20px 30px;    border-radius: 12px;    background-color: #fdfdfd;}
```

これはCSSの書き順の問題だったようで、メディアクエリーの箇所を最後に適用するようにしたら、正しく反映されました。This is「カスケードスタイル」...

### 1階層目のリストにだけ、CSSを適用するCSS

 ![f:id:ikmbear:20201231161526p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201231/20201231161526.png) 

目次部分はすべて順序付きリストで構成されているので、単純に`li`指定だとすべてのアイテムに装飾が施されてしまいます。

今回は一階層目（つまり記事内の見出し2）だけを太字にしたかったので、直下の子要素を指定する`>`を利用して、`.table-of-contents>li>a`としました。

参考：[CSSのセレクタチートシート | webliker](https://webliker.info/css-selector-cheat-sheet/)

## おわりに

ブログのデザイン変更は今年中にやろうと思っていたので、完了できてよかったです😊

来年の執筆まわりの目標としては

- ローカルの執筆環境を整える（バージョン管理したい）
- 月5本は記事を投稿する
- 読みやすい文章に関する知識を蓄える

こんなところをやっていけたらいいな〜と思っています。

それではみなさま良いお年を〜🐄
