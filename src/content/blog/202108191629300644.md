---
author: ikuma-t
publishDate: 2021-08-19 00:30:44
modDatetime: 2021-08-19 00:30:44
title: "Node.jsでファイルが直接実行されたときだけ処理を呼び出す方法"
slug: "202108191629300644"
featured: false
draft: false
tags:
  - PROGRAMMING
description: "Node.jsでファイルが直接実行されたときだけ処理を呼び出す方法"
---

IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210819/20210819002958.png

 ![f:id:ikmbear:20210819002958p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210819/20210819002958.png) 

## 経緯

JavaScriptの練習として、JavaScriptを解いており、ついでにJestでテストも書いていました。

```
// 実行ファイル：fizzbuzz.js// fizzbuzz関数const fizzbuzz = (num) => {    ...}// 表示処理for (...) {    console.log(fizzbuzz(num))}module.exports = fizzbuzz
```

```
// テストファイル：fizzbuzz.spec.jsconst fizzbuzz = require('./fizzbuzz')describe('FizzBuzz:1~20', () => {  test('3の倍数の場合には「Fizz」を返す', () => {    // テスト処理  })  ...})
```

テスト自体はパスするようにできたのですが、テスト結果にも実行ファイルに書かれている`console.log`の結果が表示されてしまう始末。これをどうにか表示させないようにするため、色々と調べてみました。

```
# テスト実行% npm test> test> jestPASS ./fizzbuzz.spec.js  FizzBuzz:1~20    ✓ 3の倍数の場合には「Fizz」を返す (1 ms)    ✓ 5の倍数の場合には「Buzz」を返す    ✓ 3と5両方の倍数の場合には｢FizzBuzz｣を返す    ✓ そのほかの数の時はそのままの数を返す (1 ms)# ==========テストとは関係ないので表示したくない（ここから）==========  console.log    1      at Object.<anonymous> (fizzbuzz.js:18:11)  console.log    2      at Object.<anonymous> (fizzbuzz.js:18:11)# ==========テストとは関係ないので表示したくない（ここまで）==========Test Suites: 1 passed, 1 totalTests:       4 passed, 4 totalSnapshots:   0 totalTime:        0.488 s, estimated 1 sRan all test suites.
```

## TL:DR;

