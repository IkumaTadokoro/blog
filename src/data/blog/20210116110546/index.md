---
title: "RubyMineでライブラリのソースをGrepする方法"
publishDate: 2021-01-16 11:05:46
category: tech
draft: false
description: "RubyMineでライブラリのソースをGrepする方法"
tags:
  - RubyMine
  - Ruby on Rails
  - Ruby
slug: "20210116110546"
---
ActiveStorageの`with_attached_#{name}`がどこに定義されているのか確認する過程で、RubyMineでの調べ方を覚えました。

## 対象バージョン

- RubyMine 2020.3.1

## Find in Files

RubyMineでGrep検索を行うには、編集 | 検索 | パス内検索 `⇧⌘ F`から「Find in Files」メニューを起動します。

![f:id:ikmbear:20210116105129p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210116/20210116105129.png)Find in Files画面

試しに`with_attached`あたりで検索をかけてみても、自分のソースで書いた部分しか引っ掛からず、定義元は抽出されません。  
これは検索の対象（図中、緑枠）が`In Project`になっているのが原因でした。

| オプション | 検索対象                                                                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| In Project | 現在のプロジェクト（外部ライブラリは含まない）                                                                                                                                                           |
| Module     | モジュール指定ができるようになる。指定したモジュールの範囲で検索する                                                                                                                                     |
| Directory  | $1リ指定ができるようになる。指定した$1リの範囲で検索する |
| Scope      | スコープが指定できるようになる。事前に定義されたスコープの範囲で検索する                                                                                                                                 |

スコープについては、[こちら](https://pleiades.io/help/ruby/configuring-scopes-and-file-colors.html)を参照。  
要はファイルを目的に応じてグルーピングできる機能です。

自分で定義しなくてもRubyMineのプリセットがいくつかあるようですが、今回は大雑把に`All Places`で$1を実施し、見事欲しいソースに到達できました。

![f:id:ikmbear:20210116110341p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210116/20210116110341.png)
