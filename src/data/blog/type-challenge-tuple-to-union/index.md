---
title: "type-challenges 15日目: Tuple to Union"
publishDate: 2022-06-11
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 解答

タプル型を受け取って、その要素からなるユニオン型を返す`TupleToUnion<T>`を実装する。

```typescript
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

ルックアップ型を利用して、配列の要素の型を取得します。`number`で取得すると配列の要素すべての型がユニオン型で返ります。

```typescript
type TupleToUnion<T extends any[]> = T[number]
```

関連：

https://ikuma-t.work/posts/type-challenge-tuple-to-object


## 感想

TupleToObjectよりも簡単（Mapped Types使ってないし）と思ったんですけど、どうなんだろう。
