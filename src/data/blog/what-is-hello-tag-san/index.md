---
title: 「こんにちは TAG-さん!」とは何か
publishDate: 2024-05-04T15:50:06.000+09:00
category: tech
draft: false
description: W3C TAG の ISSUE TEMPLATE を眺めていると、なぜか「こんにちは TAG-さん!」という文字列が出てきます。なぜここで突然日本語が出てくるのか。今回はその原因をテンプレートの変更履歴から調査しました。
tags:
  - W3C
  - Today I Learned
---
## こんにちは TAG-さん!

https://github.com/w3ctag/design-reviews/issues

W3C Technical Architecture Group が保有する design-reviews というリポジトリでは、新しい仕様に対するレビューが GitHub Issue で行われています。

直近の Issue のすべてが「こんにちは TAG-さん! 」で始まっており、なぜ突然日本語が出てくるのか不思議に思ったので調査することにしました。

![](https://storage.googleapis.com/zenn-user-upload/97e4e2bfdf0a-20240504.png)

## 調査結果

- この挨拶文は ISSUE TEMPLATE に含まれている。
- W3C TAG では定期的に Face to Face Meeting を行っており、その開催地に合わせて挨拶文が変わる。
- ただし厳密な運用はしておらず、「こんにちは TAG-さん!」は 2023 年 04 月に開催された東京での MTG に合わせたもの。

## 調査詳細

### Issue template を確認する

全員同じ始まりということはおそらくテンプレートがそういう形式なのだろうということで、確認したところ、確かにテンプレートに「こんにちは TAG-さん! 」の文字列が含まれていました。

https://github.com/w3ctag/design-reviews/blob/main/.github/ISSUE_TEMPLATE/005-early-design-review.md?plain=1#L11

https://github.com/w3ctag/design-reviews/blob/main/.github/ISSUE_TEMPLATE/010-specification-review.md?plain=1#L11

https://github.com/w3ctag/design-reviews/blob/main/.github/ISSUE_TEMPLATE/020-dispute-escalation.md?plain=1#L10

ISSUE TEMPLATE は 3 種類あります。

| template 名                   | 内容                                                                        |
| ----------------------------- | --------------------------------------------------------------------------- |
| 005-early-design-review       | 初期段階での方向性について考えやガイダンスを提供してほしい場合に使用        |
| 010-specification-review      | 現在取り組んでいる Web 技術の仕様についてレビューしてもらいたいの場合に使用 |
| 020-dispute-escalation-review | 現在の論争について意見を求める場合に使用                                    |

### Issue template の起源

https://github.com/w3ctag/design-reviews/commit/68a1436aa797b7b30002a5ec39f4ce1dfa451942

git blame すると、2019年05月23日にこのテンプレートが作成されたことがわかります。
ここを確認すると、この時点で「こんにちはTAG!」（現在は「こんにちは TAG-さん!」）という文字列が含まれていることがわかりました。

作成された際のコミットメッセージは次のとおりであり、もともと「specification review」というテンプレートがどこか（メーリングリストとか？）にあったことが伺えます。

> Create issue templates in the new format
> Make issue templates in the new format. Use the existing template as a "specification review" template, and create a somewhat different template for "dispute resolution".

なお Issue Template をこのリポジトリに作成した人物は Google に勤めるエンジニアの L. David Baron さんです。

https://github.com/dbaron

### もっと！Issue template の起源

現在の Issue Template はここまでしか辿れませんが、日付と過去に別のテンプレートがあった、という情報が手に入ったので、リポジトリ全体の History を参照してみました。

すると、2019年05月09日に ISSUE_TEMPLATE.md を変更しているコミットを発見。

https://github.com/w3ctag/design-reviews/commit/426a9a8b3fc6314deb9f44a60ade76d2edaca6fd

このファイルの履歴を辿ってみます。

https://github.com/w3ctag/design-reviews/commits/426a9a8b3fc6314deb9f44a60ade76d2edaca6fd/ISSUE_TEMPLATE.md

まず 2016年11月02日にテンプレートのファイルが作成されていました。

https://github.com/w3ctag/design-reviews/commit/9ed6f17be379a5d0d9397c5311ac9634fcab84d4

コミットメッセージには「F2Fからの Issue template。共同で構築。」と記載があります。

> Issue template from F2F. Collaboratively constructed.

この「F2F」について検索してみると、どうも W3C が開催している「Face to Face」 Meeting のことを指しているようです。

### TAG Meeting 2016@Tokyo

2016年11月02日あたりに開催された TAG の Meeting を検索してみると、どんぴしゃで2016/10/31 - 2016/11/02 @東京 開催のMTGがあることがわかりました。

https://www.w3.org/events/happenings/2016/technical-architecture-group-tag-meeting-2/

Web サイトのリンクがあったので眺めてみる。どうも日経ビルでやっていたそうな。

https://github.com/w3ctag/meetings/tree/gh-pages/2016/11-tokyo

議事録があるようですが、どれも W3C TAG のトップページに飛んでしまい参照できませんでした。最新の MTG の議事録の格納場所に移動されていないかみてみたものの、最近では直接 GitHub に保存しているのでダメそうです。

これ以上は追えないものの、ここを起源にテンプレートが生まれたことがわかりました。

### greeting の変遷

https://github.com/w3ctag/design-reviews/commit/6bd78d4e674e5428c32f914bec64739164ba7a54

テンプレートが作成されて以降、初めて挨拶部分が変更されたのがこのコミット。2017年07月にはたしかにロンドンで F2F MTG が開催されており、これに合わせて「Dear Sirs and Madam of TAG!」に変わっている。

テンプレートができた時から、初めて挨拶部分が変更されたときまでに、02-boston、04-tokyo の2回が開催されている。ボストンについてはアメリカなので変更の余地がありませんが、なぜ東京は変えなかったのか...（東京の時に Hello で作ったので、変えようと思わなかったのかも？）？

何はともあれ、2017年07月以降、その回の MTG の会期中に、次回の開催地の挨拶文に変わるという文化が始まったようです。

### 改めて「こんにちは TAG-さん!」を確認する

https://github.com/w3ctag/design-reviews/commit/d7015be036a57a19e9be170eeb914e425db9b65c

この変更が入ったのは、2023年02月13日。確かに2023年04月には東京で F2F MTG が開催されているものの、それ以降も MTG は開催されており、一方で挨拶文は変わっていない。

よくよくみてみると、必ずしも毎回挨拶文が変わっているわけでもなく、厳格な運用（挨拶文の変更に厳格な運用も何もないが...）はされていないようでした。

## おわりに

あまり重要ではない情報の調査に時間を使ってしまったような気がしましたが、調査の過程で W3C TAG に少し詳しくなれたのでよかったです。
