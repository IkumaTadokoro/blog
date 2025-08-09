---
title: "type-challenges 2日目: 7-Readonly"
publishDate: 2022-05-29
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 回答

[type\-challenges/README\.md at main · type\-challenges/type\-challenges](https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md)

- 組み込みのユーティリティ型`Readonly`を使用しないで、`T`のすべてのプロパティを読み取り専用にする

```typescript
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

`mapped type`を利用して、`T`をすべて読み取り専用にします。

```typescript
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
```

## 調べたこと
### readonly修飾子

- オブジェクトのフィールドを読み取り専用に指定するための修飾子

### Readonly型

- `Readonly<T>`は、オブジェクト型Tのプロパティをすべて読み取り専用にするユーティリティ型。挙動は今回実装した`MyReadonly<T>`と同じ
- 参考：[TypeScript: Documentation \- Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)

## 感想

今日は昨日の発展系だったので、自力で解けました！
TypeScript初めて数日の身からすると、まずは型の見た目に拒絶反応を起こさないようにすることが大切なので、このtypechallengesはいいですね〜。明日も頑張ります。
