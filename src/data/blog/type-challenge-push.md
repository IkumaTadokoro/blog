---
title: "type-challenge 9日目: 3057-Push"
description: "過去ブログからの移行記事"
publishDate: 2022-06-05

tags: []
draft: false
---


## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md

ジェネリクス版の`Array.prototype.push`を実装する。

これはえ〜と、Variadic Tuple Typesですね。Tの型を展開することができます。

```typescript
type Push<T extends any[], U> = [...T, U]
```

## 感想

ブルーベリー本を買ったので、Variadic Tuple Typesについてもみてみました。「6.7.3 可変長タプル型」に載っていました。

https://ikuma-t.work/posts/type-challenge-concat

この回でも書いたのですが「`...`で展開される型は`extends readonly any[]`ようです。

`any[]`はまあいいんですけど、ただの配列だったら`readonly`はいらないのかな〜。

