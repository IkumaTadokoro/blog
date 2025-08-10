---
title: "【RubyMine】意図しない拡張子でファイルを開いてしまった時に、開く拡張子を変更する"
publishDate: 2021-08-11 15:49:00
category: tech
draft: false
description: "【RubyMine】意図しない拡張子でファイルを開いてしまった時に、開く拡張子を変更する"
tags:
  - ツール・ガジェット
  - RubyMine
author: ikuma-t
modDatetime: 2021-08-11 15:49:00
slug: "20210811154900"
---
## 発端

パーフェクトRailsを読みながらRailsの復習をしており、`rails db:migrate`した結果を、RubyMineのDatabaseウィンドウで確認しようとしたのですが、誤って`db/development.sqlite3`を「テキストファイル」として開いてしまいました。

 ![f:id:ikmbear:20210811153633p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210811/20210811153633.png) 

そのため、RubyMine上で拡張子が誤認されたファイルを、正しい拡張子に変更する方法を調べてみました。

なおRubyMineのバージョンは2021.2です。

## 結論

`Preferences > File Types`から、誤って指定したファイルタイプを選択し、`File name pattern`を修正する。

## 詳細

 ![f:id:ikmbear:20210811154257p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210811/20210811154257.png) 

Preferencesは、`⌘` + `,`もしくは、上図の場所から展開できます。

 ![f:id:ikmbear:20210811154358p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210811/20210811154358.png) 

Preferencesを開くと、`Editor > File Types`という項目があるので、これを選択。  
すると、各拡張子ごとに、「どのようなファイル名であればそのタイプとして認識するか」の一覧が表示されています。

今回はTextに対して、「.sqlite3」が紐づいてしまったので、これを選択して「-」で削除することで、紐付けを解除できます。

紐付けが解除されたことで、今回は自動でDBとして再認識され、Databaseウィンドウも無事に開くことができました🎉

 ![f:id:ikmbear:20210811154828p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210811/20210811154828.png) 

## 参考

[ファイルタイプの関連付けを設定する | RubyMine](https://pleiades.io/help/ruby/creating-and-registering-file-types.html)
