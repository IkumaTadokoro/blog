---
title: "Slapdashを使って、瞬間で Notionにアイデアを追加する"
publishDate: 2022-02-17 10:30:00
category: tech
draft: false
description: "Slapdashを使って、瞬間で Notionにアイデアを追加する"
tags:
  - ツール・ガジェット
  - Notion
  - Slapdash
author: ikuma-t
slug: "202202171645061400"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217080548.png

 ![f:id:ikmbear:20220217080548p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217080548.png) 

## Notionは情報を貯めるには便利だけど、開くのは面倒

Notionも「辛い」と言われるくらいに普及してきましたね。英語版だけだったり、無料ユーザーはブロック数に制限があったりした時代が懐かしいです。

 ![f:id:ikmbear:20220217073348p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073348.png) やっぱり1つの情報を複数の表示形式で閲覧することができるのは非常に画期的で、自分もブログネタを管理するのに使用しています（同じDBをボードとカレンダーで表示して、コンテンツの状況と締切を一覧している）。

こうやって溜まった情報を閲覧するにはすごい便利なんですが、問題はちょっとリッチ & ゆるすぎて、新しい情報を登録するためにわざわざNotionを開くのが面倒くさいんですよね。

特にブログ記事みたいなア$1は、他の作業をしている時にふっと思いつくものなので、Notionを開くことによる$1が発生するのがネックでした。

そこでSlapdashというコマンドランチャーの機能を使い、Notionへの登録を簡略化したのですが、これが結構よかったのでご紹介したいと思います。

## Slapdashの使い方

### Slapdashとは

Slapdashは各種Webアプリを統合し、まとめて操作できるランチャーアプリです。

TrelloやAsanaといったプロジェクト管理ツールから、GitHub、Figmaといったクリエイティブツールまで、このアプリから一括で検索、追加、編集を行うことができます（※：アプリによって、操作できる範囲は異なります）。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fslapdash.com%2F" title="Slapdash: work at the speed of thought" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [slapdash.com](https://slapdash.com/)

 ![f:id:ikmbear:20220217073457g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073457.gif) 

例えばGitHubを連携した場合、GIFのようにどこからでもコマンドパレットを立ち上げ、自分が関与しているGitHubのIssueを横断して検索することができます（ここからIssueを選択し、登録・編集操作が可能です）。

 ![f:id:ikmbear:20220217073556p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073556.png) 

価格についてはBasic、Pro、Teamsの3つのプランがありますが、今回紹介する範囲はBasic、すなわち無料で使える範囲での機能紹介になります（私もBasic会員です）。

 ![f:id:ikmbear:20220217073617g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073617.gif) 

ランチャー画面とは別に起動画面があり、ここからアプリを連携したり、Spaceと呼ばれる空間にリンクを突っ込んだり、自分専用のコマンドを作成することができます。

### Notionと連携する

 ![f:id:ikmbear:20220217073649p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073649.png) 

SlapdashはNotionにも対応しており、操作としては

- ページの新規作成（Not DB）
- DBに新たにページを追加
- 既存のページに対してコンテンツを追加

の3つに対応しています。

 ![f:id:ikmbear:20220217073713p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073713.png) 

Notionを連携する場合は、Slapdashを起動してから「Apps」を選択し、

 ![f:id:ikmbear:20220217073728p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073728.png) 

「App Store」からNotionを選択します（私の場合は接続済になっているので表示が異なりますが、新規接続の場合はConnectというボタンが表示されているので、それを選択します）。

 ![f:id:ikmbear:20220217073743p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073743.png) 

この接続を行った時点で存在するNotionのページやDBに対して、Slapdashへと編集の許可が降りるようになっています。そのため、接続後に新しくNotionページやDBを追加し、それらに対してSlapdashから操作を行いたい場合は、Notion側でAPIを許容する必要があります（Notion右上のShare → SlapdashをInviteする）。

## Slapdashから実行できるNotionの操作

### Notion内の検索を行う

 ![f:id:ikmbear:20220217073814g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073814.gif) 

「Notion」と入力し、「Filter by Notion」を選択することで、Notionのページを横断的に検索することができます。また「Notion」と入力しなくても検索ワードを直接入力してもページやDBにたどり着くことができます。

### SlapdashからNotionのページを作成する

 ![f:id:ikmbear:20220217073856p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073856.png) 

