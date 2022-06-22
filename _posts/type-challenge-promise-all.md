---
title: "type-challenges 19日目:20-Promise.all"
date: "2022-06-22 22:06:26"
---

## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/README.md

`PromiseAll`に型をつける。

```typescript
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [P in keyof T]: T[P] extends Promise<infer R> ? R: T[P]
}>
```

問題文にもありますが、PromiseAllの戻り値の型は`Promise<T>`で、引数の型は配列です。`as const`が使用されているケースがあるので、ここまでで

```typescript
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<T>
```

こういう感じです。あとはどっかの回でやった再帰的なやつにやや近いですが、TがPromiseだった場合にはそれを解除してやる必要があるので、mappedTypesと`infer`キーワードを使って最終的にはこうなります。

```typescript
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [P in keyof T]: T[P] extends Promise<infer R> ? R: T[P]
}>
```

## 感想

眠いです笑
