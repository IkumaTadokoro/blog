---
title: "【RubyMine】デバッグ時、requireで怒られたときの対処法（小ネタ）"
publishDate: 2020-08-15 15:51:29
category: tech
draft: false
description: "【RubyMine】デバッグ時、requireで怒られたときの対処法（小ネタ）"
tags:
  - ツール・ガジェット
  - RubyMine
author: ikuma-t
modDatetime: 2020-08-15 15:51:29
slug: "20200815155129"
featured: false
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200815/20200815154953.png

RubyMine小ネタです。

## Byebugを無視した罰当たり

本日チェリー本でByebugを覚えました。

「覚えたからって関係ねえ、Byebugを使用せずに私はRubyMineで$1をやるんだ」と$1を試みたところ、デバッガが異常終了してしまいました。これは罰当たりか...？

```
Uncaught exception: cannot load such file -- ./lib/effects    /Users/username/RubymineProjects/ruby-book/lib/word_synth.rb:1:in `require'    /Users/username/RubymineProjects/ruby-book/lib/word_synth.rb:1:in `<top (required)>'
```

## 原因は$1の構成

$1から通常通り実行していた際は、以下のrequireで問題なく動いていました。

```
require './lib/effects'
```

これを以下のように書き換えてあげるとうまく実行できるようになります。つまりシェルからの実行時と、Rubymineのデバッガでは$1の基準点がずれているわけです。

```
require './effects'
```

ではカレント$1リがどこで決まっているかというと、画面右上のプルダウンをクリックすると展開されるので... ![f:id:ikmbear:20200815154953p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200815/20200815154953.png) その中のEdit Configrationsを押すと、各ファイルごとの設定をみることができます。 ![f:id:ikmbear:20200815154609p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200815/20200815154609.png) 

上図内赤枠の「Working Directory」が$1の基準点になるので、

- このパスを書き換える

もしくは

- 実行ファイルのrequireのパスを書き換える

ことで、$1実行が正しくできるようになりました。

以$1ネタでした〜。
