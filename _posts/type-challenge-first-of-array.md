---
title: 'type-challenges 4日目: 14-First of Array'
date: '2022-05-31'
---

## 問題 & 解答

[type\-challenges/README\.md at main · type\-challenges/type\-challenges](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md)[type\-challenges/README\.md at main · type\-challenges/type\-challenges](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md)

配列`T`を受け取って、その配列の最初の要素の型をとるようなジェネリクス`First<T>`を実装する。

```typescript
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

Conditional Typesを利用して、要素がある場合には1番目の要素の型を返すようにする

```typescript
type First<T extends any[]> = T extends [] ? never : T[0]
```

別解を見ていたら、inferを使っているケースもありました

```typescript
type First<T extends any[]> = T extends [infer first, ...infer _Rest] ? first : never
```

`infer`キーワードを使って`first`という名前で配列の1番目の要素の型を推論している。`...infer _Rest`の部分はrest parametersを使って、配列の残りの要素の方を`_Rest`に押し込んでいる。といっても今回は使用しない型なので`_`始まりにしているっぽいです。

## 調べたこと
### Conditional Types（条件型）

- 条件に応じて動的に型を定義する方法

```typescript
type IsString<T> = T extends string ? true : false
```

### inferキーワード

- 条件の一部としてジェネリック型を宣言できる機能。conditional typesのextendsの条件部分に限定して使用することができる
- `infer U`の形式で推論した型情報を`U`として扱うことができるようになる。

```typescript
type SecondArg<F> = F extends (a: number, b: infer B) => string ? B : never
```

- このサンプルでは、渡された関数`F`が、`number`型の第1引数と何かしらの第2引数を持ち、stringを返す関数である場合、第2引数の型をinferで推論して返すというもの。

### never型

- neverは決して戻ることのない関数の型。無限ループや単純に例外をthrowするような関数の戻り値
- 他の全ての型のサブタイプであるbottom型：値を持たない型
- どんな変数も入れることができない | どんな方にも入れることができる
- 無限ループや

### Index Accessed Types

- Lookup Typesと同じ。[type\-challenges 3日目: 11\-Tuple to Object \| ikuma\-t](https://ikuma-t.work/posts/type-challenge-tuple-to-object)に書いてある「配列の要素の型を取得する」と同じ
- 公式：[TypeScript: Documentation \- Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content)
- Lookup Typesと同じであることのソース：[TypeScript: Documentation \- Overview](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html#keyof-and-lookup-types)
  - > indexed access types, also called lookup types

## 感想

今日は条件分岐型を覚えました。1週間前くらいまではジェネリクス型見たら「うわっ」って感じだったんですけど、だいぶ慣れてきました。（感覚としてはギター始めたての頃のBm7-5に近い）

手元にオライリーのプログラミングTypeScriptをおいてリファレンス的に使っているんですが、第4版が2021年発行なので、ちょっと情報が古いかもと思い始めています。
もう一冊くらい手元においておいてもよいかなあ。
