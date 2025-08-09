---
title: "type-challenge 10日目: 3060-Unshift"
publishDate: 2022-06-06
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 解答

`Array.prototype.unshift`を型で実装する。

あれ、これ昨日とほぼ同じでは？

```typescript
type Unshift<T extends any[], U> = [U, ...T]
```

Variadic Tuple Typeで解くことができました。

## 感想

Unshiftを先にやってからPushをやった方がよかったかもしれないです（Variadic Tuple Type)の位置が最後でなくても使えるというはっけんがあるから）
