---
publishDate: 2025-03-01
category: tech
title: VSCodeでプロジェクトの設定と異なるSeverityでESLintエラーを報告する
draft: false
description: VSCodeのESlint拡張にある`eslint.rules.customizations`はプロジェクトのSeverityと異なる値でESLintのエラーを表示できるようにする設定です。これを使うことでLintルール自体は保持しつつ、開発時の体験を自分好みに変更することができます。
tags:
  - ESLint
  - VSCode
---




## 課題： ESLintルールはそのままに、自分のエディタ上の表示を変更したい

とあるTypeScriptプロジェクトにおいて、「あるESLintをチェックすることはOKだが、視認性の関係でエディタ上でのSeverityを変更したい」という要求がありました。

例えば`@typescript-eslint/no-unused-vars`を`error`に指定していると、使用していない変数がある場合にエディタ上で赤く波線が表示されます。

![未使用の変数hogeのVSCode上でホバーしている。Lintエラーであることを示す波線が変数名の下に出ており、エラーであるため赤い色で表示されている。](noUnusedVars)

使われていない変数があることをチェックするのはルールとして残しておきたいが、エディタ上ではエラーではなく警告を示す黄色の波線として表示したい、という要求です。
解決策の一つは愚直にルールのSeverityを変更することですが、これは他の開発者にも影響を与えてしまうという問題があります。

## VSCodeの`eslint.rules.customizations`を使ってSeverityを変更する

[VSCodeのESLint拡張](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)には、このような要求を満たすための設定があります。それが`eslint.rules.customizations`です。

> eslint.rules.customizations (@since 2.1.20) - force rules to report a different severity within VS Code compared to the project's true ESLint configuration. Contains these properties:

設定できるプロパティは次の3つです。

1. `rule`: 対象とするESLintのルール名。ワイルドカードとして`*`、否定として`!`が使えます。
2. `severity`: ルールのSeverity。`default`、`off`、`info`、`warn`、`error`、`downgrade`、`upgrade`のいずれかを指定します。 後2つはeslintの設定に対して緩めるか、厳しくするかの指定です。
3. `fixable`: autofixを有効にするかどうか。`true`か`false`を指定します（※autofixが可能なルールのみ）。

先にあげた例を実現するならば、次のように設定します。

```json
  "eslint.rules.customizations": [
    {
      "rule": "*no-unused-vars",
      "severity": "downgrade" // もしくはwarnでもよい
    }
  ]
```

![未使用の変数hogeのVSCode上でホバーしている。警告はエラーの時と同じだが、Lintエラーが出ていることを示す波線が警告の黄色になっている](changeToWarn)

もともとエラーの赤線だったものが、警告の黄色線に変わり、期待していた挙動を実現できました。

記載はユーザー固有のsettings.jsonでも適用されるため、もしプロジェクト全体に影響を与えたくない場合は個人の設定として適用することができます
（オーバーライドする設定なので、ワークスペース側の設定に書くことはないと思いますが）。