Node.jsでファイルが直接実行されているかどうかは、require.main === moduleで判断することができる。参考：[https://nodejs.org/api/modules.html#modules_accessing_the_main_module](https://nodejs.org/api/modules.html#modules_accessing_the_main_module)

```
if (require.main === module) {    // 直接呼び出された場合にだけ実行したい処理}
```

## Rubyの`__FILE__ = $PROGRAM_NAME`的なイディオムがないか探してみる

やりたいことは次の2つです。- 実行ファイル（`fizzbuzz.js`）を実行した際には、`console.log`の結果を表示したい- 別のファイルから呼ばれた際には、`console.log`を表示したくない

Rubyの場合、以下のように記述することで、そのファイルが直接実行されたときだけ、特定の処理を呼び出すことができます。

```
if __FILE__ = $PROGRAM_NAME    # 直接呼び出された場合だけ実行したい処理end
```

JavaScriptでも同じような処理ができないかと思い、「**FILE** JavaScript」で検索してみました。  
しかし、JavaScriptの`__FILE__`はファイルのJavaScriptを参照し、また`$PROGRAM_NAME`に相当するものも見つからなかったため、一度この方向性は断念しました。

## fjordbootcamp内で質問してみる

上記経緯からfjordboocamp内で質問してみたところ、「『Jest console.log』で$1と、`console.log`をMock化しろと出ているよ」との声をいただきました。

先ほどは実行ファイルの方で表示を制御する方法で検討していましたが、テストファイルで表示を制御する方法を提示いただいたわけです。

## Jestでconsole.logをMock化してみる

「Jest console.log」で検索した見つかった、下記記事を参考にMock化を図りました。

[Jestでconsole.logをモックする. 最近はテストを書くときはほとんどJestを使っています。今回は、v19から導入さ… | by 赤芽 | Medium](https://medium.com/@akameco/jest%E3%81%A7console-log%E3%82%92%E3%83%A2%E3%83%83%E3%82%AF%E3%81%99%E3%82%8B-fd6cd61bf926)

> console.logの結果が残っています。これは、mockObj.mockImplementation(() =\> customImplementation) かobject[methodName] = jest.fn(() =\> customImplementation) を使うことで上書きできます。

Jestのドキュメント（[jest.spyOn](https://jestjs.io/ja/docs/jest-object#jestspyonobject-methodname)）にも記載されているとおり、以下の記述で`console`オブジェクトの`log`メソッドを別の処理（`x => x`つまりなにもしない）に置き換えることができます。

```
// consoleオブジェクトのlogメソッドをMock化して、その処理を`x => x`に置き換えるjest.spyOn(global.console, 'log').mockImplementation(x => x);
```

しかしながら、テスト実行結果には変わらず`console.log`の結果が出力されています。  
Mock化とメソッドの上書きが正しく実行されているのか、それとも置き換え対象のメソッドがないのかの切り分けのため、以下のように`console.log`が呼ばれたかどうかをテストに追記します。

```
const fizzbuzz = require('./fizzbuzz')describe('FizzBuzz:1~20', () => {  test('3の倍数の場合には「Fizz」を返す', () => {    // テスト処理    // 追記箇所：console.logが呼ばれているか確認    expect(console.log).toBeCalled()  })  ...})
```

この結果はテスト失敗、つまり`console.log`は呼ばれていないこととなり、テストケースで呼ばれていない処理をMock化しても意味がないことがわかりました。

## console.logが何によって実行されているか確認してみる

テストケース内で呼ばれていないことがわかったため、消去法的に実行ファイル`fizzbuzz.js`を`require`した瞬間に`console.log`が実行されていると推測できます。

（ちょっとここらへんどう検索したか忘れましたが、）実際に`require`は実行された瞬間にそのファイルを読み込む仕様とSなっており、これを回避するための策として、以下の手順が書かれている記事をいくつか見つけました。

```
if (!module.parent)    // 直接呼び出された時だけ実行される処理end
```

`module.parent`はrequire元であり、自身がrequireされていれば、falsyになるという仕組みです。

## module.parentの代替案を探す

いずれの記事も更新日時が古かったため、Node.jsの公式ドキュメントを確認すると、`module.parent`は非推奨となっていました。

> Deprecated: Please use require.main and module.children instead.

[Modules: CommonJS modules | Node.js v16.7.0 Documentation](https://nodejs.org/api/modules.html#modules_module_parent)

代わりに`require.main`か`module.children`を利用するように記載があります。  
`require.main`を確認すると、参考リンクに探し求めていた解決方法がありました😄

> When a file is run directly from Node.js, require.main is set to its module.[Modules: CommonJS modules | Node.js v16.7.0 Documentation](https://nodejs.org/api/modules.html#modules_accessing_the_main_module)

「Node.jsから直接ファイルが実行されると、`require.main`には、自身の`module`が設定される。」つまり、次のように記述することで要件を満たすことができたのでした。

```
if (require.main === module) {    // 直接呼び出された時にだけ実行される処理}
```

## まとめ

Node.jsでファイルが直接実行されているかどうかは、require.main === moduleで判断することができる。 参考：[https://nodejs.org/api/modules.html#modules_accessing_the_main_module](https://nodejs.org/api/modules.html#modules_accessing_the_main_module)

今回全部調べ終わってから気がついたのですが、「JavaScirpt　直接実行された場合のみ」とか検索すると、日本語記事もいくつかヒットしましたね。しかしながら、非推奨の`module.parent`を記載しているものもあったので、自分で調べてみてよかったです。
