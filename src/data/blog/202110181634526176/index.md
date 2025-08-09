---
title: "文字列に数値が含まれているか判定する"
publishDate: 2021-10-18 12:02:56
category: tech
draft: false
description: "文字列に数値が含まれているか判定する"
tags:
  - PROGRAMMING
  - Ruby
author: ikuma-t
modDatetime: 2021-10-18 12:02:56
slug: "202110181634526176"
featured: false
---
Rubyである文字列wordに数値が含まれているかどうかをBoolean値で判定するには次のようにする

```
 def self.include_number?(word)    (word =~ /[0-9]/) != nil end
```

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fdocs.ruby-lang.org%2Fja%2Flatest%2Fmethod%2FString%2Fi%2F%3D3d%3D7e.html" title="String#=~ (Ruby 3.0.0 リファレンスマニュアル)" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [docs.ruby-lang.org](https://docs.ruby-lang.org/ja/latest/method/String/i/=3d=7e.html)

`String#=~`は、$1を引数にとり、マッチすればそのインデックスを、そうでなければ`nil`を返す。

このメソッドでは、`nil`と比較することで、

- 見つからない場合は`nil != nil` は`false`を返す
- 見つかった場合は`3 != nil`のようになり、`true`を返す

という仕組み。
