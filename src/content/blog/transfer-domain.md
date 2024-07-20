---
title: "ikuma-t.workからikuma-t.comへ移管"
description: "いま（いま）わ〜かれ〜のとき〜🎵"
publishDate: 2023-02-04

tags: [blog, domain]
draft: false
---

## はじめに

プログラミング勉強し始めて 1 ヶ月くらいの時に初めてお名前.com でドメインを取得し（ikuma-t.work）、それ以降めんどくさくてずっとお名前.com のまま使っていました。

![](/blog/transfer-domain/popup.png)

取得した当初も思っていましたが、やはり UX が個人的には辛過ぎる（何か操作しようとするたびに出てくる、やりたい操作から遠ざけようとするモーダルとか）ので、ドメインの更新期限催促が来たこのタイミングで Google Domains に移管することにしました。

## .work は Google Domains でサポート対象外

[お名前\.com から Google Domains にドメイン移管する](https://zenn.dev/yoo/articles/8e82b0893f7417263d1c)に則って進めていたのですが、「.work」がサポートされていない....

![](/blog/transfer-domain/non-support.png)

[料金とサポート対象のドメイン末尾 \- Google Domains ヘルプ](https://support.google.com/domains/answer/6010092?hl=ja#zippy=%2C%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E6%9C%AB%E5%B0%BE%E3%81%AE%E4%BE%A1%E6%A0%BC)

ikuma-t.works は取れるんですけど、年間 ¥3,500 するので却下です。

## ikuma-t.work→ikuma-t.com

というわけで安いドメインを探していたら、ふつうに ikuma-t.com が転がっていたので、これを購入しました。はじめてドメイン買った時、めっちゃ高くて ikuma-t.work にした気がするんですが、今見たらほぼ変わらなかった...。

### Vercel 側の設定

![](/blog/transfer-domain/vercel-setting.png)

設定 > domains > ikuma-t.com を新規追加

![](/blog/transfer-domain/google-domains-setting.png)

Google Domains 側にも設定

5 分くらいで反映完了です。ikuma-t.com でアクセスできるようになったら、Vercel 側の ikuma-t.work の設定は消しておきます。

### お名前.com の削除

更新期限が迫っていたのですが、登録していたクレジットカードの有効期限切れで情報が変わったため、自動更新ができていない状態でした（自動更新されていたら乗り換えようと思わなかったかもなのでナイス）。メールはめっちゃ来てるけど...。

![](/blog/transfer-domain/how-to-stop.png)

というわけで、自動更新さえ停止してしまえばお片付け終了です。

### サイトの更新

![](/blog/transfer-domain/site-before.png)

サイト内に「ikuma-t.work」と書いている箇所が結構あったので、これを置換します。

![](/blog/transfer-domain/site-after.png)

ページタイトル等も忘れずに変更しておきます。

---

以上で

## おわりに

2020 年から使っていた ikuma-t.work も連載終了です。これからは ikuma-t.com をよろしくお願いします！
