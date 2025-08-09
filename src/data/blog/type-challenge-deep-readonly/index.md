---
title: "type-challenges 14日目: Deep Readonly"
publishDate: 2022-06-10
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md

オブジェクトの各プロパティを再帰的に`readonly`にする`DeepReadonly<T>`を実装する。

前提：オブジェクトのみが渡される前提（クラスや配列、関数は考慮しなくてよい）

---

思考過程

単純にReadonlyにするのであれば、`Mapped Types`で定義すれば良い。

```typescript
type Readonly<T> = { readonly [P in keyof T]: T[P] }
```

再帰的にこの定義を実装していくので、`Recursive Conditional Types`も使う。

```typescript
type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends T[P]がオブジェクト ? DeepReadonly<T[P]>  : T[P]   } 
```

T[P]がオブジェクトであるかどうかってどうやって判断するんだっけ？
ここでいうオブジェクトには関数とか配列は含まなくて、単純な`{ key: value }`構造
インデックスシグネチャを利用する？ブル本には推奨されていなかったけど、一旦これでやってみる。

```typescript
type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends { [key: string]: unknown } ? DeepReadonly<T[P]>  : T[P] }
```

一応代入しようとすると、`readonly`になっているんだけど、型定義を確認すると

```typescript
type Expected = {
  readonly a: () => 22
  readonly b: string
　// DeepReadonlyは適用されているものの、展開されていない
  readonly c: <DeepReadonly {
    d: boolean
    // 略
```

となっていて、厳密な一致にはなっていない模様。

---


...というところでもうわからんとなったので、他の方の回答をみました。

```typescript
type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> }
```

https://github.com/type-challenges/type-challenges/issues/187

base caseを`keyof T extends never`で拾って、recursive caseで`DeepReadonly<T>`を呼び出しています。

## 感想

Objectの中でRecursive Conditional Typesを使うとなぜだめなのかがわかりませんでした。

ちゃんと代入しようとすると`readonly`になっているのに...。
