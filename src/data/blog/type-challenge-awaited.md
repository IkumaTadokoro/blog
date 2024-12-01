---
title: "type-challenges 6日目: 189-Awaited"
publishDate: 2022-06-02

tags: ["typescript", "type-challenges"]
description: "わたしま〜つ〜わ〜"
draft: false
---

## 問題 & 解答

Promise 風な型が持っている型を取得する方法を考える。

```typescript
type X = Promise<string>; // stringを取り出す。
type Y = Promise<{ field: number }>; // { filed: number } を取り出す
type Z = Promise<Promise<string | number>>; // string | numberを取り出す
```

最初はこういうことかなと思って、ConditionalTypes の中で infer を利用するような形で解いてみたのですが、`Promise<Promise<string | number>>`のように Promise がネストしている場合に引っ掛かりました。

```typescript
type MyAwaited<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
```

というわけで再帰的に中を掘っていくやつです。

```typescript
type MyAwaited<T extends Promise<any>> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? MyAwaited<U>
    : U
  : never;
```

## 感想

今回の問題は`infer`にちゃんとたどり着けるかどうかが肝だなと思いました。

ConditionalTypes でネストする場合って、どこで改行するのが正解なんだろうというのは少し疑問です。
