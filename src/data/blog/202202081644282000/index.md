---
title: "Conventional CommitでGemのCHANGELOGをコミットから自動作成する"
publishDate: 2022-02-08 10:00:00
category: tech
draft: false
description: "Conventional CommitでGemのCHANGELOGをコミットから自動作成する"
tags:
  - PROGRAMMING
  - Git
author: ikuma-t
modDatetime: 2022-02-08 10:00:00
slug: "202202081644282000"
---
## Conventional Commitとは

### 概要

> Gitのコミット粒度はまずConventional Commitsで種類が混ざりにくいようにしつつ、「小さいコミットを後からくっつけたり並べ替えたりする方が、大きいコミットを後から分割するよりもずっと簡単なので、迷ったら細かくコミットして後から見直せばいいよ」とよく言っています[https://t.co/ySrZSP2xQ7](https://t.co/ySrZSP2xQ7)
>
> — Takuto Wada (@t_wada) [2021年12月3日](https://twitter.com/t_wada/status/1466610043756101634?ref_src=twsrc%5Etfw)

t_wadaさんが以前Twitterで言及されているのを見かけて、Conventional Commitなるものがあることを知りました。

Conventional Commitとは、以下のようなコミットメッセージの規約を指します。

> Conventional Commits の仕様はコミットメッセージのための軽量の規約です。 明示的なコミット履歴を作成するための簡単なルールを提供します。この規則に従うことで自動化ツールの導入を簡単にします。 コミットメッセージで機能追加・修正・破壊的変更などを説明することで、この規約は **[SemVer](http://semver.org/)**と協調動作します。
>
> 引用元：[https://www.conventionalcommits.org/ja/v1.0.0/](https://www.conventionalcommits.org/ja/v1.0.0/)

### 形式

Conventional Commitは以下の形式を取ります。

```
<型>[任意 スコープ]: <タイトル>[任意 本文][任意 フッター]
```

型は`feat`や`fix`、`docs`など、変更を端的に表した単語です。具体的には次のようになります。

```
feat(subscribe): メール購読解約時のログインを不要にしたユーザーのストレス軽減のため（適当）Closes: #79
```

### RubyMineでのサポート

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.conventionalcommits.org%2Fen%2Fabout%2F%23tooling-for-conventional-commits" title="Conventional Commits" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [www.conventionalcommits.org](https://www.conventionalcommits.org/en/about/#tooling-for-conventional-commits)

にもある通り、Conventional Commitをサポートするためのツールはかなりたくさんあります。所詮はコミットメッセージなので、人力で入力してもConventional Commitにはできるのですが、型やフッターを選択肢から選べたり、枠が決まっているので形式を意識せずにメッセージを作れたりするので、あった方が何かと便利です。

このページにもInteliJ用のツールは掲載されているのですが、私は別途「Conventional Commit」というツールを使っています（RubyMineのPluginストアで評価が高いのを選んだだけ）。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F13389-conventional-commit" title="Conventional Commit - IntelliJ IDEs Plugin | Marketplace" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [plugins.jetbrains.com](https://plugins.jetbrains.com/plugin/13389-conventional-commit)

## Conventional CommitでCHANGELOGを作る

で、ここからが今回の本題で、Conventional CommitからCHANGELOGを作成します。

[何故-conventional-commits-を使うのか](https://www.conventionalcommits.org/ja/v1.0.0/#%E4%BD%95%E6%95%85-conventional-commits-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%AE%E3%81%8B) には、理由の1つに

> • 変更履歴 (CHANGELOG) を自動的に生成できます。

とあって、どうやって自動生成できるのかなと思ったんですが、コミットメッセージが規約に則っていることで、別途ツールを使用すればCHANGELOGにCHANGELOGが作成できるということのようです。

今回は以前リリースしたGemのCHANGELOGを作成してみることにしました。

### conventional-changelog

Conventional Commitから色々やるためのツールが、conventional-changelogとしてまとまっています。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fconventional-changelog" title="GitHub - conventional-changelog/conventional-changelog: Generate changelogs and release notes from a project's commit messages and metadata." class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/conventional-changelog/conventional-changelog)

この中のconventional-changelog-cliを使用してCHANGELOGを作成します。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fconventional-changelog%2Ftree%2Fmaster%2Fpackages%2Fconventional-changelog-cli" title="conventional-changelog/packages/conventional-changelog-cli at master · conventional-changelog/conventional-changelog" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

### インストール

conventional-changelog-cliはnpmなので、まずはインストールします。

リリースのためだけに$1を汚したくないので、グローバルインストールします（グローバルを汚すのはいいんかい）。

```
$ npm i -g conventional-changelog-cli
```

### コマンド

`conventional-changelog` コマンドで実行します。helpを見ると分かる通り、結構色々なオプションがあります。

```
$ conventional-changelog --help  Generate a changelog from git metadata  Usage    conventional-changelog  Example    conventional-changelog -i CHANGELOG.md --same-file  Options    -i, --infile              Read the CHANGELOG from this file    -o, --outfile             Write the CHANGELOG to this file                              If unspecified, it prints to stdout    -s, --same-file           Outputting to the infile so you don't need to specify the same file as outfile    -p, --preset              Name of the preset you want to use. Must be one of the following:                              angular, atom, codemirror, conventionalcommits, ember, eslint, express, jquery or jshint    -k, --pkg                 A filepath of where your package.json is located                              Default is the closest package.json from cwd    -a, --append              Should the newer release be appended to the older release                              Default: false    -r, --release-count       How many releases to be generated from the latest                              If 0, the whole changelog will be regenerated and the outfile will be overwritten                              Default: 1    --skip-unstable           If given, unstable tags will be skipped, e.g., x.x.x-alpha.1, x.x.x-rc.2    -u, --output-unreleased   Output unreleased changelog    -v, --verbose             Verbose output. Use this for debugging                              Default: false    -n, --config              A filepath of your config script                              Example of a config script: https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-cli/test/fixtures/config.js    -c, --context             A filepath of a json that is used to define template variables    -l, --lerna-package       Generate a changelog for a specific lerna package (:pkg-name@1.0.0)    -t, --tag-prefix          Tag prefix to consider when reading the tags    --commit-path             Generate a changelog scoped to a specific directory
```

### 実際に作ってみる

```
conventional-changelog -p eslint -i CHANGELOG.md -s
```

今回はESLint形式で、CHANGELOG.mdに対して追記をしていきます（なんでESLintにしたかというと、ESLintが一番よく知っているパッケージだからというだけです、すみません😅）。

このコマンドを実行してできたCHANGELOGがコチラになります。

```
# [](https://github.com/IkumaTadokoro/jp_local_gov/compare/v0.1.0...v0.) (2022-01-14)### chore* Add RSpec Runner for JetBrains IDE ([83d8c86](https://github.com/IkumaTadokoro/jp_local_gov/commit/83d8c8649f69506c9a08acf275960480316eb988))* Make JpLocalGov::Data::Importer#prefecture_capital? to return true/false ([82daafd](https://github.com/IkumaTadokoro/jp_local_gov/commit/82daafd19b47e52ff2c1c341a243aef7e5dffae4))### ci* Add spell checking GitHub Actions Workflow ([fc23bd1](https://github.com/IkumaTadokoro/jp_local_gov/commit/fc23bd1a3c10cc49f8aaf4e869c0062b50255f03))### docs* 💅 ([61c6d66](https://github.com/IkumaTadokoro/jp_local_gov/commit/61c6d66a43b75339036656a1b110dec97156177e))* Add how to use JpLocalGov.valid_code? ([2e14d71](https://github.com/IkumaTadokoro/jp_local_gov/commit/2e14d71c146d823e4bc3fa268da2e3a0c5f7ebe1))* Add issue template ([9f416a3](https://github.com/IkumaTadokoro/jp_local_gov/commit/9f416a335247c3be5c52e450b914bd73c380092d)), closes [#47](https://github.com/IkumaTadokoro/jp_local_gov/issues/47)
```

[Closing Keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) を使ってIssueをクローズしていると、参照先のIssueも表示されるみたいです。これは結構便利ですね。

### PRをもらった場合にどうするか？

そのOSSにコミットする人がみんなConventional Commitを使うかというとOSSの場合はそうもいかないと思います。

私も実際にそのケースに出くわしたのですが、「今回は特例で手動でCHANGELOGを追加するか」ということで、特に調べず終わってしまいました。

で、この記事を執筆する過程で調べてみたところ、以下の記述が見つかりました。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.conventionalcommits.org%2Fja%2Fv1.0.0%2F%23%25E8%25B2%25A2%25E7%258C%25AE%25E8%2580%2585%25E5%2585%25A8%25E5%2593%25A1%25E3%2581%258C-conventional-commits-%25E3%2581%25AE%25E4%25BB%2595%25E6%25A7%2598%25E3%2582%2592%25E4%25BD%25BF%25E7%2594%25A8%25E3%2581%2599%25E3%2582%258B%25E5%25BF%2585%25E8%25A6%2581%25E3%2581%258C%25E3%2581%2582%25E3%2582%258A%25E3%2581%25BE%25E3%2581%2599%25E3%2581%258B" title="Conventional Commits" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [www.conventionalcommits.org](https://www.conventionalcommits.org/ja/v1.0.0/#%E8%B2%A2%E7%8C%AE%E8%80%85%E5%85%A8%E5%93%A1%E3%81%8C-conventional-commits-%E3%81%AE%E4%BB%95%E6%A7%98%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8B)

> いいえ！ Git で squash ベースのワークフローを使用する場合は、主要メンテナがマージ時にコミットメッセージをクリーンアップすることができるため、臨時のコミッタには作業負荷がかかりません。 また、これをするための一般的な方法としては、プルリク$1トからのコミットを git システムが自動的に squash し、主要メンテナによるマージ時に適切な git コミットメッセージを入力するためのフォームを表示するというものです。

Conventional Commit側の主張は、「メンテナが都度直せばいいじゃん」とのことでした...。他のRailsとかどうしているんだろう？それこそRailsのような大きなRailsだとなかなか難しいと思うんですが。

## 感想

というわけでConventional Commitで自動的にCHANGELOGを作る方法でした。

個人的にはコマンド1つでCHANGELOGが完成するので、気楽にupdate作業をできていい感じです。

PRのマージコミットメッセージの件も含めて、他のOSSがどんな感じにCHANGELOGを書いているのかがすごい気になったのですが、残念ながら作成する過程は見えないので、地域rbとかで聞けたら聞いてみようと思います。

## 余談：もう少しコミットは細かく積もうかな

少しずれるのですが、最近ちょっと前に以下の動画を見た影響もあって、「できるだけコミットはsquashしておこう」と強く意識しすぎていました。

[![Embedded YouTube video](https://img.youtube.com/vi/VfnWlNbzbkA/0.jpg)](https://www.youtube.com/watch?v=VfnWlNbzbkA)

> [www.youtube.com](https://www.youtube.com/watch?v=VfnWlNbzbkA)

そうすると、なかなかコミットが打てなくて作業的には辛いので、

- 作業時はconventional commitでこまめにコミットを打つ
- Pushするときにsquashする

みたいなフローにしたほうがいいなと記事を書いていて思いました。
