---
title: 'type-challenges 5日目:43-Exclude '
date: '2022-06-01'
---

## 問題 & 解答

組み込みの`Exclude<T, U>`を自前で実装する

Conditional Typesの分配法則を用いて、次のように記述する。

```typescript
type MyExclude<T, U> = T extends U ? never : T
```

例えば

- `T`：`"a" | "b" | "c" | "d"`
- `U`：`"c" | "d" | "e" | "f"`

であるとき、まず`"a"`は`U`のサブセットではないので、`T`つまり`"a"`が返る。
一つ飛ばして`"c"`は`U`のサブセットなので、`never`が返る。

分配法則によりこれらの結果を結合したものが返るので`MyExclude<"a" | "b" | "c" | "d", "c" | "d" | "e" | "f">`は`"a" | "b"`をあらわす

## 調べたこと
### Exclude型

差集合を表す型

```typescript
// Exclude<UnionType, ExcludedMembers>

// (a, b, c)
type T0 = Exclude<"a" | "b" | "c", "a"> 
// type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c" | "d", "c" | "d" | "e" | "f">
// type T1 = "a" | "b"
```

[TypeScript: Documentation \- Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)

### Conditional TypesとDistributive（分配法則）

- Conditional types がGeneric型である時、Union型が渡された場合は、分配法則に従う。

```typescript
// 各Tがanyでを満たせば`T[]`を返す
type ToArray<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArray<string | number>;
```

`StrArrOrNumArr`では、`T`としてUnion型の`string | number`が与えられている。

```typescript
// StrArrOrNumArrの右辺は次のようになる(ちょっと表現としては変だけど）
(string | number) extends any ? T[] : never

// 分配法則により次のように読み下せる
(string extends any ? string[] : never) | (number extends any ? number[] : never)

// anyはすべてを満たすので`StrArrOrNumArr`はこうなる
string[] | number[]
```
