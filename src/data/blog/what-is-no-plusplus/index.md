---
title: "ESLintのno-plusplusはなぜ怒られるのか"
publishDate: 2022-06-25
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
どうもCopilot無料にならなかった私です。先日Copilot経由でforループを書いていたら`++`演算子が補完されたのですが、これがESLintルールで怒られました。どうも`no-plusplus`だと。

結局forEachに書き直して（最終的にはそれすらも消え）何事もなかったのですが（そのまま使うとしても`+= 1`にするだけ）、ESLintのルールはどういう意図でこれを設けているのかわからなかったので調べてみました。

## 結論

- インクリメント演算子は前にも後ろにも置ける。
- JavaScriptは内部的にセミコロンが無い文にセミコロンを挿入して文を解釈する。
- 結果として前置の`++`が、後置の`++`になる可能性があるので、それを禁止するルールが`no-plusplus`

## インクリメント演算子

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Increment

インクリメント演算子（`++`）は前置と後置の2種類があって、どちらもオペランドをインクリメントしますが戻り値が異なります。

- 前置：インクリメント前の値を返す
- 後置：インクリメント後の値を返す

今回のポイントは「前にも後ろにも置ける」ということです。


## ESLintのドキュメントをみてみる

https://eslint.org/docs/latest/rules/no-plusplus

> Because the unary ++ and -- operators are subject to automatic semicolon insertion, differences in whitespace can change semantics of source code.

単項演算子`++`と`--`は、セミコロンの自動挿入の対象になるので、ソースコードの意味が空白の違いで変わってしまうとあります。

## Automatic Semicolon Insertion

ここでいうセミコロンの自動挿入はASIと呼ばれるものです。

ASIは「Automatic Semicolon Insertion」の略称です。
JavaScriptはセミコロンを書いても書かなくてもOKな言語ですが、内部的にはセミコロンを自動で挿入して文を区切っています。

https://262.ecma-international.org/13.0/#sec-automatic-semicolon-insertion

> Most ECMAScript statements and declarations must be terminated with a semicolon. Such semicolons may always appear explicitly in the source text. For convenience, however, such semicolons may be omitted from the source text in certain situations. These situations are described by saying that semicolons are automatically inserted into the source code token stream in those situations.

色々とルールがあるようですが、今回のケースでは次のような解釈が発生するために問題となるようです。

```javascript
// i++として解釈される
i　++
j

// ++jとして解釈される
i
++
jj
```

1つ目はぱっと見でわかりますが、2つ目は挙動がわかりづらいですね（こんなコード書かないとは思いますが）

## no-plusplus

https://eslint.org/docs/latest/rules/no-plusplus

再びドキュメントに戻りまして、上記のような事態を抑制するのが`no-plusplus`ルールです。

```json
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'no-plusplus': ['error'],
  },
};
```

このルール下では`++`や`--`を使うと上記の理由で怒られます。代わりに`+=`や`-=`を使用します。

### allowForLoopAfterthoughtsオプション

```javascript
for ([initialization]; [condition]; [final-expression])
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for

forループの`final-expression`（ループのそれぞれの最後に評価される式）では`++`や`--`を許可するオプションです。

Afterthougtsが`final-expression`を指しているようです（公式なのはわかりませんが、「for loop afterthoughts」でググるとちょっとヒットした）。

## 感想

全然関係ないんですけど、ECMAScriptの仕様書のサイト結構重いですね...。
