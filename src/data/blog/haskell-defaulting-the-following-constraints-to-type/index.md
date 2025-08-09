---
publishDate: 2025-03-18
category: tech
title: HaskellのType defaulting
description: HaskellのType defaultingについて
draft: true
tags:
  - Haskell
---

## Type defaulting とは

## 警告の例

次のようなコードを実行すると、`Defaulting the following constraints to type 'XXX'` という警告が発生します。

```haskell
score :: Float -> Float -> Int
score x y = case sqrt (x ^ 2 + y ^ 2) of
  r
    | r <= 1 -> 10
    | r <= 5 -> 5
    | r <= 10 -> 1
    | otherwise -> 0
```

<br />

```
• Defaulting the following constraints to type ‘Integer’
    (Integral b0) arising from a use of ‘^’ at src/Darts.hs:5:26
    (Num b0) arising from the literal ‘2’ at src/Darts.hs:5:28
• In the first argument of ‘(+)’, namely ‘x ^ 2’
  In the first argument of ‘sqrt’, namely ‘(x ^ 2 + y ^ 2)’
  In the expression: sqrt (x ^ 2 + y ^ 2)
```

## 参考

- [Kwang's Haskell Blog - Type defaulting in Haskell](https://kseo.github.io/posts/2017-01-04-type-defaulting-in-haskell.html)
