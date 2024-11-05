---
title: "Make Impossible State Impossibleを意識してPropsを設計する"
description: "UIを構成するReactコンポーネントのProps設計の際に使える指針に「Make Impossible State Impossible」という考え方があります。出典は諸説ありますが、「存在しえない状態が構成されないように、APIインターフェイスを定義する」という考えです。この考え方のもと、堅牢なReactコンポーネントを構築する方法を考察しました。"
publishDate: 2024-11-11
tags: ["React", "設計", "UI"]
draft: true
---

## Make Impossible State Impossible

### 複雑なStateが抱える課題

### インターフェイスレベルで「ありえない」状態を排除する

### どんなときに適用できる考え方か

## 実践

### かんたんな事例で適用する

### Propsを複雑にする前に、まずはCompositionによる責務の分離を

### オブジェクト内のプロパティを排他にする


## （Appendix）関連するライブラリ

この記事では型の定義やReactコンポーネントそのものの粒度から「Make Impossible State Impossible」について考えました。世の中にはそれ以外の方法でこの考えを表現しているTypeScriptライブラリがあるので、参考までに紹介します。

### X State

### Zag.js

### fp-ts
