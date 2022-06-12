---
title: "type-challenges 16日目: 12-Chainable Options"
date: "2022-06-12 09:06:45"
---

## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md

`option(key, value)`を任意の数チェインして、最終的な結果を`get()`で呼び出すような2つの関数を提供する型を定義する。

```typescript
type Chainable<Options = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<Options & { [S in K]: V }>
  get(): Options;
}
```

---

全然わからなくて答えをみたので、解析していく。まず、単純に`option`メソッドを持つオブジェクトを考える。

このメソッドの要件は

1. 引数は`key`と`value`で、`key`に`string`、`value`に任意の型を受ける
2. 戻り値はここまで追加されたoption（オブジェクト）と、今回メソッドに渡されたkeyとvalueで生成されたoption（オブジェクト）が合わさったもの。

```typescript
// ここまでに定義されたOptionをチェーンする。何もOptionがなければ`{}`が初期値として設定される
type Chainable<Options = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<Options & { [S in K]: V }>
}

declare const base: Chainable // Chainable<{}>

// Optionsは初期値`{}`
// Chainable<{} & { "require": boolean }>
// Chainable<{ require: boolean }>
const requireOptionAdded = base.option("require", false)

// optionで返されているOptionsは`{ require: boolean }`
// Chainable<{ require: boolean } & { old: boolean }>
// Chainable<{ require: boolean,  old: boolean; }>
const oldOptionAdded = requireOptionAdded.option("old", true)
```

あとは現在保持しているOptionsを返すように`get`を実装する。

```diff typescript
type Chainable<Options = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<Options & { [S in K]: V }>
+  get(): Options;
}
```

## 調べたこと
### アンビエント宣言（`declare`）

JavaScriptコードを生成せずに、型推論のためだけの情報を渡すのに使用する。

```typescript
declare a: number;
```

## 感想

再帰とはまた違った形式だけれど、地味に汎用性の高い型定義だと思うので覚えておこう
