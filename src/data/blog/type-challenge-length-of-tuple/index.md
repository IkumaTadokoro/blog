---
title: "type-challenges 4日目（その2）: 18-Length of Tuple"
publishDate: 2022-05-31
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 解答

[type\-challenges/README\.md at main · type\-challenges/type\-challenges](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md)[type\-challenges/README\.md at main · type\-challenges/type\-challenges](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md)

タプルが与えられるので、その長さを型とする`Length`を実装する

```typescript
type tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

constアサーションが適用されているので、`readonly`な配列`T`を定義する。
`Array.prototype`のインスタンスプロパティ`length`を指定して、長さを取得する。


```typescript
type Length<T extends readonly any[]> = T['length']
```

## 調べたこと
### Array.prototype.length

[Array\.length \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

> length は Array 型のインスタンスであるオブジェクトのプロパティで、配列の要素の数を設定または取得します

## 感想

今回はIndex Accessed Typesとプロトタイプチェーンの復習でした。

最初にPickを解いた時は「これでeasyかよ！」と思ったりしていましたが、だんだん妥当に感じるようになってきました。
でもeasyで高度な型がでているってことは、mediumはえげつないのかな。
