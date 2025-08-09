---
title: "type-challenge 7日目（その2）: 533-Concat"
description: "過去ブログからの移行記事"
publishDate: 2022-06-03

tags: []
draft: false
---


## 問題 & 解答

JavaScriptの`Array.concat`を型システムで構成する。

Variadic Tuple Typesを使って次のように定義する

```typescript
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

## 調べたこと

### Variadic Tuple Types

- タプル型の中でに`...T`と書ける機能
- `...`で展開される方は`extends readonly any[]`を満たす必要がある。
- ちなみにVariadicは「可変長引数」

[TypeScript: Documentation \- TypeScript 4\.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html)

## 感想

Variadic Tuple Typesという名前がわからないまま、「こんな感じにできそうかな」と思ったら通ってしまいました。
TypeScript難しい...
