---
title: "type-challenges 11日目: 2-Get Return Type"
description: "過去ブログからの移行記事"
publishDate: 2022-06-07

tags: []
draft: false
---


## 問題 & 解答

組み込みの`ReturnType<T>`を実装する。

`infer`で戻り値の型を取得して、あとはいつものU or neverです。

```typescript
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer U ? U : never
```

## 調べたこと
### `ReturnType`

https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype

関数`F`を渡すと、その戻り値の型を返す。

```typescript
type T0 = ReturnType<() => string>
// type T0 = string
```

## 感想

昨日の問題の変化系ですね。

https://ikuma-t.work/posts/type-challenge-parameters

任意の関数を示すのに、`(...args: any[]) => any`がさらっと出てくるようになったのは成長の証です。

ところでMediumの問題とEasyの境目はなんなのでしょうか...。
