---
title: "Vue3のReactivity TransformをJestでもコンパイルできるようにする"
publishDate: 2022-03-15 19:53:53
category: tech
draft: false
description: "Vue3のReactivity TransformをJestでもコンパイルできるようにする"
tags:
  - PROGRAMMING
  - Vue
author: ikuma-t
slug: "202203151647341633"
---
## 要約

Reactivity Transformを使った$1をテストしていて、それが原因でJestが落ちるときは、`@vue/vue-jest@27.0.0-alpha.3`以上を導入しよう！

`yarn add -D @vue/vue3-jest@latest`

## 環境

※この記事は2022/03/15書いたものです。執筆時点ではReactivity Transform自体がExperimentalかつ、vue-jestのアルファ版でしか対応していないため下記のような対応が必要になりますが、しばらくすればここらへんは意識しなくても良くなるはずです。

- Vue：3.2.26
- Jest：27.5.1

## 前提：Reactivity Transformとは

Vue 3.2.25からExperimentalとして追加された$1ーマクロで、Vueが提供しているReactiveな値を`.value`を経由せずに取得することができるようになります。

```
// 通常のrefimport { ref } from 'vue'const counter = ref(0)console.log(counter.value) // 0// Reactivity Transformconst counter = $ref(0)console.log(counter) // 0
```

公式ドキュメントでは以下の章で紹介されていて、refだけでなく、computedも$computedとして使用することができます。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fvuejs.org%2Fguide%2Fextras%2Freactivity-transform.html%23refs-vs-reactive-variables" title="Reactivity Transform | Vue.js" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [vuejs.org](https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables)

## 問題：JestがReactivity Transformを解釈できない

今開発しているアプリはWebpackを利用しているので（正確にはWebpacker...殺せっ！）、ドキュメントの通り、明示的に設定に追記することでこの機能を有効化することができます。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fvuejs.org%2Fguide%2Fextras%2Freactivity-transform.html%23plain-webpack-vue-loader" title="Reactivity Transform | Vue.js" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [vuejs.org](https://vuejs.org/guide/extras/reactivity-transform.html#plain-webpack-vue-loader)

```
module.exports = {  test: /\.vue$/,  loader: 'vue-loader',  options: {    reactivityTransform: true  }}
```

これでアプリ実行時はうまくいくのですが、$1に使用しているJestではWebpackは関係ないため、この構文の解釈ができずにエラーになります。

```
node:internal/process/promises:265            triggerUncaughtException(err, true /* fromPromise */);            ^[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "ReferenceError: $computed is not defined".] {  code: 'ERR_UNHANDLED_REJECTION'}
```

今回はこれを解消します。

## 対処：@vue/vue3-jest@27.0.0-alpha.3以上を導入する

`yarn add -D @vue/vue3-jest@27.0.0-alpha.4`もしくは`@vue/vue3-jest@latest`を実行します。

2022/03/15時点ではalpha4が最新版なので、こう書いていますが27.0.0-alpha.3以上を導入すればOKです。

これによりテスト実行時のログに、webpackで実行したときと同じようにexperimentalに対するログが出るようになり、Reactivity Transformが正しく解釈されるようになります。

```
[@vue/ref-transform] Reactivity transform is an experimental feature.Experimental features may change behavior between patch versions.It is recommended to pin your vue dependencies to exact versions to avoid breakage.You can follow the proposal's status at https://github.com/vuejs/rfcs/discussions/369.
```

## 解説

Reactivity Transformのみならず、Vueの仕様についてはGitHub Discussionsにて議論されています。

この中でJestへの対応に関する質問がありました。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Frfcs%2Fdiscussions%2F369%23discussioncomment-1742554" title="Reactivity Transform · Discussion #369 · vuejs/rfcs" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-1742554)

VueとAngularのコントリビュータであるCédricさんが「vue3-jest」に新しいオプションを加えたよという話をしています。それがこのPRです。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-jest%2Fpull%2F412" title="feat: allow to pass compilerOptions via the Jest config for Vue 3 by cexbrayat · Pull Request #412 · vuejs/vue-jest" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/vuejs/vue-jest/pull/412)

READMEにも同様の内容が書いてあるのですが、27.0.0-alpha3以降は以下のオプションでReactivity Transformを解釈できるようになります。

```
globals: {  'vue-jest': {    compilerOptions: {      refTransform: false    }  }}
```

デフォルトではこれがtrueだそうで、先に述べた通りalpha3以上を導入すれば自動的にReactivity Transformが解釈できるようになるわけです。

## おわりに

これを解消したはいいんですけど、まだ私のJestはエラーを出力しています。やばいですねっ！
