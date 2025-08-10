---
title: "わたしがRubyMineを使う理由"
publishDate: 2022-02-03 10:00:00
category: tech
draft: false
description: "わたしがRubyMineを使う理由"
tags:
  - ツール・ガジェット
  - RubyMine
slug: "202202031643850000"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220203/20220203082003.png

 ![f:id:ikmbear:20220203082003p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220203/20220203082003.png) 

## 「RubyMineの何がいいのか？」という問い

みなさんRubyMine使っていますか？昨今のエディタシェアでは、やはりVSCodeが一番大きなパイを占めているような感じですが、私はRubyMineが好きなのでずっとRubyMineを使っています（一部例外で、LiveShareを使いたいとか、Slidevのスライドを作る時だけVSCodeを使っています）。

そんな中、FJORD BOOT CAMPで「みんながおすすめするのでRubyMine使ってみたけど、他のエディタに比べて何がいいんだろう」という質問が出てきました。

というわけで今回は一利用者として「私がRubyMineを使う理由」を述べてみました。

## 世界中の開発者体験が機能として実装されている

VSCodeもかなり便利ですよね。VSCodeを追加していけば「RubyMineではこんなことできるよ」の大多数はVSCodeでもできると思います。これはVimやEmacsを使った場合でも同じで、つまりフルパワー状態の単純な機能比較によっては、普段使用していて馴染んでいるエディタにRubyMineが勝る点はあまりないかもしれません。

ではRubyMineを使用するメリットは何かというと **「世界中の開発者体験が、あらかじめ機能として実装されていること」** です。

たしかにVSCodeにVSCodeを追加すれば、RubyMine相当の機能を動かせるかもしれませんが、それはその機能にあなたが **「気がついた」** 場合です。使えたら便利だけど読むには細かいGitコマンドのオプションや、DBの操作方法の全てに気がつくことができるでしょうか？少なくとも私には難しそうです。

RubyMineを運営するJetBrains社は毎年[開発者に対して調査](https://www.jetbrains.com/ja-jp/lp/devecosystem-2021/)を実施し、[製品開発のためにJetBrains製のエディタのドッグフーディング](https://www.jetbrains.com/ja-jp/lp/dogfooding/)を行なっています。これによりRubyMineには、世界中の開発者が「これは開発によく使うし、あると便利」と思っている機能が最初から、つまり **「気がつかなくても」** 使えるようになっているわけです。

1人で学習を進めているいまだからこそ、私は世界中の開発者の動きを学習の補助輪とするために、RubyMineを使用しています。

## コマンド操作が全部「見える」から

RubyMineの操作は基本的にすべてGUI上で実行されます。

そのため、コマンドで実行すると複雑な操作も、実際にどういうことをやっているのかイメージがつきやすいです。

例えばGitの`rebase` は最たる例で、よくわからないけど必要だから...と$1上でやると、「なんかよくわかんない...」「変な感じで取り込まれてしまった...」となりがちです。

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/280efeef-03ae-4bff-ae5f-620539700455/Untitled.png) ![f:id:ikmbear:20220203071125p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220203/20220203071125.png) 

これをRubyMine上でやると、すべてを画面操作として実行できるので、

- 実際にどういう作業ができるのか
- 今自分が行った操作はどのような結果になるのか

が画面上で確認できるため、そのコマンドでできること、自分がやっていることのイメージがしやすくなります。いわばRubyMineが各コマンドの「図解！〇〇」的な役割を担うわけですね。

もちろんGUI→CUIへの変換は必要になりますが、コマンドの実行イメージがあるおかげで、CUIで実行する際にも意図通りに実行しやすくなり、実行への恐怖感も薄れます。

## はじめこそ、ちゃんと整備された道具を使ったほうがいい

私は高校時代に初めてギターにさわり、パン作りを始めました。

ギターの方は安いアコギを買ってしまったがために、弦高が高くてしばらくバレーコードが弾けなかったのですが、友達の高いギターはとても弾きやすくて、それを借りて練習しているうちに、安い方のアコギでもバレーコードが弾けるようになりました。

パン作りの方はずっと独学でやっていたのですが、大学時代にアルバイトで実際に製パンをやらせてもらえることになり、そのときに初めて整備された環境でパンを作ったことで、一気にパン作りのコツを掴むことができました。4年分の成長が3日で追い越されるくらいのブレイクスルーでした。

双方の話に通じるのは、「初めから整備された環境でやっていれば、もっと早く成長できたのに」ということです。何も最高級の環境を整えろというわけではありませんが、最初のうちは**「どんな道具が必要か」**がわからず「**正しい型**」もわかっていない状態です。

そんな状態だからこそ、はじめのうちこそRubyのためのフルマネージドなIDEであるRubyMineを使うのがいいんじゃないかなと思っています。

「弘法筆を選ばず」と言いますが、そもそも弘法って達人の域の話なので、個人的には「初めのうちは筆を選んでいけ」という気持ちです。

## おわりに

というわけで今回は「私がRubyMineを使う理由」をお届けしました。

私自身も初学者であるがゆえに、全体的に初学者向けの内容になってしまいました（ある程度プログラミングできる人は、自分の欲しい機能とか開発スタイルでエディタを選ぶ気がするんだ...）。

<iframe id="talk_frame_675304" class="speakerdeck-iframe" src="//speakerdeck.com/player/f1c02840455b4d159d18563e517ee6b2" width="710" height="399" style="aspect-ratio:710/399; border:0; padding:0; margin:0; background:transparent;" frameborder="0" allowtransparency="true" allowfullscreen="allowfullscreen" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

> [speakerdeck.com](https://speakerdeck.com/ikumatadokoro/chu-xin-zhe-koso-rubyminedeshi-meyou)

以前FJORD BOOT CAMPの中で行われたLT会でも「初心者こそ！RubyMineで始めよう！」という話をさせていただきましたが、やはり最適化された開発フローをエディタを通じて学べるからこそ、自分のようなエンジニア未経験者でもお金を払ってRubyMineを使用する価値はあると思っています。

とはいえ、エディタってやっぱりエンジニアの道具の中で一番大きい部分なので、最後は「自分が使いたいエディタ」で楽しく開発するのがいいんじゃないですかね、と雑にしめて終わりにしたいと思います。

## 宣伝：RubyMine入門は無料で読めます！

この記事を読んで、「RubyMine使ってみようかな...でも使いこなせるか不安...」と思った方、ZennでRubyMine入門という無料で読める$1を出しています！

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fzenn.dev%2Fikuma%2Fbooks%2Fhow-to-use-redimine" title="RubyMine入門" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [zenn.dev](https://zenn.dev/ikuma/books/how-to-use-redimine)

基本的な操作からGit、エディタの見た目変更まで、RubyMine初心者に必要な内容を詰め込んだ一冊になっているので、ぜひに！
