---
title: 'type^challenges 6日目: 189-Awaited'
date: '2022-06-02'
---

## 問題 & 解答

Promise風な型が持っている型を取得する方法を考える。

```typescript
type X = Promise<string>  // stringを取り出す。
type Y = Promise<{ field: number }> // { filed: number } を取り出す
type Z = Promise<Promise<string | number>> // string | numberを取り出す
```

最初はこういうことかなと思って、ConditionalTypesの中でinferを利用するような形で解いてみたのですが、`Promise<Promise<string | number>>`のようにPromiseがネストしている場合に引っ掛かりました。

```typescript
type MyAwaited<T extends Promise<any>> = T extends Promise<infer U> ? U : never
```

というわけで再帰的に中を掘っていくやつです。


```typescript
type MyAwaited<T extends Promise<any>> = T extends Promise<infer U> ? (U extends Promise<any> ? MyAwaited<U> : U) : never
```

## 感想

今回の問題は`infer`にちゃんとたどり着けるかどうかが肝だなと思いました。

ConditionalTypesでネストする場合って、どこで改行するのが正解なんだろうというのは少し疑問です。
