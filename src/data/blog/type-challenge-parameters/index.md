---
title: "type-challenge 10日目(その2): 3312-Parameters"
publishDate: 2022-06-06
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.md

組み込みの型Parametersを実装する

やりたいことは、関数`T`の引数の型を動的に取得することなので、`infer`を使用する。参照したらいつものパターン

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never
```

## 調べたこと

### Parameters型

https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype

`Parametes<T>`の形式で、関数`T`の引数の型のタプル型を生成する。
