---
draft: false
title: Advanced Functional Programming With Elixirを読んだ
description: Joseph Koski氏のAdvanced Functional Programming With Elixirを読みました
publishDate: 2025-12-30
category: idea
tags: [Elixir, 関数型プログラミング]
---

X のタイムラインに流れてきたのがきっかけで [Advanced Functional Programming with Elixir: Model Behavior, Manage Complexity, and Maximize Maintainability by Joseph Koski](https://pragprog.com/titles/jkelixir/advanced-functional-programming-with-elixir/) を読みました。

## 本書の概要

テーマパーク「FunPark」を題材として、各章ごとに FP のデザインを学んでいきます。

- Introduction
- Build FunPark: Model Real-World Data
- Implement Domain-Specific Equality with Protocols
- Create Flexible Ordering with Protocols
- Combine with Monoids
- Define Logic with Predicates
- Compose in Context with Monads
- Access Shared Environment with Reader
- Manage Absence with Maybe
- Model Outcomes with Either

各章ごとに出てくる FP のパターンは次の通りです

| 章   | 出現するパターン      |
| --- | ------------- |
| 1-3 | Eq, Ord       |
| 4   | Monoid        |
| 5   | Predicate     |
| 6-7 | Monad, Reader |
| 8   | Maybe         |
| 9   | Either        |
| 10  | Effect        |

### 対象読者

The Pragmatic Bookself では「Expert」とされていますが、これは「Elixir には習熟しているが、完全な FP には傾倒していない人」を想定してのものに感じました。関数型プログラミングの書籍としては、上述の出現するパターンの通り比較的基本的な部分も多いため、Beginner から Intermediate の中間くらいに相当するかと思います。

近いレベルの書籍としては以下の 2 冊でしょうか。

- [なっとく！関数型プログラミング（Michał Płachta 株式会社クイープ 株式会社クイープ）｜翔泳社の本](https://www.shoeisha.co.jp/book/detail/9784798179803)
- [関数型ドメインモデリング【委託】 - 達人出版会](https://tatsu-zine.com/books/domain-modeling-made-functional)

これら 2 冊よりも、より具体的に「Monad」「Applicative」といった関数型プログラミングのワードを取り扱っているのが本書です。関数型プログラミングの概念を理解したい、上記 2 冊を読んだがもう少しパターンを補完したい、という方に推奨できる一冊に思います。

## 学んだこと

### 律（Laws）

関数型プログラミングでは、抽象化には必ず「律」（laws）が伴います。律とは、その抽象化が満たすべき数学的な性質のことです。

**Monoid の律：**

- 単位元律：`combine(x, empty) = x`、`combine(empty, x) = x`
- 結合律：`combine(combine(a, b), c) = combine(a, combine(b, c))`

**Functor の律：**

- 恒等律：`map(id) = id`
- 合成律：`map(f . g) = map(f) . map(g)`

律があることで、コードの振る舞いが予測可能になります。律を満たさない実装は「壊れた抽象化」であり、合成したときに予期しない動作を引き起こします。

### Functor、Applicative、Monad の階層

この 3 つは階層構造を成しています：

```
Functor     ⊂ Applicative ⊂ Monad
(map)         (map + ap)     (map + ap + bind)
```

Functor は「箱の中身を変換する」能力を持ちます。`map` だけで十分な場合は Functor です。

Applicative は「独立した計算を組み合わせる」能力を追加します。`ap` を使って、複数の箱の中身に関数を適用できます。重要なのは、各計算が独立していること。バリデーションで全エラーを集めたい場合は Applicative を使います。

Monad は「前の計算結果に依存する計算を連鎖させる」能力を追加します。`bind`（`flatMap`）を使って、前の結果を見てから次の計算を決められます。ただし、依存関係があるため、最初のエラーで停止します。

本書で `traverse` と `traverse_a` の違いを学んだとき、この階層の意味が実感できました。`traverse` は Monad（依存、最初のエラーで停止）、`traverse_a` は Applicative（独立、全エラー収集）です。

### 共変と反変（Covariant / Contravariant）

TypeScript の型定義でも出てくる共変と反変。

共変（Covariant） は、`map` で出力を変換します：

```
map: (a -> b) -> F a -> F b
```

反変（Contravariant） は、`contramap` で入力を変換します：

```
contramap: (b -> a) -> F a -> F b
```

本書では、FastPass の時刻で等価性を判定したい場合に `contramap` を使いました：

```elixir
def eq_time do
  Eq.Utils.contramap(&get_time/1)
end
```

また、Patron をチケット階層で順序付けしたい場合にも `contramap` を使いました：

```elixir
def ord_by_ticket_tier do
  Ord.Utils.contramap(&get_ticket_tier_priority/1)
end
```

`contramap` は元のデータを変更するわけではなく、「比較のために一時的に射影する」だけです。既存の `Eq` や `Ord` から新しいものを宣言的に導出できる強力な道具です。著者も章末で「本当に `contramap` を理解しているか自問せよ」と強調していました。

### lift（持ち上げ）

`lift` は、ある文脈の外にある値や関数を、文脈の中に持ち込む操作です。本書では頻繁に登場しました：

- `lift_predicate`：述語を Maybe や Either に持ち上げる
- `lift_either`：Either を Effect に持ち上げる
- `lift_func`：通常の関数を Effect に持ち上げる

関数型プログラミングに精通している方のツイートなどをみていると「持ち上げる」という概念がよく出てくるので、アハ体験でした。

### Kleisli 関数

`a -> M b` という形の関数（値を受け取って Monad を返す関数）のことです。`bind` は Kleisli 関数を連鎖させる操作です。バリデーション関数（`Patron -> Either ValidationError Patron`）は Kleisli 関数の典型例でした。

## おわりに

10 章のメッセージが良いなと思ったので、日本語訳（訳：Claude）にて引用します。

> チェスと同じだ。もっとゲームをプレイしても上手くならない——構造とフィードバックが必要だ。マスターは「手」で考えない。「パターン」で考える。ボードをシステムとして見る：繰り返し可能、予測可能、合成可能。
>
> 関数型プログラミングも同じシフトを提供する。より小さく、より安定した単位でロジックを合成するツールを与えてくれる——コードの書き方だけでなく、考え方そのものを形作る。
>
> そのシフトには練習が必要だ。マスタリーは見ることや繰り返すことからは来ない——作ること、実験すること、振り返ることから来る。FunPark の例を実行するだけではダメだ。バリエーションを試せ。自分のを作れ。壊して直せ。理解はそうやって深まる——一度にではなく、一歩一歩。
>
> この本は君の代わりに仕事はできない。でも道を照らす手助けはできる——何を練習するか、どの順番で、なぜ重要かを示すことで。注意を向けるべき場所、よくある落とし穴の避け方、目的を持って前に進む方法を示すことで。

なっとく関数型プログラミング、関数型ドメインモデリング、本書と読んできて、だいぶ基本的な概念には馴染みが出てきました。一方で純粋関数型言語が主戦場ではないので、どうしても部分的に関数型っぽい感じで書くにとどまっており、関数型が身についているかというと微妙なところです。マスタリーを目指すために、Haskell を使ってパターン・メンタルモデルを染み込ませる活動をやっていこうと思います。

また昨年末くらいまでは「関数型プログラミング」のレイヤーもよくわかっていませんでしたが、基礎の部分はだいぶ見えてきました。結果として TypeScript のライブラリで出てくるような概念（例：Optics）はまだリーチできていないことがわかりました。次は Scala の赤い本が良さそうなので読んでみようと思います。
