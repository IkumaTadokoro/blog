---
title: "type-challenges 21日目: Trim Left"
publishDate: 2022-09-12
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
久しぶりのチャレンジ

## 問題

https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md

文字列を受け取り、その文字列の左側の空白を削除した新しい文字列を返す`TrimLeft<T>`を実装する。

## 解答

### Template Literal Types

typescriptlang.org/docs/handbook/2/template-literal-types.html

Template Literal TypesはJSのテンプレートリテラルと同じ記法で特定の形式を満たす文字列リテラルを型として定義することができます。

### 解答

```typescript
type space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${space}${infer L}` ? TrimLeft<L> : S
```
