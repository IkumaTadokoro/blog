---
title: "文字列に大文字と小文字が混在していることを判定する"
publishDate: 2021-10-18 11:55:49
category: tech
draft: false
description: "文字列に大文字と小文字が混在していることを判定する"
tags:
  - PROGRAMMING
  - Ruby
author: ikuma-t
slug: "202110181634525749"
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211018/20211018115513.png

 ![f:id:ikmbear:20211018115513p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211018/20211018115513.png) 小ネタ。Rubyで書いているけど他の言語でも同じ。

ある文字列wordに大文字と小文字の両方が含まれているかチェックするには

- wordをすべて大文字にした結果とwordが等しいか（例：IKUMAとikuMaが等しいか）
- wordをすべて小文字にした結果とwordが等しいか（例：ikumaとikuMaが等しいか）

の$1を返せば良い。

コードは次のようになる。

```
   def include_upper_and_lower_case?(word)     # 戻り値はBoolean     word.upcase != word && word.downcase != word   end
```
