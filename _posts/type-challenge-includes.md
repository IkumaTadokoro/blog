---
title: "type-challenge 8日目: 898-Includes"
date: "2022-06-04 09:09:18"
---

## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.md

JavaScriptの`Array.includes`を型で実装する。

はじめはこういう回答を考えました。

```typescript
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
```

が、全然ダメでした...。

```typescript
// 全部落ちているテストケースです
Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
Expect<Equal<Includes<[1], 1 | 2>, false>>,
Expect<Equal<Includes<[1 | 2], 1>, false>>,
```

全然わからなかったので、今回は答えを見ました。見つけた回答がこちら

```typescript
type Includes<T extends readonly unknown[], U> =
  T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true ? true : Includes<Rest, U>
    : false;
```

https://github.com/type-challenges/type-challenges/issues/1568

順番に読み下していきます。

```typescript
type Includes<T extends readonly unknown[], U>
```

型`Includes`は第1引数（配列）、第2引数を受けます。

```typescript
T extends [infer First, ...infer Rest]
```

inferキーワードとVariadic Tuple Typesを利用して、配列Tの最初の要素の型情報を`First`として、以降の要素がある場合にそれらの型情報を`Rest`として推論します。

以下はそれぞれinferとVariadic Tuple Typesが出た回です。

https://ikuma-t.work/posts/type-challenge-first-of-array

https://ikuma-t.work/posts/type-challenge-concat

```typescript
T extends [infer First, ...infer Rest] ? @ : false
```

Conditional Typesの一つ目の分岐で一旦脳をセーブします。ここの部分で、なんらかの配列であれば`true`、そうでなければ`false`を返す型になります。 ここから始まるRecursiveな型探索のbase caseです。

では次に進みます。

```typescript
Equal<First, U> extends true
```

Equal型はtype-challengeがutilityとして定義している独自の型で、次のように定義されています。

```typescript
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
```

ちょっとここを読むのは時間がかかりそうなので、一旦は「XとYの型が同じかどうかを判定する」と認識しておきます。

https://zenn.dev/razokulover/articles/890102685d5ea2

https://github.com/microsoft/TypeScript/issues/27024

https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript

話を戻します。

```typescript
Equal<First, U> extends true : Includes<Rest, U> 
```

先程`infer`で推論された`First`と、ジェネリクス`U`が等しいかをチェックし、同じであれば`true`、そうでなければ残りのパラメータを使用して同じ処理を実施します。

```typescript
type Includes<T extends readonly unknown[], U> =
  T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true ? true : Includes<Rest, U>
    : false;
```

一致する型が存在するまで要素を探索し、見つからなかった場合には`false`が返るという仕組みでした。

## 調べたこと

### `Array.prototype.includes`

特定の要素が配列に含まれているかどうかをbooleanで返すメソッド。
第2引数で検索を開始するインデックスを指定することができる（省略可能）。

```javascript
const fruits = ['apple', 'banana', 'orange']

// searchElementのみを指定する
fruits.includes('cherry')
// false
fruits.includes('apple')
// true

// fromIndexを指定する
fruits.includes('apple', 0)
// true
fruits.includes('apple', 1)
// false
```

## 感想

今日はめちゃくちゃ難しかったです...。type-challengeでユーティリティとして提供されている型`Equals`を使っていましたが、実質2個定義しないと解けなかった訳ですね。

`Equals`のところを、シンプルに`First extends U`とか`[First, U] extends [U, First]`とか試してみたんですが、`readonly`を抜けられなかったり、`boolean`に`false`が通ってしまったりと、意外と抜け漏れがあり、これはTypeScriptの内部的な比較を知らないと解けないなあと思いました。
TypeScriptなにもわからん...。

あと問題に載っているサンプルがなぜかジョジョだったのですが、作者の方は日本人の方でした。

```typescript
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```
