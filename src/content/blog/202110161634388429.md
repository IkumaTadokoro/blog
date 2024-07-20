---
author: ikuma-t
publishDate: 2021-10-16 21:47:09
modDatetime: 2021-10-16 21:47:09
title: "雑なプログラミング問題（LEET変換プログラム）"
slug: "202110161634388429"
featured: false
draft: false
tags:
  - PROGRAMMING
  - Ruby
description: "雑なプログラミング問題（LEET変換プログラム）"
---

ネットで見かけたプログラミング問題をRubyで解いてみました。簡単なテストコードも作ったので、みなさんも是非解いてみてください。

## 問題

[Leet - Wikipedia](https://ja.wikipedia.org/wiki/Leet)とは、一部のアルファベットを一定のルールに基づき、数値や記号に変換して表す遊び、仕組みです。ここでは、以下の変換ルールが適用されています。

- a/A = 4
- b/B = 8
- e/E = 3
- l/L = 1
- o/O = 0
- s/S = 5
- t/T = 7
- z/Z = 2

例えば、文字列`I am a student`は`I 4m 4 57ud3n7`に置き換えられます。  
変換対象の文字列：`original_string`が与えられるので、それをleet文字列に変換した結果を返す関数leetifyを作成してください。

```
# 出力例leetify('I am a student') # I 4m 4 57ud3n7leetify('do re mi fa so ra si do') # d0 r3 mi f4 50 r4 5i d0leetify('Dairantou smash brothers') # D4ir4n70u 5m45h 8r07h3r5
```

テストコード

> [gist.github.com](https://gist.github.com/IkumaTadokoro/c1253bfc6ea4bb707bb72bd718ba6410)

## 回答

ハッシュテーブルを利用して変換します。

> [gist.github.com](https://gist.github.com/IkumaTadokoro/6359f38b93e64566390725cc2a5f20de#file-leetify-rb)

## 解説

すごい短いので解説することもないですが...

今回は文字列を`String#chars`を利用して一文字ずつ配列に分解し、ハッシュテーブルを利用することで変換しています。  
ハッシュテーブルに値がない場合は文字列そのままを返す必要があるのですが、これは短絡評価を利用することで短く表記しています。

3項$1を使って書いてみると以下のような感じです。

```
def leetify(original_string)  string.chars.map { |s| LEET_TABLE[s] ? LEET_TABLE[s] : s }end
```

ちなみに、すべてハッシュテーブルの中に値があることがわかっている場合は以下のように書けます。

```
def leetify(original_string)  string.chars.map(&LEET_TABLE)end
```

この記法は[Hash#to_proc (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/Hash/i/to_proc.html)を利用したものです。

---

おしまい
