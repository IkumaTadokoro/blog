---
title: "「今日のesa」という自分用のChrome拡張を作ってみた"
publishDate: 2022-05-28
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
FJORD BOOT CAMPを卒業したことにより日報の提出先がなくなってしまったので、自分でesaに登録するようにしていたのですが、今日の分の日報を作るのが面倒 & 結構頻繁に別のページに飛んでしまって、今日の日報ページに戻るのが面倒だったので、とても雑にChrome拡張を作りました。


![今日のesaデモ](kyoNoEsaDemo)

[IkumaTadokoro/kyo\-no\-esa: \(Chrome Extension\) Add kyo\-no\-esa button in the sidebar of esa\.io that opens or create today's diary](https://github.com/IkumaTadokoro/kyo-no-esa)

GitHubはREADMEすら治してません...自分用なので。

## 使い方

1. 上記PJをcloneして、`npm run build`でdistフォルダに出力します。
2. Chrome側で「パッケージ化されていない拡張機能を読み込む」でdistフォルダを指定します。
3. 「拡張機能のオプション」からオプションページを開き、諸々設定します。
4. esaのページのサイドバーに「今日のesa」がでてくるのでクリックします。今日の日報があればそれを、なければ新規作成画面に移ります（テンプレートがある前提）


![オプションページ](optionsPage)

## 感想

「Chrome拡張作ってみたいな」と前々から思っていたので、Vite + TypeScript + Vueで作ってみました。

これくらいの規模の拡張機能なら割とあっさりできるんですが、結構ゴリ押しで進めてしまったので、次はもう少ししっかり設計を練ってから挑みたいです。
