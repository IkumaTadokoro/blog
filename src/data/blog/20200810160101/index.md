---
title: "zshからの実行時、 Rangeオブジェクトを使った繰り返しで、最後の文字が「%」になって困った"
publishDate: 2020-08-10 16:01:01
category: tech
draft: false
description: "zshからの実行時、 Rangeオブジェクトを使った繰り返しで、最後の文字が「%」になって困った"
tags:
  - PROGRAMMING
  - Ruby
  - zsh
author: ikuma-t
modDatetime: 2020-08-10 16:01:01
slug: "20200810160101"
featured: false
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200810/20200810155847.png

 ![f:id:ikmbear:20200810155847p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200810/20200810155847.png) 

- [実行環境](#実行環境)
- [なぜ範囲の最後の数字が出力されない？](#なぜ範囲の最後の数字が出力されない)
- [Rangeオブジェクトは、ドットの数で境界を含むかどうかが変わる。](#Rangeオブジェクトはドットの数で境界を含むかどうかが変わる)
- [環境起因かを確かめてみる](#環境起因かを確かめてみる)
- [zshでは改行のない結果行を出力する時に、プロンプト「%」を表示する](#zshでは改行のない結果行を出力する時にプロンプトを表示する)

  - [余談](#余談)

- [「%」を排除するにはどうすればよいか](#を排除するにはどうすればよいか)
- [感想](#感想)
- [参考](#参考)

### 実行環境

- macOS Catalina 10.15.6
- Ruby 2.7.0
- シェル：zsh

## なぜ範囲の最後の数字が出力されない？

実際に取り組んでいた問題はもう少し複雑だったんですが、簡単にいうとこんなコードを書いていました。やりたいことは、1から10までをただ横並びに出力したいということです。

```
# print_num.rb#!/usr/bin/env ruby(1...10).each {|n| print n}
```

これをVSCodeのターミナル（zsh）から実行すると...

```
% ./print_num.rb123456789%
```

「あれ？10が出ない代わりに"%"が出力されている？」

## Rangeオブジェクトは、ドットの数で境界を含むかどうかが変わる。

[class Range (Ruby 2.7.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/class/Range.html)

さしずめ、「あれドットの数って何個だったけな？国語的には3つで1つだから、3つで書いてみるか...。お！動いたやっぱり3つか！」みたいことを思っていたのでしょう、この私。甘すぎて尼になっちゃうわ。

「Rangeオブジェクト」のリファレンスマニュアルを確認すると、次のようなサンプルがあります。

```
Range.new(1, 5) # 1 以上 5 以下1..5            # 同上1...5           # 1 以上 5 未満
```

つまり、Rangeオブジェクトは

- ドットが2つの場合、終端を含む
- ドットが3の場合、終端を含まない

という仕様です。なので、今回やりたいことは次のように書けば解決します！

```
# print_num.rb#!/usr/bin/env ruby(1..10).each {|n| print n} # ドットを一つ減らし、終端を含むように変更した。
```

これを実行すると...

```
% ./print_num.rb12345678910%
```

あれれ？10は表示されましたが、「%」の謎は残ったままです...。

## 環境起因かを確かめてみる

 ![f:id:ikmbear:20200810154547p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200810/20200810154547.png) この実行結果はVSCodeのターミナル（zsh）で実行したものなので、環境起因の可能性がないかチェックします。

mac標準のターミナル（zsh）で実行して結果を確認してみると、同じ現象が発生しています。

 ![f:id:ikmbear:20200810154611p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200810/20200810154611.png) 

一方、pryでの実行結果を確認すると、こちらは%は表示されていません。

 ![f:id:ikmbear:20200810154625p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200810/20200810154625.png) 

つまり、「**%が表示されるのはzsh特有の現象**」であると言えそうです。

## zshでは改行のない結果行を出力する時に、プロンプト「%」を表示する

zsh特有だというヒントが得られたので、ドキュメントをチェックしてみます。

[zsh: 16 Options](http://zsh.sourceforge.net/Doc/Release/Options.html#Prompting)

> PROMPT_SP Attempt to preserve a partial line (i.e. a line that did not end with a newline) that would otherwise be covered up by the command prompt due to the PROMPT_CR option. This works by outputting some cursor-control characters, including a series of spaces, that should make the terminal wrap to the next line when a partial line is present (note that this is only successful if your terminal has automatic margins, which is typical).When a partial line is preserved, by default you will see an inverse+bold character at the end of the partial line: a ‘%’ for a normal user or a ‘#’ for root. If set, the shell parameter PROMPT_EOL_MARK can be used to customize how the end of partial lines are shown.NOTE: if the PROMPT_CR option is not set, enabling this option will have no effect. This option is on by default.

順に読んでいきましょう。

> Attempt to preserve a partial line (i.e. a line that did not end with a newline) that would otherwise be covered up by the command prompt due to the PROMPT_CR option.

「PROMPT_CR オプションにより$1で覆われてしまうような部分行 (改行で終わらない行) を保存しようとする」

PROMPT_CRオプションについてはその上に記述があり、プロンプト（zshでは%）を表示する前にキャリッジリターン（CR）を印刷する（同一行の行頭に戻す）仕様のようです。

> This works by outputting some cursor-control characters, including a series of spaces, that should make the terminal wrap to the next line when a partial line is present

「カーソル文字（一連のスペースを含む）を出力することで、部分行を次の行に折り返す」

> When a partial line is preserved, by default you will see an inverse+bold character at the end of the partial line: a ‘%’ for a normal user or a ‘#’ for root.

「これが実行される時は、デフォルトでは反転して太文字で部分行の最後に一般ユーザなら「%」が、ルートユーザなら「#」が表示される」

字面だけだといまいちよくわからないので、具体的なソースと合わせて、動きを書いてみたいと思います。

まずrubyプログラムを実行します。printメソッドは改行を出力しません。

```
% ./print_num.rb123456789
```

ここでPROMPT_CRオプションに基づいて、CRを印刷します。すると改行がされていないため、同一行の先頭に移動した結果、出力結果が消えます。これが「PROMPT_CR オプションにより$1で覆われてしまうような部分行」ということです。

```
% ./print_num.rbusername@userMacbook folder%
```

で、こういうことが起こらないように、PROMPT_SPオプションがPROMPT_CRオプションに先んじて仕事をします。具体的には、一般ユーザであれば改行を含まない行の最後に（色が）反転した「%」を表示して改行します。

```
% ./print_num.rb123456789%
```

最後にPROMPT_CRオプションのCRが印刷されたのち、プロンプトが表示され、結果はこうなります。

```
% ./print_num.rb123456789%username@userMacbook folder%
```

### 余談

PROMPT_SPオプションを無効にすることで、「PROMPT_CR オプションにより$1で覆われてしまうような部分行」を実際に確認することができます。

```
% vi ~/.zshrc# .zshrcを編集unsetopt PROMPT_SP% source ~/.zshrc
```

実行結果

 ![f:id:ikmbear:20200810154709p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200810/20200810154709.png) 

部分行がCRにより覆われてしまい、見えなくなっていることがわかります。

## 「%」を排除するにはどうすればよいか

一つの手段はRuby側で改行を出力することです。最初のプログラムで

```
# print_num.rb#!/usr/bin/env ruby(1...10).each {|n| print n}puts "\n"
```

としておけば、出力結果が部分行に相当しないので、%は表示されません。

別の手段は、zshの設定（\~/.zshrc）を書き換えてしまうことです。

> If set, the shell parameter PROMPT_EOL_MARK can be used to customize how the end of partial lines are shown.

ここに記載の通り、PROMPT_EOL_MARKが、部分行の最後に出力される文字です。

これを「''（空白）」にしてしまえば、%は表示されず、部分行も保持されます。

```
% vi ~/.zshrc# .zshrcを編集export PROMPT_EOL_MARK=''% source ~/.zshrc% ./print_num.rb123456789
```

## 感想

- プログラム側で制御でき、環境に依存しないという点ではRubyで改行を出力してしまうのがいいのかなあと思いました。
- あと誰かが英訳力をプレゼントしてくれないかなと思う今日この頃です。
- ついでに記事のタイトルつける力もください、なんでもしますから。

## 参考

- [class Range (Ruby 2.7.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/class/Range.html)
- [zsh: 16 Options](http://zsh.sourceforge.net/Doc/Release/Options.html#Prompting)
