---
author: ikuma-t
publishDate: 2020-08-14 08:15:03
modDatetime: 2020-08-14 08:15:03
title: "RubyMineのIdeaVimで、jjをEscにマッピングする方法"
slug: "20200814081503"
featured: false
draft: false
tags:
  - ツール・ガジェット
  - RubyMine
description: "RubyMineのIdeaVimで、jjをEscにマッピングする方法"
---

IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200814/20200814073502.png

タイトルの通り設定しました。設定の再読み込みが$1からうまく実行できなかったですが（現在も原因はわからぬまま）、とりあえず設定自体はできたので書きます。

結論以降は試行錯誤の記録なので、設定方法だけわかればいいという方は飛ばしてください。

## 結論

1. \~/.ideavimrcを開く
2. `imap jj <Esc>`を入力して保存
3. RubyMineを再起動

## 環境

- macOS Catalina 10.15.6
- RubyMine ![f:id:ikmbear:20200814073502p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200814/20200814073502.png) 
- シェル：zsh

## \~/.ideavimrcにキー$1を追記

デフォルトのキー$1だけで頑張ってきたのですが、Escはどうも手が届かないので`jj`に変更しようと思い、下記参考に設定しました。  
[vim - Intellij Ideavim how to set key map for - Stack Overflow](https://stackoverflow.com/questions/25560616/intellij-ideavim-how-to-set-key-map-for-esc)

具体的には

```
% vim ~/.ideavimrc
```

もしくは、RubyMineの画面右下にIdeaVimのアイコンがあるので、そこから開いても良しです。

 ![f:id:ikmbear:20200814074338p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200814/20200814074338.png) 

そして、.ideavimrcに

```
imap jj <Esc>
```

と記述して、保存。ここまでは何も問題ありませんでした。

## $1からの再読み込みがうまくいかない

こういう設定ファイルの常ですが、設定を追記したら再読み込みしないと設定が適用されません。

というわけで再読み込みを実行するわけですが...

```
% source ~/.vimrc.ideavimrc:1: parse error near `>'
```

う〜ん、\>付近で解析できなかったと言われてもコマンドはこれだしなあ...。いろいろググって、似たような事例で「''」で囲むといいよという例あり。試してみる。

[ruby on rails - zsh: parse error near `\\' when Adding AWS keys as environment variables - Stack Overflow](https://stackoverflow.com/questions/22278748/zsh-parse-error-near-n-when-adding-aws-keys-as-environment-variables)

```
% vim ~/.ideavimrc# シングルクォートで囲むimap jj '<Esc>'
```

そして実行

```
% source ~/.ideavimrccommand not found: imap
```

imapコマンドがないと言われてしまえば、もうお手上げ。残念無念また来年。

## RubyMine自体を再起動しました

結局RubyMine自体を再起動すれば、設定ファイルは読み込みされるので再起動しました。

ちなみに、現在起動中のプロジェクトを閉じると、プロジェクト選択ウィンドウが出ますが、こちらも閉じないと再起動にはなりませんのでご注意を。

 ![f:id:ikmbear:20200814075447p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200814/20200814075447.png) 

再起動すると、無事に`jj`でINSERT MODEから抜けられるようになりました...！？ ![f:id:ikmbear:20200814075834g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200814/20200814075834.gif) 

NORMAL MODEにはなっているのですが、「''」が入ってしまいました。これは先ほどの試行錯誤で

```
% vim ~/.ideavimrc# シングルクォートで囲むimap jj '<Esc>'
```

としたせいです。つまり「`jj`というキーをおしたら、`''`を入力して、'Esc'するよ」という$1になってしまいました。なので元の通りの設定に直しておきましょう。

```
% vim ~/.ideavimrc# シングルクォートを除外するimap jj <Esc>
```

## bashでも試してみる

たまにzsh特有のエラーである可能性もあるので、RubyMineのシェルをbashに変更して試してみます。シェルの変更方法は[ターミナル - 公式ヘルプ | RubyMine](https://pleiades.io/help/ruby/terminal-emulator.html)を参照しています。

 ![f:id:ikmbear:20200814080703p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200814/20200814080703.png) 

Prefereceを開き、TerminalメニューにあるShellPathを`/bin/bash`に変更します。 ![f:id:ikmbear:20200814080849p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200814/20200814080849.png) 

APPLYを押して、設定を閉じます。ターミナルを一度閉じてもう一度開くと、bashに切り替わるので、zshと同じように試してみます。

```
$ source ~/.ideavimrcsyntax error near unexpected token `newline'
```

bashでもzshと同様にエラーが出てしまいました。どうやら大人しくRubyMineを再起動した方が良さそうですね。

## 感想

結局$1からの再読み込みはできずじまいで、少しもやもやです。そんな頻繁に設定いじらないからいいんですけどね。
