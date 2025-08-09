---
title: "type-challenges 18日目：16-Pop"
publishDate: 2022-06-21
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 回答

https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md

配列`T`を受けとって、配列の最後の要素以外の型を返す`Pop<T>`を実装する。

```typescript
type Pop<T extends any[]> = T extends [...infer Rest, unknown] ? [...Rest] : never
```

Conditional Typesと`infer`キーワード、Variadic Tuple Typesを用いて実装しました。

## 感想

最初unknown部分をanyで書いていたのですが、回答を見ていたら、anyは怒られがちだし、どうせ使わないならunknownでよくない？みたいなコメントを見つけて、こっちに変更しました。

仕事を始めたので、数日空いてしまったのですが速攻で解けたので安心しました。

最近お仕事で初めてちゃんと動くTypeScriptのコードを書いたのですが（）、このtype-challengesをやったおかげで先輩の言っていることがチンプンカンプンということがないので、やっといてよかったな〜と思っています。

今後も優先度は少し低くなりますが、こつこつやっていきます。
