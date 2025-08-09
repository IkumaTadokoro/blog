---
title: "type-challenges 20日目: 62-Type Lookup"
description: "過去ブログからの移行記事"
publishDate: 2022-06-26

tags: []
draft: false
---


## 問題 & 回答

代数的データ型（algebraicdatatypes;ADT）を表現するユニオン型から、その属性を取得するような`LookUp`型を定義する。

1つ目の型引数にUnion型をとり、2つ目の引数には、`type`というプロパティに期待する属性をstringで指定する。

```typescript
type LookUp<U, T extends string> = U extends { type: T } ? U : never 
```

Conditional Typesのいつもの（never返すやつ）を利用する。問題文の指定では、取得対象の型は`type: xxx`を必ず保持しているので、2つ目の引数`T`で指定された値を利用した`{ type: T }`の部分型であるinterfaceを返す。

分配法則が効くので、ユニオン型の中の合致しない型はneverによって無視される。

## 感想

Conditional Typesってほんまに高度な型なんかな〜と思うくらい毎日のように出てきますね〜。
