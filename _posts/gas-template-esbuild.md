---
title: "esbuildのGASテンプレート"
date: "2022-07-31 17:07:22"
---

## GAS作成用のテンプレートを作成した

https://github.com/IkumaTadokoro/esbuild-gas-template

社内の業務改善とか自動化でたまにGASが出てくる場面があるそうなんですが（自分はまだ一度も書いていない）、GASのエディタで書くとnpmが使えなかったり、TypeScriptが使えなかったりします。

GASで業務効率化できるのは良いことなんですが

- 普段と異なる環境でコードを書くのはストレスが多い
- 生JavaScriptを書く機会は業務のコードではほぼないので、GASのためだけにJSを書くのはなんだかなあ

ということで、いつもと同じように書けるようなテンプレートを作ってみました。なぜかリポジトリのREADMEを英語で書いてしまって後々使い方を忘れそうなので、ぼちぼちこの記事に追記しておきます。

### よく使うやつをとりあえず入れる

![](/assets/esbuild-gas-template/esbuild-gas-template.png)

とりあえずいつも使っているESLint、Prettier、TypeScriptは全部突っ込みました。

### esbuild

コンパイルとトランスパイルにはesbuildを採用しました。採用理由は「esbuildは速い」と聞いていて前から興味があったからです。結果めちゃめちゃ速いし、ビルド用の設定が1スクリプトだけで済んでいるので、小規模なGASとの相性も良さそうです。

### monorepo

これをmonorepoと呼ぶのかはちょっとよくわかっていないんですが、要は複数のGASプロジェクトを1リポジトリに突っ込みます。

```
npm run gen -name=<プロジェクト名>
```

ってやると、`app`配下にテンプレートが作成されて、このプロジェクトが1つのGoogleAppsScriptに対応する形になります。

もともとは1リポジトリ1スクリプト構成だったんですが、

- 小規模なGASのためにいちいちリポジトリたてるのもな〜
- パッケージを使う場合に更新忘れそうだな〜
- 汎用的な処理は一箇所にだけ書いて他のスクリプトでも使いまわしたいな〜

ということで、さっき変えました。TurborepoとかNxとか流行っているやつもみてみたんですが、too muchな感じだったので、とりあえずnpm workspaceにしました。ちゃんと使えているかは正直微妙です。

## 今後

適当なGAS書いてみてとりあえず機能することはわかったのですが、いかんせん本運用にはまだ載せていないので、動かしながらちょいちょい修正していきたいと思います。
