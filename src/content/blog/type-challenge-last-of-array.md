---
title: "type-challenges 17日目: 15-last-of-array"
description: "過去ブログからの移行記事"
publishDate: 2022-06-13

tags: []
draft: false
---


## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md

配列`T`をとって、最後の要素の型を返す`Last<T>`を実装する。

Variadic Tuple Typesが要素の最後でなくても使えるのがポイント。最後以外の要素を`_Rest`として受けて、最後の要素を`Last`で参照する。

```typescript
type Last<T extends any[]> = T extends [...infer _Rest, infer Last] ? Last: never
```

類似の問題はこれ。

https://ikuma-t.work/posts/type-challenge-first-of-array

別に参照する必要がないのであれば、`infer`にする必要もない

```typescript
type Last<T extends any[]> = T extends [...any, infer Last] ? Last: never
```

そのうち、`Last`を書くのも煩わしくなるくらいに慣れてきたら、これくらいが妥当なのかもしれない。

```typescript
type Last<T extends any[]> = T extends [...any, infer L] ? L: never
```

## 感想

類似の問題とはいえ、久しぶりに解く問題でもスラスラと解けるようになっているので、これをやっている意味はあると思われる。
