---
title: "type-challenges 12日目: 3-Omit"
description: "過去ブログからの移行記事"
publishDate: 2022-06-08

tags: []
draft: false
---


## 問題 & 解答

組み込みの`Omit<T, K>`を実装する。`T`のプロパティから、`K`を除いた型を返す。

```typescript
type MyExclude<T, U> = T extends U ? never : T;

type MyOmit<T, K extends keyof T> = { [P in MyExclude<keyof T, K>]: T[P] }
```

別解（こっちの方がナウい）

```typescript
type MyOmit<T, K extends keyof T> = { [P in keyof T as Exclude<P, K>]: T[P]  }
```

## 調べたこと

### Key Remapping in Mapped Types

Mapped Typesで使えるプロパティ名（キー）の再定義方法。

一例としてすべてのプロパティを`readonly`にするような型を書いてみます。
（組み込み型として`Readonly`がありますが、理解のためにあえて再実装します）

```typescript
// Mapped Typesを使って、各プロパティをreadonlyにする
type MyReadonly<T> = { readonly [P in keyof T]: T[P] }


// 以下はサンプル
type Book = {
  name: string,
  author: string,
}

const book: Book = {
  name: "ABC殺人事件",
  author: "アガサ・クリスティ"
}

const readonlyBook: MyReadonly<Book> = {
  name: "銀河鉄道の夜",
  author: "宮沢賢治",
}

book.name = "オリエント急行の殺人"; // OK

// Mapped Typesによってreadonlyになっているので、変更が禁止されている。
readonlyBook.name = "注文の多い料理店"; // TS2540: Cannot assign to 'name' because it is a read-only property.
```

このMapped Typesの使用法では、プロパティの属性は変わっていますが（指定なし→`readonly`）、プロパティ名自体は変わっていません（`name`は`name`のまま、`author`は`author`のまま）。

TypeScript 4.1 以降で導入されたMapped Typesで使用できる`as`キーワードを使用すると、プロパティ名を変更することができるようになります。

```typescript
// as キーワードを利用して、`keyof T`で取得される「name」「author」をそれぞれ「specialName」「specialAuthor」に変換する
type MySpecial<T> = { [P in keyof T as `special${Capitalize<string & P>}`]: T[P] }

// プロパティ名が変換されている
const specialBook: MySpecial<Book> = {
  specialName: "SPY FAMILY",
  specialAuthor: "遠藤達哉"
}

console.log(specialBook.name); // TS2339: Property 'name' does not exist on type 'My Special".
```

`as`の後ろに変換後の名前を指定します。今回はTemplate Literal Typesを利用して、動的にプロパティを組み立てています。

```typescript
`special${Capitalize<string & P>}`  // "specialXxxxx..."に変換
```

:::message

`Capitalize`については、TypeScriptのコンパイラに組み込まれている型でその名の通り1文字目を大文字にして返します。
定義としては`Capitalize<string>`になりますが、`keyof`で取得しているのはオブジェクトのプロパティなので`string | symbol | number`の可能性があるため、参照したプロパティ名をそのまま使用してしまうとエラーになります。

```typescript
`special${Capitalize<P>}` //TS2344: Type 'P' does not satisfy the constraint 'string'. Type 'keyof T' is not assignable to type 'string'.Type 'string | number | symbol' is not assignable to type 'string'.Type 'number' is not assignable to type 'string'.
```

そのため、インターセクション型を利用して、`string`に絞り込んでいます。

:::

---

ここまでの例では単純にプロパティ名を変換しているだけでしたが、`as`は`never`を返した場合にそのプロパティを除外することもできます。これが今回の問題の別解です。

```typescript
// Conditional Typesでそのまま実装した形式
type MyOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] }

// 組み込みのExcludeを使用する
type MyOmit<T, K extends keyof T> = { [P in keyof T as Exclude<P, K>]: T[P] }
```

参考

https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as

https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html


## 感想

組み込みのExcludeを使っていいのかどうかわからなくて再実装しました。Excludeは過去回で登場しています。

https://ikuma-t.work/posts/type-challenge-exclude

解いた後にantfuさんの解答のスレッドをみて`as`が使えることを知って色々と調べました。ワカラナイコトマダマダタクサンネ・・・。
