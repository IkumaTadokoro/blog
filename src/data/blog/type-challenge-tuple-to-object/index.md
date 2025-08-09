---
title: "type-challenges 3日目: 11-Tuple to Object"
publishDate: 2022-05-30
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 解答

[type\-challenges/README\.md at main · type\-challenges/type\-challenges](https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.md)

タプルを受け取り、その各値のkey/valueを持つオブジェクトの型に変換する型を実装する

```typescript
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

文字列型の配列を受け取り、各要素をキーと値に持つオブジェクトとしてマッピングする。

```typescript
type TupleToObject<T extends readonly string[]> = { [P in T[number]]: P }

// このテストケース特有なら以下の方がいいかもしれない
type TupleToObject<T extends readonly [string, string, string, string]> = { [P in T[number]]: P }
```

## 調べたこと

### Tuple型

- タプルは配列のサブタイプで、固定長の配列を片付けするための特別な方法
- 配列の各インデックスでの値は特定の既知の型を持つ
- タプルと配列の構文は同じであり、またTypeScriptは配列に対して型推論するためのルールを持っているため、タプルを宣言する際には明示的に型を宣言する必要がある。


```typescript
let a: [number] = [1]
let b: [string, string, number] = ['ikuma', 'takuma', 2]
```

参考：[O'Reilly Japan \- プログラミングTypeScript](https://www.oreilly.co.jp/books/9784873119045/)

### const assertion

- as const`を末尾に記述することで、再帰的に`readonly`にする仕組み


参考：[constアサーション「as const」 \(const assertion\) \| TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/const-assertion)


### インデックスシグネチャ

- `{ [key: T]: U }`：このオブジェクトの型Tのすべてのキーは型Uの値を持たなければならない
- オブジェクトのキーを抽象的に定義する方法。

### 配列の要素の型を取得する

- `number`型の添字を使うと配列から要素の型を取得することができる。
- タプルの場合は、0、1またはアクセスしたいインデックスを表す数値リテラル型を使う


### readonlyな配列

いくつかの定義方法がある

```typescript
// readonly T[]
const names: readonly string[] = ['akuma', 'bkuma', 'ckuma']

// ReadonlyT[]>
const names: Readonly<string[]> = ['akuma', 'bkuma', 'ckuma']


// ReadonlyArray<T>
const names: ReadonlyArray<string> = ['akuma', 'bkuma', 'ckuma']
```

タプルの場合は次のように定義する

```typescript
// readonly
const names: readonly [number, string] = ['akuma', 'bkuma', 'ckuma']

// Readonly
const names: Readonly<[number, string]> = ['akuma', 'bkuma', 'ckuma']
```

## 感想

解いた後に回答をみたら、`any[]`で受け取っている人もいたり、`string[]`で受け取っている人もいたり、何がいいんだろうと思いました。自分はもともと「タプルなんだから、`[string, string, string, string]`で受け取るだろう」と思ってやっていたのですが、そういう感じでもないんですかね。
