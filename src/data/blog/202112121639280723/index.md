---
title: "【ツール】リストをコピーすると、Scrapbox用のリンク/リストに変換してくれるAlfredWorkflowを作る"
publishDate: 2021-12-12 12:45:23
category: idea
draft: false
description: "【ツール】リストをコピーすると、Scrapbox用のリンク/リストに変換してくれるAlfredWorkflowを作る"
tags:
  - ツール・ガジェット
  - Alfred
  - ドット絵
author: ikuma-t
slug: "202112121639280723"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212124414.png

## なんで作ったか

 ![f:id:ikmbear:20211212121719g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212121719.gif) 

QiitaとかZennに投稿されている記事で、「お、このリストいいな。自分のメモにコピペして一つずつ深掘りしていこう！」と思う時があります（「レビュー依頼をする前に見るリスト」とか「転職で聞かれる質問リスト」とか）。

私はメモにScrapboxを使っているのですが、そのままコピペしてしまうと、

- そもそもリストにならない
- 各リストごとにページ内リンクとして作成したいが、プレーンテキストにしかならない

という問題があります。

そこで今回は、Alfred Workflowを利用して「リストをコピーすると、Scrapboxのリンク/リストを作成してくれるツール」を作ってみました。

## 今回作ったもの

LiLink：リストを渡すと、Scrapboxのリンクリストを作成してくれるAlfred Workflow

 ![f:id:ikmbear:20211212122305g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212122305.gif) 

Alfredのメニューから「lilink」と入力することで呼び出せます。スペースを開けてコピーしたリンクを貼り付けると、Scrapboxのリンクかつリスト形式に変換したものをScrapboxに出力します。

 ![f:id:ikmbear:20211212122510p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212122510.png) 

```
プラグインについて：以下のプラグインを導入するために、プラグインについて学びます学習を支えるプラグイン：学習を支える3つのプラグインを紹介しますRubyMineのウィンドウ：RubyMineを開いた時に見える各ウィンドウの名称を整理します↓（変換） [プラグインについて：以下のプラグインを導入するために、プラグインについて学びます] [学習を支えるプラグイン：学習を支える3つのプラグインを紹介します] [RubyMineのウィンドウ：RubyMineを開いた時に見える各ウィンドウの名称を整理します]
```

## 作成過程

### ツールの名前を決める

なんでもいいんですが、今後ツールを増やしていくことを考えると、ある程度わかりやすいものがいいです。今回は、ListとLinkを作ってくれるので、「LiLink」にしました。

### ドット絵を描く

 ![f:id:ikmbear:20211212122930j:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212122930.jpg) 

AlfredはWorkflowに対して、任意の画像を設定することができます。

私はドット絵が趣味なので、ドット絵でリストの中黒とリンクのアイコンを合わせたアイコンを作成しました。

ちなみにドット絵はiPadの[dotpict](https://dotpict.net/)というアプリで描いています。

### Workflowを作る

 ![f:id:ikmbear:20211212123405p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212123405.png) 

大した$1も書かないので、今回はBlank Workflowに対して一から作成しました。

 ![f:id:ikmbear:20211212123525p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212123525.png) 

基本的な情報を設定して、

 ![f:id:ikmbear:20211212123602p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212123602.png) 

引数つきでキーワード「lilink」を受け取るように設定

 ![f:id:ikmbear:20211212123635p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212123635.png) 

rubyrubyを書いていきます。

```
# 前段の入力をARGVとして受け取る（`with input as argv`）設定なので、これを処理するquery = ARGV[0].split("\n").map { |line| " [#{line}]" }.join("\n")# 次の処理に渡すために、`query`という名前で出力するprint query
```

 ![f:id:ikmbear:20211212123832p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212123832.png) 

$1へのコピーアクションを設定し

 ![f:id:ikmbear:20211212123924p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211212/20211212123924.png) 

あとは全部がっちゃんこして完成🎉

## おわりに

これくらいのRubyRubyなら、適当に作ってコマンド置き場に設置してもいいんですが、

- 標準入出力をAlfredが担ってくれるので、ロジックだけ書けばいい
- アイコンや説明がつくので、コマンドを実行する時に思い出しやすい
- ターミナルを開かなくていい

という利点があるので、AlfredWorkflowとして作るのもありだな〜と思いました。
