---
title: "IkumaScriptと37進数"
description: "過去ブログからの移行記事"
publishDate: 2022-05-30

tags: []
draft: false
---


## ikuma, akuma, xkuma, ukuma...

JSやTSのサンプルコードで、よく自分の名前`ikuma`を一文字変えて使っているのだけれど、毎回入力するのも面倒なので、スニペット化しました。`ikuma`を複製するので、ECMAScriptを文字ってIkumaScriptです。

```javascript
[...Array(26)].map((_, index) => `${(index + 10).toString(36)}kuma`)

// [ 'akuma', 'bkuma', 'ckuma', 'dkuma', 'ekuma', 'fkuma', 'gkuma', 'hkuma', 'ikuma', 'jkuma', 'kkuma', 'lkuma', 'mkuma', 'nkuma', 'okuma', 'pkuma', 'qkuma', 'rkuma', 'skuma', 'tkuma', 'ukuma', 'vkuma', 'wkuma', 'xkuma', 'ykuma', 'zkuma' ]
```

親の顔よりよくみた連番作成処理を行います。

```javascript
[...Array(26)].map((_, index) => index)
// [ 0,  1,  2,  3,  4,  5,  6,  7, 8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ]
```

実際には`+ 10`しているので`10 ~ 35`までの値を含む配列が取得できます。

ここからN進数を利用してアルファベットに変換を行っていきます。文字としての数字は0から9までの10種類しかないので、36進数に変換すると、10 ~ 35がそれぞれa ~ zに相当することになります（36 - 10 = 26個のアルファベットが必要になる）

## 37進数にはどの記号が採用されるのか

ここでふと疑問に思うのが、37進数以降の場合、アルファベットで賄えない部分はどうなるのかということです。実際にやってみました。

```javascript
 (36).toString(37)
// Uncaught RangeError: toString() radix argument must be between 2 and 36
    at Number.toString (<anonymous>)
```

[Number\.prototype\.toString\(\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toString#%E4%BE%8B%E5%A4%96)にも記載がありましたが、37以上はエラーになるようですね。

Rubyでも試してみます。

```ruby
36.to_s(37)
# => (irb):3:in `to_s': invalid radix 37 (ArgumentError)
```

[Integer\#inspect \(Ruby 3\.1 リファレンスマニュアル\)](https://docs.ruby-lang.org/ja/latest/method/Integer/i/inspect.html)

こちらもリファレンスに記載がありましたが、37以上を指定するとエラーになるようです。

## おわりに

ikumaという名前が名付けられた経緯には色々な意味があるのですが、時代背景的に[悪魔ちゃん命名騒動 \- Wikipedia](https://ja.wikipedia.org/wiki/%E6%82%AA%E9%AD%94%E3%81%A1%E3%82%83%E3%82%93%E5%91%BD%E5%90%8D%E9%A8%92%E5%8B%95)があったこともあり、あえて一文字ずらして「ikuma」になったみたいな理由もあると以前母から聞きました。

1文字どころかたくさんずらして遊んでます。 -- 息子より
