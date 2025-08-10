---
title: "最近のScrapboxの使い方（2021/10）"
publishDate: 2021-10-15 13:51:29
category: idea
draft: false
description: "最近のScrapboxの使い方（2021/10）"
tags:
  - ツール・ガジェット
  - Scrapbox
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015135059.png

 ![f:id:ikmbear:20211015135059p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015135059.png) 

## 私がいままでやっていたことは「情報の整頓」だった

Notion、Mem、Bear、InkDrop...etc。メモアプリは色々と試してきました。いずれのアプリも最初のうちは「おお！めちゃいいやん」と快調にメモができていたのですが、メモの量が増えるにつれて、だんだん使いづらくなっていき、メモアプリヒッピーに。

そんなときに『知的生産の技術』を読んだのですが、次のフレーズにハッとさせられました。

> 整理というのは、ちらばっているものを目ざわりにならないように、きれいにかたづけることではない。それはむしろ整頓というべきであろう。ものごとがよく整理されているというのは、みた目にはともかく、必要なものが必要なときにすぐにとりだせるようになっている、ということだとおもう。
>
> 『[知的生産の技術]』（$1刊）$1

自分が今までやっていたメモアプリの挫折は、まさにこの「整頓」に執着していることが原因だったのか！  
新しいメモアプリを使い始めた瞬間は、使い始めた時点での情報、つまりは有限な要素であるため、綺麗に並べられる。  
しかし情報が増えていくにつれて、使い始めた当初の分類では抑え切れなくなり、整頓が破綻していたのです。

階層型のメモアプリでは、どうしても情報量が増えた際にスケールしなくなると感じ、いままでサブ的に使用していたScrapboxをメインのメモアプリに据えることにしました。

## なんでもScrapboxにつっこむ

先に述べた通り、Scrapboxをメインのメモアプリにしたため、なんでもかんでもScrapboxにつっこんでいます。

現状では、日記ページを毎日作成し、そこからリンクを派生する形で色々なメモを作成しています。 ![f:id:ikmbear:20211015133256p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015133256.png) 

日記ページは現時点で以下のようなセクションで構成されており、$1の部分に雑にメモを書いていきます。

1. 前日 | 翌日のリンク
2. タスクリスト
3. 感想
4. $1

基本的にはその時の気持ちとかやったこととかをだらだら書いていますが、何かしら別テーマで書きたいことが出てきたら`[]`でリンクを作成して、そこから別ページにメモします。 ![f:id:ikmbear:20211015133311p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015133311.png) 

日記ページは前日、翌日のリンクがあるので、暇な時にたまに見返すのですが、ここに別ページへのリンクを貼っておくとついついそのページも見て、知識の整理ができるというメリットがあります。

もともと自分はpixiv百科事典を眺めるのが趣味で、芋づる式に関連項目に飛ぶのが面白いなと思ったことから、単独でページを作成せずに、最低限作成日からリンクを飛ばすような仕組みにした経緯があります。

あと書いている最中は$1の中に書いていたけど、見返すと別テーマに切り出せそうなものは後から別ページにしています。これは$1でメソッド切り出しを行うような感じがしていて、結構気に入っています。

## 使っているUser Scriptの紹介

...とここまでが（ざっくりですが）最近のScrapboxの使い方で、ここからは使用するにあたって利用しているUser Scriptを紹介します。

なお[UserScript](https://scrapbox.io/help-jp/UserScript)は、自分のプロフィールページにJavascriptでコードを書くことで、Scrapboxをカスタマイズできる機能です。詳細はリンク先参照。

### テンプレートボタン

日記ページを自動で作成してくれるボタンです。新規ページを開いている時に押すことで機能します。

 ![f:id:ikmbear:20211015133656g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015133656.gif) 

ソースは[テンプレートを使ってページを作成（UserScript版） - Scrapboxとあそぶ](https://scrapbox.io/scrasobox/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E4%BD%9C%E6%88%90%EF%BC%88UserScript%E7%89%88%EF%BC%89)で紹介されているものを一部修正して使用させていただきました。

### 今日の日記ページに移動するボタン

名前の通りです。別のメモを書いてから日記ページに戻るのに、一度トップページを挟むのが煩わしくて作りました。

 ![f:id:ikmbear:20211015134049g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015134049.gif) 

```
  const today = new Date()  const year = today.getFullYear()  const month = ("0"+(today.getMonth() + 1)).slice(-2)  const date = ("0"+today.getDate()).slice(-2)  const formatToday = encodeURIComponent(`${year}/${month}/${date}`)  const menuTitle = 'Daily'   scrapbox.PageMenu.addMenu({    title: menuTitle,    image: 'https://twitter.com/favicon.ico',    onClick: () => window.location.href = `https://scrapbox.io/tadokoro/${formatToday}`  })
```

見た目をFontAwesomeアイコンにするために、UserCSSも利用しています。

```
 a#Daily.tool-btn:hover { text-decoration: none } a#Daily.tool-btn::before { position: absolute; content: '\f783'; font: 900 21px/46px 'Font Awesome 5 Free' } a#Daily.tool-btn img { opacity: 0 }
```

---

あとは見た目関連のCSSやCSSをちょちょっといじって使っています。何か気になるものは質問いただけば、回答します。  
Scrapboxに雑にメモできるせいで、記事もなんとなく雑になっちゃいましたね💦  
皆さんもぜひScrapbox使ってみてください（締めまで雑）
