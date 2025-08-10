---
title: "【Todoist→Pixela】Todoistでタスクを完了したら草生やす"
publishDate: 2021-01-08 12:28:06
category: tech
draft: false
description: "【Todoist→Pixela】Todoistでタスクを完了したら草生やす"
tags:
  - ツール・ガジェット
  - Todoist
  - Pixela
author: ikuma-t
modDatetime: 2021-01-08 12:28:06
slug: "20210108122806"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108111222.jpg

 ![f:id:ikmbear:20210108111222j:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108111222.jpg)

# Todoistのタスクが完了したら草を生やしたい

[Pixela](https://pixe.la/ja)というサービスを知ってから、私の頭の中は「どう草を生やすか」で持ちきりです。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fpixe.la%2Fja" title="Pixela | あなたの頑張りや継続を記録し、育てたい。そのすべてを、APIで。" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [pixe.la](https://pixe.la/ja)

今回は私が日常的に使っているタスク管理アプリ「Todoist」と連携し、タスクが完了したら草を生やすようにしてみました。

> なんでも草を生やしたがるお年頃
>
> ikuma-t/todoist-graph | Pixela [https://t.co/2eRIHRZq5W](https://t.co/2eRIHRZq5W) [#Pixela](https://twitter.com/hashtag/Pixela?src=hash&ref_src=twsrc%5Etfw)
>
> — Ikuma_t (@ikumatdkr) [2021年1月8日](https://twitter.com/ikumatdkr/status/1347345273626845186?ref_src=twsrc%5Etfw)

- [Todoistのタスクが完了したら草を生やしたい](#Todoistのタスクが完了したら草を生やしたい)
- [Pixela側の設定](#Pixela側の設定)

  - [1. （ユーザー未登録の場合）ユーザ登録](#1-ユーザー未登録の場合ユーザ登録)
  - [2. Todoist用のグラフの作成](#2-Todoist用のグラフの作成)
  - [3. Webhookの登録](#3-Webhookの登録)

- [Todoist側の設定](#Todoist側の設定)

  - [方法1：IFTTTを使う](#方法1IFTTTを使う)

    - [1. If ThisにTodoistを設定する](#1-If-ThisにTodoistを設定する)
    - [2. Then ThatにWebhookを設定する](#2-Then-ThatにWebhookを設定する)

  - [方法2：TodoistAPIを使う（※Todoistプレミアムユーザ向け）](#方法2TodoistAPIを使うTodoistプレミアムユーザ向け)

- [草はいいよね](#草はいいよね)

# Pixela側の設定

一億総草生やし社会の実現のためには、「いつものそれ」ではいけませんね。というわけで、Pixela側の設定も記載します。

手順としては次の通りです。全部ターミナルから`curl`コマンドで実行しています。

1. （ユーザー未登録の場合）ユーザー登録
2. Todoist用のグラフの作成
3. Webhook の登録

### 1. （ユーザー未登録の場合）ユーザ登録

```
$ curl -X POST https://pixe.la/v1/users -d '{"token":"{PASSWORD}", "username":"ikuma-t", "agreeTermsOfService":"yes", "notMinor":"yes"}'
```

`token`の後ろの`{PASSWORD}`には任意のパスワードを、`username`にはグローバルに一意な自分のユーザIDを設定してください。
※以降も設定した値に置き換えて進めてください。

### 2. Todoist用のグラフの作成

```
$ curl -X POST https://pixe.la/v1/users/ikuma-t/graphs -H 'X-USER-TOKEN:{PASSWORD}' -d '{"id":"todoist-graph","name":"todoist-graph","unit":"updates","type":"int","color":"ichou","timezone":"Asia/Tokyo"}'
```

指定できるパラメータは[POST - /v1/users//graphs - Pixela API Document](https://docs.pixe.la/entry/post-graph)を参照してください。
Scrapboxの更新頻度で草を生やす際に芝生色を使ったので、今回は`color`に`ichou`を指定しています。

### 3. Webhookの登録

```
$ curl -X POST https://pixe.la/v1/users/ikuma-t/webhooks -H 'X-USER-TOKEN:{PASSWORD}' -d '{"graphID":"todoist-graph","type":"increment"}' | pbcopy
```

リク$1トすると

```
{"webhookHash":"xxxxx.....xxxxx","message":"Success.","isSuccess":true}
```

こんな感じの値が返ってくるのですが、これをコピーするために`pbcopy`をくっつけています（手動でコピーしてもいいんですけどね）。
実際に使うのは`"webhookHash":"xxxxx.....xxxxx"`の値だけです。

これでPixelaの設定は完了です！Todoistの設定をしましょう！

# Todoist側の設定

Todoistのタスク完了時に草を生やすには2種類の方法があります。

|                         | TodoistAPI                                                                                                                                                                                                                                                                                                                                                               | IFTTT                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| 利用可能なTodoistプラン | プレミアム                                                                                                                                                                                                                                                                                                                                                               | 制限なし                                               |
| 送信可能なタイミング    | タスク（追加、更新、完了、完了解除、削除） <br/>メモ（追加、更新、削除） <br/>プロジェクト（追加、更新、削除、$1、$1解除） <br/>ラベル（追加、更新、削除） <br/>フィルタ（追加、更新、削除） <br/>リマインダー（発火時） | タスク（追加、完了 ※いずれもPJもしくはラベル指定可能） |

今回はタスクを完了したら草生やすだけなので、どちらを使っても変わらないです。
この記事では両方の方法をご紹介したいと思います。（ちなみにIFTTTを通さない分、少し反映が早い(?)ので私はTodoistAPIを使っています）

## 方法1：IFTTTを使う

※IFTTTのアカウントを持っている前提で話を進めます。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fifttt.com%2Fcreate" title="Get Started - IFTTT" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [ifttt.com](https://ifttt.com/create)

こちらから新しいアプリを作成していきます。

流れとしては

1. If ThisにTodoistを設定する
2. Then ThatにWebhookを設定する

以上です！

### 1. If ThisにTodoistを設定する

※初めての場合、IFTTTとTodoistの連携が必要です。今回は省略いたします。

 ![f:id:ikmbear:20210108114030p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108114030.png)

1.If Thisからスタートします。

 ![f:id:ikmbear:20210108114113p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108114113.png)

2.連携するサービスにTodoistを設定します。

 ![f:id:ikmbear:20210108114528p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108114528.png)

3.トリガーを設定します。
各トリガーの説明は図の通りです。今回はタスク完了時を想定しているので、「New Completed Task」を設定します

 ![f:id:ikmbear:20210108114701p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108114701.png)

4.Todoistのどのプロジェクトを監視対象にするか設定します。今回は全部のタスクを監視対象としたいので「Any Project」のままにしておきます。

5.`Create trigger`を押して設定を完了します。

### 2. Then ThatにWebhookを設定する

 ![f:id:ikmbear:20210108115007p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108115007.png)

1.Then Thatからスタートします。

 ![f:id:ikmbear:20210108115047p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108115047.png)

2.連携するサービスにWebhooksを設定します。

 ![f:id:ikmbear:20210108115137p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108115137.png)

3.道なりに進みます。

 ![f:id:ikmbear:20210108115452p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108115452.png)

4.リク$1トを設定します。

URLには以下の値を設定します。なお`{webhookHashの値}`は、Pixelaの設定「3. Webhookの登録」で取得したwebhookHashの値に読み替えてください。

```
https://pixe.la/v1/users/{ユーザID}/webhooks/{webhookHashの値}
```

Pixelaはリク$1トボディを必要としない（セットしても無視される）ので、画像の通り、`Body`は空欄にしておきましょう。
[POST - /v1/users//webhooks/ - Pixela API Document](https://docs.pixe.la/entry/invoke-webhook)

ここまできたら、`Create action` \> `continue` \> `finish`と道なりに進んで設定完了です！
試しにtodoistでタスクを完了してみると、草が生えますwwww

## 方法2：TodoistAPIを使う（※Todoistプレミアムユーザ向け）

次にTodoistAPIを利用した設定方法を説明します。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fdeveloper.todoist.com%2Fappconsole.html" title="App Management Console | Todoist Developer" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [developer.todoist.com](https://developer.todoist.com/appconsole.html)

1.Todoist App Management Consoleにアクセス

 ![f:id:ikmbear:20210108120453p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108120453.png)

2.`Create a new app`を選択

 ![f:id:ikmbear:20210108120733p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108120733.png)

3.Pixelaをアプリとして登録する。
`App display name`はなんでもいいです。わかりやすいように今回はPixelaとし、`Create App`を選択します。

 ![f:id:ikmbear:20210108120957p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108120957.png)

4.Webhookの設定をする下にスクロールすると「Webhooks」の設定欄があるので、以下のように設定し`Activate webhooks`を選択します。
なお`{webhookHashの値}`は、Pixelaの設定「3. Webhookの登録」で取得したwebhookHashの値に読み替えてください。

| 項目                  | 値                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------- |
| Webhooks callback URL | [https://pixe.la/v1/users/](https://pixe.la/v1/users/)`{ユーザID}/webhooks/{webhookHashの値}` |
| Webhooks version      | 8（デフォルト）                                                                             |
| Watched Events        | item:completed                                                                              |

 ![f:id:ikmbear:20210108121829p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210108/20210108121829.png) 5.開発用のアクセス$1ンを発行する
「Webhooks」の少し上に`create test token`ボタンがあるので、押してください。

ここまでできたら設定完了です！
試しにtodoistでタスクを完了してみると、草が生えますwwww

# 草はいいよね

草を生やすと、「は！今日も草生やさなきゃ！」とモチベーション維持に繋がって良いですね〜。

次は「Notionを更新したら草を生やす」に挑戦したいのですが、

- Notionからの更新通知受け取り先はSlackしか対応していない
- Slackに投稿されたことをトリガーにしようと思っても、Pixelaへのリク$1ト時に`challenge`に失敗してしまう

という状況なので、ちょっと難しいかもですね。うまくできたらまたブログにまとめたいと思います！
