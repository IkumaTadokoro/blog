---
title: "VSCode拡張、GistPadを試してみた"
description: "スニペット管理には便利そう"
publishDate: 2023-05-04

tags: [vscode]
draft: false
---

<twitter-post tweet-id="1653747179285262336"></twitter-post>

GistPad が便利という Tweet を見かけたので、自分も導入してみました。

## 概要

https://marketplace.visualstudio.com/items?itemName=vsls-contrib.gistfs

> GistPad は、お気に入りのエディタで快適に GitHub の Gist やリポジトリを編集できる Visual Studio Code の拡張機能です。Gist やリポジトリを開く、作成する、削除する、フォークする、スターを付けることができ、クローン、プッシュ、プルすることなく、まるでローカルにあるかのようにシームレスにファイルの編集を開始することができます。コードスニペット、よく使われる設定やスクリプト、プログラミング関連のメモ、ナレッジベース、インタラクティブなサンプルなどを構築し、参照するためのあなただけの開発者ライブラリのようなものです。 - マーケットプレイス紹介文を DeepL で翻訳

## 導入

1. VSCode に GistPad をインストール
2. アクティビティーバーの GistPad をクリック
3. GitHub にログイン

![](/blog/try-gist-pad/gistpad-preview.png)

これで自分が作成した Gist の一覧が見られるようになります（鍵付きのものは Secret Gist。鍵がついているけど別に見られて困るものではないのでそのままスクショ掲載しています）。

## 気になった機能：Scratch Notes

表題の決まった Gist とは別に、メモを取るための Gist を作成できる機能が備わっている。デフォルトでは Markdown が生成され、そこに自由にメモができる。

内部的には Secret Gist が生成されているだけですが、削除・生成を GistPad 側でやってくれるので、気軽にメモができるというメリットがあります。
開発時のちょっとしたメモを取りたいときに使えるかなあと思ったけど、Secret Gist はリンクがわかれば誰でも見れるので、業務用のメモには使えないですね〜。

---

上述のように業務の開発時の TODO メモ等には使いにくいですが、個人的な開発のメモや、コードスニペット管理には使えそうです。
