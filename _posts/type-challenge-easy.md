---
title: "type-challenges easyを解きおえた"
date: "2022-06-06 17:38:04"
---

https://github.com/type-challenges/type-challenges

type-challenges、easy問題の全13問を解き終えたので、一旦振り返りたいと思います。

## 各問題の振り返り

一言書こうと思ったのですが、終盤にいくにつれて特筆事項がなくなったので、ただの羅列です😅

:::details 各問題へのリンク

---

https://ikuma-t.work/posts/type-challenge-pick

```typescript
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
```

キーワード：`keyof`、`Indexed Access Type`、`Mapped Types`

初見で無事ギブアップした回。最初は全くもって意味不明な記号でしたが今は見慣れました。

---

https://ikuma-t.work/posts/type-challenge-readonly

```typescript
type MyReadonly<T> = { readonly [P in keyof T]: T[P] }
```

キーワード：`Mapped types`、`readonly`

当日も自力で解けたと言っています。今回も解けました。


---

https://ikuma-t.work/posts/type-challenge-tuple-to-object

```typescript
type TupleToObject<T extends readonly string[]> = { [P in T[number]]: P }
```

キーワード：`Tuple`、`Indexed Access Type`、`Mapped Types

ここらへんで`Mapped Types`に慣れてきました。

---

https://ikuma-t.work/posts/type-challenge-first-of-array

```typescript
type First<T extends any[]> = T extends [] ? never : T[0]
type First<T extends any[]> = T extends [infer U, ...infer Rest] ? U : never
```

キーワード：`infer`、`Conditional Types`, `Indexed Access Types`

`infer`キーワード初出。これも今はだいぶ見慣れてきました。

---

https://ikuma-t.work/posts/type-challenge-length-of-tuple

```typescript
type Length<T extends any[]> = T["length"]
```

キーワード：`Indexed Access Types`

---

https://ikuma-t.work/posts/type-challenge-exclude

```typescript
type Exclude<T, U> T extends U ? never : T
```

キーワード：`Conditional Types`、`Union Types`、`Distributive`

分配法則初登場回

---

https://ikuma-t.work/posts/type-challenge-awaited

```typescript
type MyAwaited< T extends Promise<any>> = T extend Promise<infer U> ? MyAwaited<U> : never
```

キーワード：`infer`

再起的な型推論

---

https://ikuma-t.work/posts/type-challenge-if

```typescript
type If<C extends boolean, T, F> = C extends true ? T : F
```

キーワード: `Conditional Types`

---

https://ikuma-t.work/posts/type-challenge-concat

```typescript
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

キーワード: `Variadic Tuple Types`

---

https://ikuma-t.work/posts/type-challenge-includes


```typescript
// この回はわからなかったのでコピペしました。
type Includes<T extends readonly unknown[], U> =
  T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true ? true : Includes<Rest, U>
    : false;
```

キーワード: `Conditional Types`、`infer`、 `Variadic Tuple Types`

めちゃくちゃ難しかった回です。厳密な等価評価の部分は今でもよくわかっていません。

---

https://ikuma-t.work/posts/type-challenge-push

```typescript
type Push<T extends any[], U> = [...T, U]
```

キーワード: `Variadic Tuple Types`

---

https://ikuma-t.work/posts/type-challenge-unshift

```typescript
type Unshift<T extends any[], U> = [U, ...T]
```

キーワード: `Variadic Tuple Types`

---

https://ikuma-t.work/posts/type-challenge-parameters

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never
```

キーワード： `infer`、`Conditional Types`

:::

## 感想

出てきたキーワードで重複しているものは`Conditional Types`、`infer`、`Variadic Tuple Types`、`Mapped Types`、`Indexed Access Types`、`keyof`って感じですかね。

自分はプリミティブ型とそこそこの用語だけオライリーの本で覚えて、あとはエイやでTypeScriptの世界にきてしまったので、いわゆる「高度な型」を実際に学ぶことができているのはとても良いなあと思います。

もともとTypeScriptを勉強しようとしたきっかけは、自作サービスを作っている時に、各ライブラリのドキュメントとかソースが軒並みTS化していて、「これTypeScriptがわからないと、単位時間あたりで取得できる情報量めちゃくちゃしょぼいんじゃね」と思ったのがきっかけでした。

自分で練習で書いているコードではeasyの問題に出てくるようなコードもまだそこまで書いていませんが、本来の目的であるライブラリのソースを理解するという点では非常に役に立っていると思います。

というわけで明日からはmedium編に突入です。これまでの延長で解けるのか、はたまた撃沈するかわかりませんが、毎日1問解いていきます！