「Notion」→「Create New Notion Page」と進むことで、単一のページを作成することができます。作成する際には作成場所となる親のページを指定します。

作成する際にページタイトルやコンテンツは指定できません。あくまでページを作成するのみです。

### SlapdashからNotionのデータベースにページを追加する

 ![f:id:ikmbear:20220217073919p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073919.png) 

「Notion」→「Add to Notion Database」と進み、対象のDBを指定することで、そのDBに新しくページを追加することができます。

紙芝居でイメージをご紹介しましょう🐵🦀

 ![f:id:ikmbear:20220217073934p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217073934.png) 

例えば私の場合だと、このようなプロパティを持ったブログネタ管理用のDBがあります。ここに新しくページを追加します。

 ![f:id:ikmbear:20220217080735p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217080735.png) 

対象のDBとして「ブログ」にカーソルを合わせTab or Enterキーを押します。

 ![f:id:ikmbear:20220217075722p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075722.png) 

するとこのDBのプロパティとコンテンツを入力するためのフォームが出てきます。各プロパティには、Notionであらかじめ指定しておいたフォーマットに合わせて入力を行うことができます（リストやカレンダーなど）。

 ![f:id:ikmbear:20220217075130p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075130.png) 

「Add」を押すと、作成した記事に対するアクションを指定することができます。今回は「Open in Notion」で作成した情報をチェックしてみましょう。

 ![f:id:ikmbear:20220217075145p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075145.png) 

先程入力した内容がNotionに追加されました。Markdownも正しく反映されています。

### 追加したNotionのページにコンテンツを追加する

先ほどはNotionにページを追加する操作でしたが、追加したページに内容を追記することもできます。

 ![f:id:ikmbear:20220217080935p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217080935.png) 

「Notion」→「Add to Notion Page」と進み、ページを指定することでコンテンツを追加することができます。こちらも紙芝居で動作をみていきましょう。先程追加した「新しいブログ記事」に対して追加を行っていきます。

 ![f:id:ikmbear:20220217075228p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075228.png) 

ページを選択すると、コンテンツの入力フォームが表示されます。こちらもMarkdownで内容を記述することができます。

内容を追記したら「Add」を選択し、先程と同じように「Open in Notion」で作成した情報をチェックしてみます。

 ![f:id:ikmbear:20220217075241p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075241.png) 

ページの最下部に今追加し内容が追記されました！

## Tips：templateを作成する

「このDBにテーブルを追加することがほとんど」「新規作成時はこのステータスで登録する」といった具合に、具体的なケースがある場合はSlapdashのテンプレート機能を利用して効率化することができます。

 ![f:id:ikmbear:20220217080843p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217080843.png) 

Slapdashから「Create Command」→「Template」と進みます。

 ![f:id:ikmbear:20220217075309p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075309.png) 

テンプレートは連携しているサービスに対してそれぞれ作成できるのですが、今回はNotionへのDB追加のテンプレートを作成するため、「Add to Notion Database」を指定します。

 ![f:id:ikmbear:20220217075328p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075328.png) 

まずはNotionのテンプレートを指定します。ここで指定した項目がSlapdashからの登録時のデフォルト値になります。

 ![f:id:ikmbear:20220217075350p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075350.png) 

Notion側の設定を終えたら、ページをスクロールしテンプレート自体の設定を行います。

Nameにはテンプレートの名前を、その他アイコンや説明を追記します。$1を設定しておくと、Slapdashのコマンドパレットにその$1を入力することで、テンプレートを呼び出すことができます。

設定が完了したら「Create Command」を押して、実際に試してみましょう！今回はwtという$1を貼ったので、これをキーに呼び出してみます。

 ![f:id:ikmbear:20220217075428g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220217/20220217075428.gif) 

呼び出した入力画面に、あらかじめ設定した内容が反映されていることが確認できました。

## おわりに

というわけでSlapdashを使ったNotionの更新フローの紹介でした。

私はこれを使って、冒頭にも述べた通りブログネタを登録して思いついた時にア$1を追記したり、やりたいことリストを追加したりしています。

思いついた時に登録することでア$1を漏らさず、かつどこからでも登録できることで現在のタスクから大きく$1をすることもなく、快適に生活できています。

SlapdashはNotion以外のツールにも対応していますので、ぜひ試してみてください。
