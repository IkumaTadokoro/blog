---
title: "type-challenge 7日目: 268-If"
publishDate: 2022-06-03
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
## 問題 & 解答

https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md

条件`C`がtruthyであれば`T`を、falsyであれば`F`を返す`If`を実装する。

```typescript
type If<C extends boolean, T, F> = C extends true ? T : F
```

## 感想

さすがにConditional Typesは慣れてきました。
