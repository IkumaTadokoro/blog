---
title: "type-challenges 13日目: 8-Readonly 2"
date: "2022-06-09 07:06:35"
---

## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md

二つの引数`T`、`K`をとり、`K`が指定されていれば`T`のそのプロパティを、指定されていなければすべての`T`のプロパティを読み取り専用に変換する`MyReadonly<T, K>`を実装する。

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [P in K]: T[P] } & Omit<T, K>
```

---

「`readonly`な`K`で指定されているプロパティ & `T`に含まれる`K`以外のプロパティ」を目指して作っていきます。

### 1. `readonly`な`K`で指定されているプロパティを作る

これが通常のReadonlyの実装です。

```typescript
type MyReadonly2<T, K extends keyof T> = { readonly [P in T]: T[P] }
```

このままだと`K`の値が`readonly`にならないので、mapped typesでぐるぐるするところを変えます。

```diff typescript
type MyReadonly2<T, K extends keyof T> = { 
-  readonly [P in T]: T[P]
+  readonly [P in K]: T[P]
}
```

これにより`K`に渡されたプロパティは`readonly`になります。

### 2. `T`に含まれる`K`以外のプロパティ

これだけだと`K`に含まれるプロパティしか含まれていません。そのため、`K`に渡されなかったプロパティの型を取得する必要があります。これは`T`の中から`K`に該当するプロパティを除いたものです。

例えば以下のような`T`と`K`を渡すことを考えます。

```typescript
// こっちがT
type Music ={
  name: string,
  artist: string, 
  releaseYear: number
}

// こっちがK
type ReadonlyRequiredParams = "artist" | "releaseYear"
```

最終的に`MyReadonly2`に期待するのは次のような形式なので、`name: string`を取り出せれば良いはずです。

```typescript
type Expected = {
  name: string,  // TODO: これから取得したい
  readonly artist: string,  // { readonly [P in K]: T[P] } で表現される 
  readonly releaseYear: number  // { readonly [P in K]: T[P] } で表現される 
}
```

これは昨日出てきた`Omit`（組み込みの型の方です）を使用して、`Omit<T, K>`の形式で取り出すことができます。

```typescript
type Music2 = Omit<Music, ReadonlyRequiredParams>
// type Music2 = { name: string; }
```

### 3. 1と2を合体

これらをインターセクション型で繋ぎこむと、解答を得ることができます。

```typescript
type MyReadonly2<T, K extends keyof T> = { readonly [P in K]: T[P] } & Omit<T, K>
```

### 4. `K`のデフォルト値を設定する

...と思ったらまだエラーが出ています。この型は`K`を省略可能なのでそこでひっかります。`K`は参照されるので何かしらの値を入れておく必要があります。

TypeScriptは型引数にデフォルト値を取ることができます。

https://typescriptbook.jp/reference/generics/default-type-parameter

今回は「`K`を指定しなかった場合、すべてのプロパティが`readonly`になる」ので、`K`には「`T`のプロパティすべて」を設定します。

```diff typescript
  type MyReadonly2<T, 
-   K extends keyof T
+   K extends keyof T = keyof T
  >
```

---

他の人の解答を見ていたら、`Omit<T, K>`の部分を`& T`で繋ぎ込んでいる解答もあったのですが、これではだめでした。

```typescript
interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

type TodoX = Todo1 & Todo2

const todoX: TodoX = {
  title: "JavaScriptを勉強する",
  completed: true
}

todoX.title = "TypeScript"  // titleはreadonlyではない。
```

## 感想

う〜ん、最後のインターセクション型の挙動についてはドキュメントをざっと読んだのですが、期待する記述は見つけられませんでした。`readonly`だけならいいんですが、他にも自分が理解できていない部分があると怖いです。
