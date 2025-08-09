---
title: WEBRickのqueryをパターンマッチで取り出す
draft: false
publishDate: 2023-10-14
category: tech
tags:
  - Ruby
  - WEBrick
  - パターンマッチ
---

WEBRickではリクエストのクエリを`req.query`で取得できます。

[WEBrick::HTTPRequest#query (Ruby 3.2 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/WEBrick=3a=3aHTTPRequest/i/query.html)

この戻り値はHashなので、例えば`hoge`を取得するのであれば`req.query['hoge']`のようにすれば値を取得できます。できますが、せっかくなのでパターンマッチで取得します。

1. `req.query.transform_keys(&:to_sym)`: req.queryのHashのキーはStringなので、パターンマッチで取得するためにSymbolに変換します。
2. `req.query.transform_keys(&:to_sym) in :hoge`: パターンマッチでhogeを取り出します。ローカル変数`hoge`にreq.query["hoge"]の値が格納されます。

気がついたらパターンマッチのカッコは省略可能[^1]になっていたので、変数1,2個取り出すくらいならガンガンに省略していきたいですね。

[^1]: Ruby3.1からだったみたい。知らなかった。
