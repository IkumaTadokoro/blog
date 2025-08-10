---
title: "⚡️初めてのLT会 Vol.10で登壇しました！！"
publishDate: 2021-12-19 10:00:00
category: idea
draft: false
description: "⚡️初めてのLT会 Vol.10で登壇しました！！"
tags:
  - fjordbootcamp
  - ツール・ガジェット
  - 登壇
author: ikuma-t
slug: "202112191639875600_1"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218205648.png

 ![f:id:ikmbear:20211218205648p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218205648.png) 

## ⚡️初めてのLT会 Vol.10に参加しました！

昨日[FJORD BOOT CAMP](https://bootcamp.fjord.jp/)で開催された、ライトニング$1初心者のための発表会、「⚡️初めてのLT会 Vol.10」に参加しました！

今回のテーマは「一年間で得た学びと気づき」ということで、私は「作業するときにログを書いていくと、進捗が捗るよ〜」という話をさせていただきました。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/ecc3e78661b845c0bec59c2373cf915f" title="進捗感を得るためのログ駆動開発" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 315px;" data-ratio="1.7777777777777777"></iframe>

この記事では、主に発表した内容の補足と今回のスライド作成で使ったツールなどを説明したいと思います。

- [⚡️初めてのLT会 Vol.10に参加しました！](#️初めてのLT会-Vol10に参加しました)
- [参加の経緯](#参加の経緯)
- [テーマ：ログ駆動開発](#テーマログ駆動開発)
- [自分の作業の進め方（内容補足）](#自分の作業の進め方内容補足)

  - [どこにログを書いているか](#どこにログを書いているか)
  - [どういう風にログを書いているか（ルール）](#どういう風にログを書いているかルール)

    - [日付と時刻の入力](#日付と時刻の入力)
    - [別のページへの切り出し](#別のページへの切り出し)
    - [とりあえずリンクにしておく](#とりあえずリンクにしておく)

  - [どういう風にログを書いているか（実例）](#どういう風にログを書いているか実例)
    - [気持ちの整理](#気持ちの整理)
    - [普通のログ](#普通のログ)

- [資料の作成方法（Figma）](#資料の作成方法Figma)

  - [資料はFigma](#資料はFigma)
  - [今回のテーマと色選定用ツール](#今回のテーマと色選定用ツール)
  - [画像の引用元](#画像の引用元)
    - [漫画風デザイン](#漫画風デザイン)
    - [表紙のイラスト](#表紙のイラスト)
    - [アニメの画像](#アニメの画像)
    - [絵文字っぽいの](#絵文字っぽいの)

- [練習のために使ったツール：CleanShot X](#練習のために使ったツールCleanShot-X)
- [感想](#感想)

## 参加の経緯

初めてのLT会自体は、以前にも登壇者として参加したことがありました。

その時の記事はこちら↓

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fikmbear.hatenablog.com%2Fentry%2F2020%2F10%2F25%2F130327" title="⚡️初めてのLT会 Vol.5でRubyMineの話をしました！ - セットプチフォッカ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe>

> [ikmbear.hatenablog.com](https://ikmbear.hatenablog.com/entry/2020/10/25/130327)

前回登壇した時から1年以上経っていたので「そろそろ登壇しておかなければ」と思い、今回手を上げさせていただきました。主催者の[paru](https://twitter.com/Paru871)さん、ありがとうございます！

## テーマ：ログ駆動開発

「ログ駆動開発」ってちょっと言葉としては大袈裟ですね笑。ビジネス本として出したら叩かれそうですが、LTという短い尺だったので、コンパクトにタイトルつけさせていただきました。

もともとは「寄り道レトロスペクティブ」というタイトルで、今年はRailsとかGemのソースにいろいろと寄り道してきた話をしようと思ったのですが、ボリュームが大きすぎたので、その話の中で「どうやって難しい内容に対しても安定して進捗を出していくか」というセクションだけ切り出した内容が今回の話になります。

話している内容的には、以下の記事と多少オーバーラップするところがあるので、気になる方はこちらも読んでいただければ

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fikmbear.hatenablog.com%2Fentry%2F2020%2F12%2F18%2F064703" title="アウトプットを阻むプライドと戦う〜スモールアウトプットのすすめ〜 - セットプチフォッカ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe>

> [ikmbear.hatenablog.com](https://ikmbear.hatenablog.com/entry/2020/12/18/064703)

---

ここからツールの話多めです

## 自分の作業の進め方（内容補足）

LT会での質問で

- どこにログを書いているか
- どんな内容を書いているかみてみたい

という内容がありました。LT会中も話した部分はありますが、このブログで一連の作業ルーティンを補足として説明させてもらればと思います。

### どこにログを書いているか

ログはすべてScrapboxに書いています。やり方としては1日ごとにページを作成して、その中に書いていくようなイメージです。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fikmbear.hatenablog.com%2Fentry%2F20211015%2F1634273489" title="最近のScrapboxの使い方（2021/10） - セットプチフォッカ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe>

> [ikmbear.hatenablog.com](https://ikmbear.hatenablog.com/entry/20211015/1634273489)

この記事で書いた内容と変わっていないのですが、次のように日報作成ボタンをJavaScriptでカスタムしているので、それを使って今日のページを作成します。

 ![f:id:ikmbear:20211218192942g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218192942.gif) 

```
←[2021/12/17]：[2021/12/19]→[{ 日報][*** 👍やったこと] [_][*** 🎓学習したこと][** 【わかったこと】][** 【わからなかったこと】][*** 🥷次にやること][*** 🍘感想・余談][{ ライフログ]
```

CSSや「日報」の見た目はCSSで拡張してわかりやすいように表示しています。（長くなるのでコードは割愛します。どっか別の記事で書くと思います）。

「日報」のセクションは、そのままFJORD BOOT CAMPで提出するための日報テンプレートになっています。

で、「$1」のセクションが今回のLT会でお話ししたログを書く場所です。ここにログを記載していきます。

### どういう風にログを書いているか（ルール）

ルールはあまりありませんが、

- 日付と時刻を入力する
- 内容が後から参照できそうなら別のページに切り出す
- あとでページになりそうな内容は、とりあえずリンクにしておく

という感じでやっています。

#### 日付と時刻の入力

 ![f:id:ikmbear:20211218193735g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218193735.gif) 

Scrapboxでは`⌃` + `T`で日付を入力することができます。3つのフォーマットがあるのですが、3回押した際に出てくる時刻入りのフォーマットを使って、ログの入力を開始します。

時刻を入力するタイミングは厳密には決めていませんが、時間が経っていたり、内容が変わるときには大体日付を入力し直すようにしています。

#### 別のページへの切り出し

 ![f:id:ikmbear:20211218194033g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218194033.gif) 

ログを書いている中で、「これまた見返しそうだな」と思ったり、独立した内容になっていたら、その部分を選択して「New Page」を選択することで別ページに切り出しています。

こうすることで後から参照しやすくなります。

#### とりあえずリンクにしておく

 ![f:id:ikmbear:20211218201827p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218201827.png) 

ログを書いていると、「この単語後からまとめたいけど、今は時間ないな」「こういう概念でまとめておいたら、自分の考えがまとまりそう」みたいな要素に出会うことが多々あります。

そういう時は文中で、積極的にリンク（`[リンクにしたい単語]`）を利用していきます。たとえその時点でメモを作らなくても、あとでメモを見返したときに「あ、ここ追記しておこう」という感じで、過去のログから知識が進化する余地を残せます。

タグの機能も使えますが、基本的にはコンテキストの中で自然に残せる内容はリンクとして雑に定義する方針を取っています（こうしておくと自分のメモ見返すの楽しいんですよ）。

### どういう風にログを書いているか（実例）

Scrapboxの中に個人的な内容も書いているので、ある時からScrapboxをprivateにしてしまいました。なので抜粋してお届けします。

#### 気持ちの整理

 ![f:id:ikmbear:20211218194831p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218194831.png) 

本来であればタスクを整理→作業開始、くらいの感じだと思うんですが、やる気が出なかったようなのでタスク整理する前に気持ちを整理しているメモです。

自分で自分を鼓舞していること、今自分の身に起きていることをとにかく書き出していることがポイントです。

 ![f:id:ikmbear:20211218195344p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218195344.png) 

レビューしてもらった内容があまりいいものではなくて、気持ちが落ち込んでしまった時のログです。なんだかモヤモヤしてしまって、「明日作業するのだるいな〜」と思っていたので、その日のうちに頭の中にあることをとにかく書き出しました（この後めちゃくちゃ寝て、翌日朝から快調に作業ができました）。

「悔しい！劣等感だ！いつだって上がり調子でいたい」「でもこの劣等感はずっと味わっていなかった感情だ！！！うれしくもあるぞ」

見返すと恥ずかしいですが、当時の自分はこうやって吐き出せたことで、悩んでいた時間は5分くらいだった模様です。

#### 普通のログ

 ![f:id:ikmbear:20211218200454p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218200454.png) 

普通のログは結構やった作業を全部書いていることが多いです。

一番最後に「気になることを書き出してみよう」と書いていますが、このパターンは結構使っていて、実装中もできるだけ頭の中は空っぽにして、今やっていることだけにフォーカスするのに役立っています。

だいたいこのパターンの後に「よしじゃあひとつずつ見ていこうか」「全然わからんな」「本当？今自分が知っていることは何？」みたいな常套句が続きます。

 ![f:id:ikmbear:20211218201241p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218201241.png) 

これはリファクタされたメモの例で、ログを振り返ると全然書いていないように見えるんですが、例えば「$1・$1・住民税の計算方法」は次のように別のページとして成立した内容になっています。

 ![f:id:ikmbear:20211218201342p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218201342.png) 

これは技術全然関係ないですが、例えば「PostgreSQLでエラーになった」とか「Railsで例外発生」みたいな事象にあったときには、とことんログを書きながら調べていって、後から別ページに切り出すと、検索性も高くなってとても良きです。

---

その他のScrapboxの使い方（Scrapbox用のクライアント、各種Scrapbox）については別の記事で紹介したいと思います（長いんで）。

## 資料の作成方法（Figma）

発表中、資料内のイラスト等にも質問をいただきましたのでここに書いていければと思います。

### 資料はFigma

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Ffile%2FeIzscA2nFdBb5VV7LgBFQU%2F%25E5%2588%259D%25E3%2582%2581%25E3%2581%25A6%25E3%2581%25AELT%25E4%25BC%259A-Vol.10%3Fnode-id%3D0%253A1" allowfullscreen=""></iframe>

今回の資料はFigmaで作成しました。結局Keynote使ったの前回の一回だけだった笑

Figmaを使う理由は

- 色やフォントをストックしておける
- $1を使える
- スライドを一覧しやすい

という理由です。

### 今回のテーマと色選定用ツール

今回は「ログ」についてのお話でした。ログの語源って「ログブック」つまりは「航海日誌」なんですよね。なので、スライドのテーマになっているのは船です。

季節的には冬だったので、冬の夜の暗い海とそこに灯る赤い船のライトをイメージしたカラーにしたらいいかな〜と思っていました。

以前ブログで紹介したPalettableも利用しているのですが、今回はAIで色を提案してくれるHueMintというサービスを使って配色のベースを選択しました（結構ライト目な内容だと最近よくこのサービス使っています）。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fhuemint.com%2F" title="Huemint - AI color palette generator" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [huemint.com](https://huemint.com/)

ここでベースの黒と文字のグレーを決めて、あとは感覚で合いそうな色をパレットとして作成し、スライドを作成しました。

### 画像の引用元

#### 漫画風デザイン

 ![f:id:ikmbear:20211218203127p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218203127.png) 

この画像はどこから？という質問があったのですが、これはOpen Peepsという素材を使っています。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fpablostanley.gumroad.com%2Fl%2Fopenpeeps%3Fwanted%3Dtrue" title="Open Peeps " class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [pablostanley.gumroad.com](https://pablostanley.gumroad.com/l/openpeeps?wanted=true)

 ![f:id:ikmbear:20211218203250p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218203250.png) 

素材の中にこういう漫画っぽいイラストがあったので、コマ割りと中に出てくるキャFigmaターをFigmaで編集しました。

それだけでもよかったんですが、漫画といえば集中線とか$1、$1があった方がいいでしょ、ということでマンガパーツSTOCKというサイトから素材を拾ってきて合成し、今回のスライドの完成です。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fmangasozai.com%2F" title="マンガパーツSTOCK – 集中線、効果線特化サイト" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [mangasozai.com](https://mangasozai.com/)

正直今回のスライドで一番時間がかかった部分でした笑

#### 表紙のイラスト

 ![f:id:ikmbear:20211218203539p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218203539.png) 

表紙にはログ→航海日誌→船の連想から、船の画像をのせています。これはLoose Drawingというサイトから拾ってきたものです。何かイラストが必要な時は、ソコストかLoose Drawingで拾ってくることが多いです。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Floosedrawing.com%2F" title="Loose Drawing  |  無料で商用利用可なフリーイラスト" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [loosedrawing.com](https://loosedrawing.com/)

#### アニメの画像

 ![f:id:ikmbear:20211218203749p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218203749.png) 

これは私が持っているSHIROBAKOのBluray-Diskをスクショしただけです。

[![SHIROBAKO Blu-ray BOX 1 スタンダード エディション (3枚組)](https://m.media-amazon.com/images/I/51PE1dOL4tL._SL500_.jpg "SHIROBAKO Blu-ray BOX 1 スタンダード エディション (3枚組)")](https://www.amazon.co.jp/dp/B081VL3N76?tag=hatena-22&linkCode=ogi&th=1&psc=1)

[SHIROBAKO Blu-ray BOX 1 スタンダード エディション (3枚組)](https://www.amazon.co.jp/dp/B081VL3N76?tag=hatena-22&linkCode=ogi&th=1&psc=1)

- $1

[Amazon](https://www.amazon.co.jp/dp/B081VL3N76?tag=hatena-22&linkCode=ogi&th=1&psc=1)

#### 絵文字っぽいの

 ![f:id:ikmbear:20211218203909p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218203909.png) 

FigmaではFontAwesomeを利用することができるので、図解にFigmaを使いたい時はFontAwesomeを使っています。

## 練習のために使ったツール：CleanShot X

今回はFigmaでスライドをつくったのですが、そうすると録画機能がないために練習をどうしようか迷いました（録音するので）。

で、最近購入したCleanShot Xは$1だけではなく、GIFや動画も撮影できることがわかったので、今回はこれを使って録画練習をしました。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fcleanshot.com%2F" title="CleanShot X for Mac" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [cleanshot.com](https://cleanshot.com/)

 ![f:id:ikmbear:20211218204350p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218204350.png) 

しかも録画するときにワイプで自分の画像もうつせることに気がついたので、もっぱらこのスタイルで録画をしての練習でした。

ここらへんも長くなるので、CleanShot Xについては別記事で書きます（と思います）。

## 感想

登壇をやるのはそれなりに大変だけど、その分自分の考えをいろんな人に知ってもらえて、やってよかったな〜と改めて思いました！

今回はFJORD BOOT CAMP内でしたが、来年は今作っているGemの内容で外部のLT会にも登壇しにいきたいと思っています！

ではでは〜！
