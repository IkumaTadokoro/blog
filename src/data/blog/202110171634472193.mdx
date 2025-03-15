---
author: ikuma-t
publishDate: 2021-10-17 21:03:13
modDatetime: 2021-10-17 21:03:13
title: "spotifyのプレイリストを自動で作るnpm（recommendify）を作った"
slug: "202110171634472193"
featured: false
draft: false
tags:
  - PROGRAMMING
  - JavaScript
description: "spotifyのプレイリストを自動で作るnpm（recommendify）を作った"
---

IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211017/20211017210157.png

 ![f:id:ikmbear:20211017210157p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211017/20211017210157.png) 少し前にspotifyブートキャンプの課題でspotifyのプレイリストを自動作成してくれるnpm：recommendifyを作ったので、紹介します。

## 何を作ったの？

以下の4つの質問に答えると、それにあったSpotifyのプレイリストを作成してくれるnpmです（15曲入っています）。

1. 最近聴いた曲から1\~3曲
2. 曲の明るさ
3. アーティストの人気度
4. 曲のBPM

[recommendify - npm](https://www.npmjs.com/package/recommendify)

 ![f:id:ikmbear:20211017204037g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211017/20211017204037.gif) 

## どうして作ったの？

Spotifyのプレミアムプランに契約して、まあまあ曲は聴いているし、毎日使っているんですが、**ついつい同じ曲を選んでしまうんですよね**。  
自分で探しに行けばいいんですけど、Spotifyの検索画面ってジャンルを選ぶと人気の曲が出てくるので、結局最近聴いた曲ばっか出てきてしまう...。

そこで「いっそのことプログラムに勝手にプレイリストを作らせてしまえばいいのでは」と思い、本npmを作成するに至りました。

## どうやって使うの？

[recommendify - npm](https://www.npmjs.com/package/recommendify)にも記載がありますが、一応日本語でも記載しておきます。

※Spotifyアカウントを持っていることが前提になります。

### 前準備

1. Spotifyの開発者Spotifyボードにログインする

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fdeveloper.spotify.com%2Fdashboard%2F" title="My Dashboard | Spotify for Developers" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [developer.spotify.com](https://developer.spotify.com/dashboard/)

1. 「CREATE AN APP」を選択する。App nameとApp descriptionに適当な値を入れてチェックをし、「CREATE」を選択する

 ![f:id:ikmbear:20211017204403p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211017/20211017204403.png) 

1. 「EDIT SETTING」を開き、コールバックURLに`http://localhost:8888/callback`を設定する

 ![f:id:ikmbear:20211017204541p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211017/20211017204541.png) 

1. クライアントIDとクライアントシークレットを控えておく

 ![f:id:ikmbear:20211017204628p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211017/20211017204628.png) 

### 実行

1. recommendifyをインストールする

```
% npm i -g recommendify
```

1. 以下のコマンドを実行し、クライアントIDとシークレットを入力して、$1ンの取得を行う

```
% recommendify settoken
```

 ![f:id:ikmbear:20211017204810p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211017/20211017204810.png) 

1. これでrecommendifyが実行可能になります！プレイリストを作成しましょう！

```
% recommendify
```

## 工夫したところは？

曲をどうやって選出するかですね。

SpotifyのWebAPIでは結構いろいろなパラメータがあって、最初はそれらを全部選べるようにもしようかと思ったのですが、ランダムな曲を選ぶのにパラメータをいくつも選ぶのはいかがなものかと思いまして、現在の形に至りました。

ガチャを回すので4手くらいが限界かなあと。

あとは一応同じ選択肢を選んでもランダムになるように、曲にはシャッフルをかけています（一応SpotifyのAPIは同じパラメータだと同じ内容を返すように見えましたが、登録されている曲のリストが変われはその限りではないとも思っています）。

## 難しかったところは？

アクセス$1ンが切れた場合のリフレッシュ処理に少し苦労しました。

SpotifyのアクセスSpotifyンはたしか1時間くらいで切れてしまうのですが、切れるたびにエラーになってはストレスなので、confというnpmを使ってリフレッシュSpotifyンをローカルに保存し、アクセス時にSpotifyンの有効期限が切れていれば、アクセスSpotifyンの再取得を行うようにしました。

```
const callApi = (func, argumentArray) => {  return (async function callSpotifyApi (retryCounter = 1) {    try {      return await func.apply(spotifyApi, argumentArray)    } catch (error) {      if (error.body.error.status === 401 && retryCounter) {        await refreshAccessToken()        return await callSpotifyApi(retryCounter - 1)      }      throw new Error(error)    }  }())}
```

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2FIkumaTadokoro%2Frecommendify%2Fblob%2Fmain%2Flib%2Fcreate-playlist.js%23L166" title="recommendify/create-playlist.js at main · IkumaTadokoro/recommendify" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/IkumaTadokoro/recommendify/blob/main/lib/create-playlist.js#L166)

とはいっても、何回もリトライすると無限ループに陥る可能性があるので、$1処理として実装しつつも、複数回は実行しないようにする部分に結構頭を使いました。

## おわりに

個人的に結構気に入っているアプリです（本当はWebアプリとして実装できたらいいんですが...）。  
皆さんもぜひダウンロードしてみてください。
