---
title: "OSS gateにビギナーとして参加しました！"
publishDate: 2022-01-30 11:30:05
category: tech
draft: false
description: "OSS gateにビギナーとして参加しました！"
tags:
  - PROGRAMMING
  - イベント
author: ikuma-t
modDatetime: 2022-01-30 11:30:05
slug: "202201301643509805"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220130/20220130112941.png

 ![f:id:ikmbear:20220130112941p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220130/20220130112941.png) 

昨日 [OSS Gateオンラインワークショップ](https://oss-gate.doorkeeper.jp/events/125414) にビギナーとして参加してきました！

## OSS Gateとは？（引用）

> 「OSS Gate」とはOSS開発に参加していない人が参加する人に変わる「入り口」を提供する取り組みです。
>
> OSS開発に未参加の人向けに参加方法を伝える場を継続的に提供することにより、OSS開発に参加する人を増やすことができるのではないか。それを実現することが「OSS Gate」という取り組みの目的です。
>
> 参考：[OSS Gateへようこそ！](http://oss-gate.github.io/announce/update/2015/12/17/welcome-to-oss-gate.html)

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Foss-gate.doorkeeper.jp%2F" title="OSS Gate" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [oss-gate.doorkeeper.jp](https://oss-gate.doorkeeper.jp/)

## 参加した理由

OSS Gateのアンケートには一つだけ書いたんですが、よくよく考えると3つくらいありました。

1. いつもOSSにお世話になっているので、自分もそこに貢献したいと思ったから
2. 2020年にCOVID-19のサイトがOSSとして作成された時に、自分はIT業界で働いているのに何もできなくて、ちゃんと勉強して社会の役に立ちたいと思ったことが原点の一つとしてあるから
3. （OSSに限らず）不満に対して文句を言うんじゃなくて、それを改善できるように生きていきたいと思っている。そのための手段としてプログラミングを学び始めたから

というような思いが常々あって、でもやっぱり見ず知らずの人にパッチとかIssueを送るのはちょっと気がひけるので、背中を押してもらうために参加しました。

## 作業内容

イベント自体は10:30〜17:00まで、そのうち手を動かしている時間は11:00\~15:00すぎくらいまででした（途中で休憩あり）。

今回はオンライン開催だったので、Discord上で作業を進めました。作業ログを見て適宜サポーターさんから$1 & 後述の作業ログのコメントで「いいですね〜」「こういうところを見てみるのもいいかも」みたいなサポートをもらいつつ進める感じです。

作業内容としては、貢献したいOSSを選んで、それを公式のドキュメントに則って動かす中で改善した方がいいこと、エラーになったことを投げるという形式だったので、私は最近利用したMarkdownを使ってスライドが作れるツールのSlidevを対象にすることにしました。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fslidevjs%2Fslidev" title="GitHub - slidevjs/slidev: Presentation Slides for Developers (Beta)" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/slidevjs/slidev)

OSS Gateの特徴として、作業中は常に作業ログを取っていきます。実際に私が取った作業ログはこんな感じです。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Foss-gate%2Fworkshop%2Fissues%2F1538" title="OSS Gate Workshop: Online: 2022-01-29: ikuma-t: slidev: Work log · Issue #1538 · oss-gate/workshop" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/oss-gate/workshop/issues/1538)

以前、「ログ駆動開発」というテーマでLTを行ったことがあって、自分も普段から作業時は全部ログを書いているんですが、これに似ているかな〜とか思いました。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fikmbear.hatenablog.com%2Fentry%2F20211219%2F1639875600_1" title="⚡️初めてのLT会 Vol.10で登壇しました！！ - セットプチフォッカ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe>

> [ikmbear.hatenablog.com](https://ikmbear.hatenablog.com/entry/20211219/1639875600_1)

## 成果物

### 作成したIssue

というわけで実際に投げたIssueがこちらになります！

 ![f:id:ikmbear:20220130111402p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220130/20220130111402.png) 

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fslidevjs%2Fslidev%2Fissues%2F469" title="The installation of playwright-chromium is different between the documentation and the error log. · Issue #469 · slidevjs/slidev" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/slidevjs/slidev/issues/469)

Slidevには作成したスライドのExport機能があって、これが`playwright-chromium`というパッケージに依存しています。

これがない場合には、コマンド側は`npm i playwright-chromium`をするように例外を投げるのですが、一方でドキュメントには`npm i -D playwright-chromium`、つまりdevDependenciesとして追加をするように推奨していて齟齬があり、ここを統一した方がいいのでは？というIssueを立てました。

サポーターさんにも👍をいただいたポイントなのですが、この2つの文言が追加された経緯をGit Blameで辿っていけたのがよかったです。

遡っていくと、これらの文言は全く同じコミットで追加されていることがわかり、「書き間違いというか表記揺れかな？」と思えたことが主張の安心材料になりました。

### 気づき

午前中にさわっていた時は「エラーにはなったけど、別にログを見ればわかるからここはフィードバックポイントじゃないかな〜」と思っていたんですけど、サポーターのDaipomさんとPiroさんが書いていただいたコメントから、間接的にですが「あれ？案内している文言が違うかも」と気がつくことができました。自分でやるときはちょっとでも「ん？」と思ったところは一旦視点を変えて見つめ直すのがいいかな〜と思いました！

あとはIssueの下書きが出来上がった際に、「やっていないことを書いてみると文意が伝わりやすくなるかも」「こういう返答も想定されるので、自分のお気持ちも書いておくといいかも」といったアド$1をもらうことができました。前にkoicさんの動画でみたと思うんですが、「なぜそれを取り込む必要があるのか」「そのための判断材料」を意識して書いていくのがやっぱり大切なんだと、自分でやってみて感じました✍️

## 前提知識として何が必要か？

「OSSを動かした際のポイントをフィードバックする」というプログラムなので、そのOSSに対してめちゃくちゃ詳しくないといけないということはないかな〜という印象です。

技術的な前提としては

- Git / GitHubが使える
- 黒い画面が使える

ってところですかね。実際私も、ブラウザでドキュメント読む→ターミナルでインストールする→ブラウザ上でIssueを立てるって感じでした。

あとは対象となるOSSを自分で決める必要があるので、最近使ったアプリをちょっと思い出しておくといいかもです（私は当日ふと頭に出たのでSlidevにしましたが、Gemとかでもよかったかも）。なおOSSかどうか、Issueをたてるポイントがありそうかは、プログラムの中で確認するので事前チェックは不要です。

## 感想

参加する前は「本当にこの時間内でIssueを立てられるのかな？」と内心不安だったんですが、本当に立てることができて、驚き & とても嬉しかったです！

OSS Gateの目的として「自分1人でもOSSに参加できるようになる（気持ちになる）」という点があるのですが、今回実際にIssueを立てることでこれからもやっていけそうだな！と感じました。

（...実際にOSS Gate終了後に今回扱ったSlidevの別件の対応の準備を始めました💪）

OSS貢献へのあと一歩が踏み出せなかった理由に「こんなんで大丈夫なのかな？」という気持ちがきっとあったのですが、今回サポーターの皆さんに自分のやっていることを「承認」してもらえたり、「客観視」した上でアドOSSをもらえたことで、自分1人の中に沈み込んでいた不安が大きく開けた気持になりました！

今回の挑戦をステップに、どんどんOSSの世界を楽しみたいと思えるイベントでした！サポートいただいた皆さん、ありがとうございました！！！！😊

---

**余談**

...当日Piroさんに言えなかったんですけど、「シス管系女子全部持ってます！初めてLinuxの勉強する時に買いました！」とここに書き残しておきます😅

 ![f:id:ikmbear:20220130111448p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220130/20220130111448.png) 

## おわりに：次回OSS Gateのご案内と気になる方へ

OSS Gateは定期的に開催されていて次回は3/8みたいです。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Foss-gate.doorkeeper.jp%2Fevents%2F129871" title="OSS Gateオンラインワークショップ2022-03-08【平日開催】" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [oss-gate.doorkeeper.jp](https://oss-gate.doorkeeper.jp/events/129871)

参加できるサポーター枠によって、ビギナーとして参加できる方の数も変わってくるのですが、ビギナーには「サポーターを1人以上連れてくるビギナー」枠があります。

> 「サポーターを1人以上連れてくるビギナー」枠
>
> - 今回のワークショップに「サポーター」で参加する人を見つけ、自分は「ビギナー」で参加する枠です。
> - 実際に「サポーター」の登録者が1人増えたら繰り上がります。
> - どの「サポーター」がどの「サポーターを1人以上連れてくるビギナー」に対応しているかはわからないので一番最初に登録していた「サポーターを1人以上連れてくるビギナー」が繰り上がります。

もし「OSS Gate興味あるけど、枠もいっぱいだし...」という方がいたら、次回開催に限らず、お声がけいただければサポーターとして参加しようと思うので、コメント欄でもTwitterでもお気軽にご連絡ください！
