---
title: "VSCodeVimで使えるインデントオブジェクト"
publishDate: 2020-08-07 12:35:31
category: tech
draft: false
description: "VSCodeVimで使えるインデントオブジェクト"
tags:
  - ツール・ガジェット
  - vim
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200807/20200807101559.gif

- [Vimではiiコマンドで全選択できる？](#Vimではiiコマンドで全選択できる)
- [iは「インデントオブジェクト」（VScodeVim）](#iはインデントオブジェクトVScodeVim)
- [実践！インデントオブジェクト](#実践インデントオブジェクト)

  - [\<operator\> ii ：カーソルの位置と同じインデントを指定](#operator-ii-カーソルの位置と同じインデントを指定)
  - [\<operator\> ai ：カーソルの位置と同じインデント+そのインデントの一行上を指定](#operator-ai-カーソルの位置と同じインデントそのインデントの一行上を指定)
  - [\<operator\> aI ：カーソルの位置と同じインデント+そのインデントの一行上と下を指定](#operator-aI-カーソルの位置と同じインデントそのインデントの一行上と下を指定)
  - [テキストで再確認](#テキストで再確認)

- [まとめ](#まとめ)
- [感想](#感想)
- [参考](#参考)

## Vimでは`ii`コマンドで全選択できる？

Google検索で「vim 全選択」と検索すれば、こんな感じのコマンドが出てきます。

1. gg
2. Shift + v（行選択ビジュアルモードにしないと、最後の一行がうまく選択されないので注意）
3. G

 ![f:id:ikmbear:20200807101559g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200807/20200807101559.gif) 

この方法が正攻法なのですが、へっぽこvimmerである私はキーボーvimmerチャコンの末に別の方法で全選択する方法を見つけました（注意：結論としてはこれは全選択のコマンドではありません）！

 ![f:id:ikmbear:20200807102024g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200807/20200807102024.gif) 

ビジュアルモードにした後、コマンド`ii`を入力すると、上図のような結果（全選択）になります。

「テキストオブジェクト「ii」を入力すると全選択できる？ 」  
「いやちょっと待てよ、テキストオブジェクトで「i」なんて聞いたことないぞ」  
そこで今回は`ii`すなわち「inner i?」の「i」とはなんぞやを調べてみました。

## `i`は「インデントオブジェクト」（VScodeVim）

まず同じテキストファイルに対して、シェル上で同じコマンドを入力しても全選択にはなりません（無効なキーを押した時のあの音がなります）。

ということは、この機能はVSCodeのVSCode「VSCodeVim」特有の機能ということになります。

そこでvimのページを確認してみると、「vim-indent-object」なるものが。

 ![f:id:ikmbear:20200807102402p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200807/20200807102402.png) 

> Based on vim-indent-object, it allows for treating blocks of code at the current indentation level as text objects. Useful in languages that don't use braces around statements(e.g Python)

要はカーソルの現在位置と同じインデントを、テキストオブジェクトとして扱うことができるということです（以降インデントオブジェクトと呼ぶ）。

（私はPython触ったことないので初めて知りましたが）Pythonのようにインデントでブロックを構成する言語には、このインデントオブジェクトはめちゃ便利ということらしいです。

```
a = 3if a == 5:    print "AAA"    # if文の対象    print "BBB"    # if文の対象print "CCC"        # if文の対象ではない
```

引用：[とほほのPython入門 - 構文 - とほほのWWW入門](http://www.tohoho-web.com/python/syntax.html)

## 実践！インデントオブジェクト

VSCodeVimの概要ページにはコマンドの説明もあるので、実際に試してみます（ビジュアルモードで試すので、オペレーターは指定しません）。

### `<operator> ii` ：カーソルの位置と同じインデントを指定

 ![f:id:ikmbear:20200807102640g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200807/20200807102640.gif) 

冒頭でのべた「iiで全選択」は**「一番外側のインデントにカーソルをおいて、インデントオブジェクト`ii`を指定すれば、実質全選択」**ということでした。

（サンプルのアニメで上下移動も怪しいへっぽこvimmerだということがばれましたね...）

### `<operator> ai` ：カーソルの位置と同じインデント+そのインデントの一行上を指定

 ![f:id:ikmbear:20200807102838g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200807/20200807102838.gif) 

### `<operator> aI` ：カーソルの位置と同じインデント+そのインデントの一行上と下を指定

 ![f:id:ikmbear:20200807103642g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200807/20200807103642.gif) 

### テキストで再確認

テキストで各コマンドの範囲を確認すると、以下のようになります。

```
<div>  <p>vimvimvimvimvimvimvimvimvimvimvimvimvim</p>    <div>　<!--aiと、aIの上方向はここまで-->      <p>vimvimvimvimvimvimvimvimvimvimvimvimvim</p> <!--iiだとここまで-->      <p>vimvimvimvimvimvimvimvimvimvimvimvimvim</p>      <p>vimvimvimvimvimvimvimvimvimvimvimvimvim</p>      <p>vimvimvimvimvimvimvimvimvimvimvimvimvim</p> <!--ここでコマンドを実行-->    </div> <!--aIの下方向はここまで--></div>
```

## まとめ

- VSCodeVimでは、標準で「インデントオブジェクト」がサポートされている。
- 「インデントオブジェクト」：現在のカーソル位置のインデントを基準として、同じインデントの範囲を指定する。
- 一番外側のインデントにカーソルをおいてインデントオブジェクトを指定すると、実質全選択をすることができる。

## 感想

vimの世界だけでも広かったのに、VscodeVimの世界も広がってしまいました（vimの説明をみた限りでは、なんか他にもいろいろ独自のvimがありそうな感じでした）。  
困ったら都度都度覚えるしかないですね〜😭

## 参考

- [とほほのPython入門 - 構文 - とほほのWWW入門](http://www.tohoho-web.com/python/syntax.html)
- [vim-indent-object](https://github.com/michaeljsmith/vim-indent-object)
- [VSCode Vim ワンキーで全選択(ctrl+a)をしたい │ wonwon eater](https://wonwon-eater.com/vscode-vim-all-select/)
