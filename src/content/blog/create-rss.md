---
title: このブログのRSSフィードを配信できるようにした
draft: false
publishDate: 2023-03-15
category: tech
tags:
  - RSS
  - Remix
---

## はじめに

RSSフィードを配信できるようにしました。

[https://ikuma-t.com/feed.xml](https://ikuma-t.com/feed.xml) からご購読いただけます。

## RemixでのRSSフィードの作り方

PRはこちらです。

[https://github.com/IkumaTadokoro/site/pull/25/files](https://github.com/IkumaTadokoro/site/pull/25/files)

もうPR以上に説明することもないのですが、やっていることとしては以下の2つになります。

1. `routes/feed[.]xml.tsx`を作成して、`/feed.xml`のコンテンツを作成する
2. RSSフィードを配信するloaderを実装する

## おわりに

解説することがなさすぎて、秒でおわりにまでたどり着いてしまいました。

最後にあらためましてチャンネル登録・高評価お願いいたします！

[https://ikuma-t.com/feed.xml](https://ikuma-t.com/feed.xml)