---
title: "Tailwind CSSのクラスをいい感じにマージするshadcn/uiの`cn`ユーティリティ"
publishDate: 2023-08-11
category: tech
description: "shadcn/uiをインストールすると、utilsとして`cn`関数がついてきます。これが自分でTailwind CSSを使ったコンポーネントを作る際にも便利なのですが、何をやってくれているのか理解していなかったので調べてみました。" 
tags: 
    - Tailwind CSS
    - shadcn/ui
draft: false
---


## はじめに

[shadcn/ui](https://ui.shadcn.com/)をインストールすると、utilsとして`cn`関数がついてきます。これが自分でTailwind CSSを使ったコンポーネントを作る際にも便利なのですが、何をやってくれているのか理解していなかったので調べてみました。

## 要約

`cn`は`twMerge`で`clsx`をラップした、「外部から指定されたTailwind CSSのクラス名をマージしつつ、オブジェクトの形式で条件付きのクラスを定義」をすることができるユーティリティ関数である。

## cnの中身

記事執筆（2023/08/11）時点での`cn`関数の実装は次のとおりです。

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

`twMerge`で`clsx`をラップしていることがわかります。他に実装はないので、これら2つの効能を見ていきます。

### twMergeの効能

[https://github.com/dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge)

`twMerge`はライブラリtailwind-mergeから提供される関数の1つです。

Tailwind CSSでは同じ効果をもたらす別のプロパティがclassに指定された場合、CSSのルールに則っていずれかのプロパティしか適用されません。例えば、`px-2 py-4`を持つコンポーネントに`p-5`を適用しても、`p-5`は適用されません。

そういうことを頻繁にやるべきかどうかの議論はさておき、これは既存のコンポーネントのスタイルを外側から上書きする際に不便な挙動です。

`twMerge`を使用することで、衝突するクラス名だけを外から渡したものに上書きすることができます。

```tsx
const MyButton = ({ classNames, ...props }) => {
  return (
    // hover:opacity-70はそのままに、Propsとして提供したclassNamesが適用されるようにclassNameがマージされる
    <button className={twMerge('px-2 py-4 hover:opacity-70', classNames)} />
  )
}
```

詳細なマージの挙動については[公式ドキュメント](https://github.com/dcastil/tailwind-merge/blob/v1.14.0/docs/features.md)を参照してください。

### clsxの効能

[https://github.com/lukeed/clsx](https://github.com/lukeed/clsx)

clsxは文字列や配列、オブジェクト含めてclassNameをいい感じに連結することのできるユーティリティライブラリです。

公式のUsageをそのまま貼り付けます。

```ts
import clsx from 'clsx';
// or
import { clsx } from 'clsx';

// Strings (variadic)
clsx('foo', true && 'bar', 'baz');
//=> 'foo bar baz'

// Objects
clsx({ foo:true, bar:false, baz:isTrue() });
//=> 'foo baz'

// Objects (variadic)
clsx({ foo:true }, { bar:false }, null, { '--foobar':'hello' });
//=> 'foo --foobar'

// Arrays
clsx(['foo', 0, false, 'bar']);
//=> 'foo bar'

// Arrays (variadic)
clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
//=> 'foo bar hello world cya'
```

さまざまなパターンでの連結と、Falsyな値をパージする機能があります。後者は特にオブジェクト記法でクラスと条件をマッピングしておくことで、条件付きスタイリングの際に重宝します。

### twMergeとclsxを組み合わせて使う理由

**「Tailwind CSSのクラス名のマージと、オブジェクトでのクラス名の指定を行いたいから」** です。

tailwind-mergeでもクラス名の文字列連結を行うための`twJoin`という関数が提供されていますが、こちらはオブジェクトでの記法がサポートされていません。

実装されていない理由は[こちらのDiscussion](https://github.com/dcastil/tailwind-merge/discussions/137)に記載があります。曰く、オブジェクトの記法はキーにクラス名が、バリューに条件がくることで、そのクラスがいつ適用されるかの認知負荷が高いと判断した、とのことです。リーダブルコードにもこんな感じの条件分岐の話がありましたね。

Discussionの続きになりますが、スタイルを変更するにはクラスをまずはみるのだからオブジェクトにも対応してほしいとの返信があり、議論の結果としてshadcn/uiでも使用されているcn関数のような記述が返されています。

```ts
import { twMerge as twMergeOriginal } from 'tailwind-merge'
import clsx from 'clsx'

export function twMerge(...args) {
    return twMergeOriginal(clsx(args))
}
```

これによりこの関数になんでもかんでもクラス名を指定すれば、自分が最後に指定した内容が意図通りにスタイリングとして反映される便利関数の完成です（雑）。

### 型定義

再掲になりますが、`cn`では次のようにして、`clsx`と同等の引数を受け取れるようにしています。

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## おわりに

今回はshadcn/uiで提供されているユーティリティ関数`cn`を見てみました。

`cn`という名前が**c**lass**N**ame由来なのか、shad**cn**由来なのか気になりますね...。

shadcn/uiにはもう1つ、ウィンドウ幅に応じてTailwind CSSにおけるブレイクポイントを画面上に表示してくれるDevtools的なものがあるので、また別の機会にそちらの実装をまとめてみようと思います。
