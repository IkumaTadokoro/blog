---
title: Gatsbyjsで作成したブログのTwitterCardを表示させる
draft: false
publishDate: 2021-08-06
category: tech
tags:
  - Gatsbyjs
  - TwitterCard
---

![](../../assets/images/gatsby-twitter-card/Gatsbyjs_TwitterCard.png)

## 問題:TwitterCardが表示されない

[Card Validator \| Twitter Developers](https://cards-dev.twitter.com/validator)

ブログを作ってみたはいいんですが、投稿があるたびにTwitterで共有しようにもTwitterCard（OGP画像）が表示されずに困っていました.

![twitter-card-error](//images.contentful.com/ojolxk47aqpx/2NDvXseGewUwdYem3AYzqO/56cf35b59e27f3e11752c17c605e10f0/twitter-card-error.png)

そこで今回はこのエラーの原因を突き止め、TwitterCardが表示されるようにしてみました。

## TL:DR;

- プラグイン`gatsby-react-helmet`が追加・設定されていなかったことが原因
- Developer　Toolで確認するとmetaタグがあるように見えても、実際にビルドされたHTMLを確認して、必要なmetaタグが追加されているか確認することが大事

## 調査

まずは次のような調査方針で進めてみました。

1. TwitterCardが表示される仕組みを調べる
2. 1と現状のサイトを比較し、足りていない要素を調べ、追加する
3. 2で表示されなければ、調査方針再検討

### TwitterCardが表示される仕組み

[カードの利用開始](https://developer.twitter.com/ja/docs/tweets/optimize-with-cards/guides/getting-started)

[【2020年版】Twitterカードとは？使い方と設定方法まとめ](https://saruwakakun.com/html-css/reference/twitter-card)

これらの記事を確認する限り、TwitterCardを表示するために必要なことは、以下のmetaデータを設定することのようです。

```html
<meta name="twitter:card" content="カード種類" /> <!--①-->
<meta name="twitter:site" content="@ユーザー名" /> <!--②-->
<meta property="og:url" content="記事のURL" /> <!--③-->
<meta property="og:title" content="記事のタイトル" /> <!--④-->
<meta property="og:description" content="記事の要約（ディスクリプション）" /> <!--⑤-->
<meta property="og:image" content="画像のURL" /> <!--⑥-->
```

### 現状のサイトと比較

![meta-when-error](//images.contentful.com/ojolxk47aqpx/28QeOUSzT5zp1t7HFw0yXP/e9fc452813ba58bdf4f34dbe5bf9ef0c/meta-when-error.png)

確認したところ、エラー発生時には、次の3つのmetaデータがありませんでした。

```html
<meta name="twitter:site" content="@ユーザー名" /> <!--②-->
<meta property="og:url" content="記事のURL" /> <!--③-->
<meta property="og:image" content="画像のURL" /> <!--⑥-->
```

Twitter特有のmetaとしては、`twitter:site`がもっとも怪しそうなので、まずはこちらを追加してみます。

```javascript:title=seo.js
{
    name: `twitter:card`,
    content: `summary_large_image`,
},
{
    name: `twitter:site`,
    content: `@ikumatdkr`,
},
```

![twitter-card-error](//images.ctfassets.net/ojolxk47aqpx/2NDvXseGewUwdYem3AYzqO/56cf35b59e27f3e11752c17c605e10f0/twitter-card-error.png)

なおも失敗してしまったので、`og:url`を追加してみます。

```javascript:title=seo.js
{
    property: `og:url`,
    content: `https://ikuma-t.work/`,
},
```

![twitter-card-error](//images.ctfassets.net/ojolxk47aqpx/2NDvXseGewUwdYem3AYzqO/56cf35b59e27f3e11752c17c605e10f0/twitter-card-error.png)

またもや失敗してしまいました。エラーメッセージが変わらないのが気になるところです🤔

最後に、まだ不足している`og:image`を追加します。

```javascript:title=seo.js
{
    property: `og:image`,
    content: `https://ikuma-t.work/static/logo.png`,
},
```

![twitter-card-error](//images.ctfassets.net/ojolxk47aqpx/2NDvXseGewUwdYem3AYzqO/56cf35b59e27f3e11752c17c605e10f0/twitter-card-error.png)

エラーメッセージ含めて、何も解消されません。

## 方針再設定

設定をしたにもかかわらず、Card Validatorが表示するメッセージが変わらないことを考慮すると、どうやら別のところに原因がありそうです。

しかも登録しているmetaタグはいくつもあるのに`4 metatags were found`としか表示されないことを考えると、次の2つの可能性が考えられます。

1. metaタグが実際には生成されていない
2. metaタグが生成されてはいるが、読み取られていない

まずは1つ目について確認してみることにしました。

### 生成されたmetaタグを確認する

ここまではChrome Developer Toolで確認してきましたが、実際に`gatsby build`によって生成されたhtmlがどうなっているかを確認してみます。

![build-meta-when-error](//images.contentful.com/ojolxk47aqpx/6PXrmTdY02V9kcfbRUiem0/ffec97f19de0fa484fa20e58d2dee2d0/build-meta-when-error.png)

すると、metaタグに相当するのは4件のみで、Twitter関連で設定した内容は全く反映されていません。

どうやらここが怪しそうです。

### gatsby-react-helmetが正しく機能しているかを確認

メタデータを追加するために、`react-helmet`を使用しているのですが、Gatsbyjsで使用するためには`gatsby-react-helmet`も必要です。

つまり、以下のような実際にmetaタグを定義するコンポーネントだけではNGで

```javascript:title=seo.js
import { Helmet } from "react-helmet"

const Seo = () => {
	return (
		<Helmet>
			/* meta情報を記述 */
		</Helmet>
	)
}
```

それを使用する前提として、プラグインを追加し、

```bash
$ yarn add gatsby-plugin-react-helmet react-helmet
```

それを`gatsby-config.js`で宣言しておく必要があるのです。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-react-helmet`]
```

[gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/)

...確認してみたところ、プラグインの追加と宣言が漏れていました。

そのため上記設定を施し、再度`gatsby build`を実行すると、ビルド結果のHTMLにmetaタグが追加されていました。

![meta-when-succeed](//images.contentful.com/ojolxk47aqpx/6NuFsKszegEdfef8kp05Vv/27ee436926409889c701b5332b40d0f5/meta-when-succeed.png)

Developer Toolでの確認結果も、metaタグが上位に表示されるようになり、

![card-succeed](//images.contentful.com/ojolxk47aqpx/2K7tzy9Bp13TKnFdPwsKj2/c1637ae3a112b128678c56bbcd60e5e3/card-succeed.png)

metaタグも読み取られ、Twitter Cardが表示されるようになりました。

ついでに各記事ページごとにヒーローイメージを取得するように設定して、本件は任務完了です🥷
![ogimage-by-page](//images.contentful.com/ojolxk47aqpx/25S7ZIGlJxv1Cr6tH2q8S6/940f89d1dd0207a4396d1f1ababd9f7f/ogimage-by-page.png)