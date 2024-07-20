---
author: ikuma-t
publishDate: 2020-12-28 21:04:12
modDatetime: 2020-12-28 21:04:12
title: "Rubocop実行時のparserに関する警告を解消する"
slug: "20201228210412"
featured: false
draft: false
tags:
  - PROGRAMMING
  - Ruby
description: "Rubocop実行時のparserに関する警告を解消する"
---

## 環境

- macOS:BigSur
- RubyMine:2020.3
- Ruby:2.7.1
- Rubocop:1.4.2
- parser:2.7.2.0

## Rubocopからの警告

Rubocop実行時にいつの間にか、以下の警告が出るようになっていました。

```
warning: parser/current is loading parser/ruby27, which recognizeswarning: 2.7.2-compliant syntax, but you are running 2.7.1.warning: please see https://github.com/whitequark/parser#compatibility-with-ruby-mri.
```

please seeのURLに飛んで、いろいろ調べてみたところ

- RubocopはRubyのRubyに[whitequark/parser: A Ruby parser.](https://github.com/whitequark/parser)を使用する
- RubyはパッチリリースごとにRubyへのバックポート[\*1](#f-51de6e0e)を盛り込むことがある。Rubyを担うparserはこれに対応する必要がある。
- 上記に対応するため、parserは1つのバージョンで複数のマイナーバージョンをサポートできないそう（parser2.7.2.0では、Ruby2.7.2のみをサポートしていて、2.7.1をサポートしていない）
- そのため、Rubyのバージョン（2.7.1）とparserの対応しているバージョン（2.7.2）が異なると警告が出る。

今回事象が発生している環境では特にRubocopのバージョンもしていなかったので、parserも最新版が入っているみたいでした。

```
# Gemfile.lockparser (2.7.2.0)
```

参考記事

- [whitequark/parser: A Ruby parser.](https://github.com/whitequark/parser#compatibility-with-ruby-mri)
- [Parser gem のバージョニングと RuboCop の TargetRubyVersion - koicの日記](https://koic.hatenablog.com/entry/parser-gem-and-target-ruby-version-of-rubocop)

## parserのバージョンを下げる

Rubyに合わせてparserを2.7.2.0未満に下げることでエラーを解消します。

1.Gemfileにparserのバージョンを追記する

```
# 2.7.2.0未満の最新版をインストールするgem 'parser', '< 2.7.2.0'
```

2.parserをupdateするGemfile.lockで既にparserの2.7.2.0が指定されているので、updateしていく。

```
% bundle update parser
```

3.Rubocopを実行する

```
% bundle exec rubocopInspecting 20 files....................20 files inspected, no offenses detected
```

見事エラー解消！

## 実は（今回は）無視してもいい警告

[\* Bump 2.7 branch to 2.7.2 by koic · Pull Request #748 · whitequark/parser](https://github.com/whitequark/parser/pull/748)

> Ruby 2.7.2 has been released.[https://www.ruby-lang.org/en/news/2020/10/02/ruby-2-7-2-released/](https://www.ruby-lang.org/en/news/2020/10/02/ruby-2-7-2-released/)  
> It seems like no changes have been made to ruby27.y where Parser gem should be changed (backported).ruby/ruby@v2_7_1...v2_7_2

特にRuby2.7.1と2.7.2の間に変化はないっぽいので、今回はこの警告を無視してもRubocopの実行結果は変わらなそうでした。

でも、ドキュメント読んだりエラー解消したり、いろいろと勉強になったのでよしとしましょう！

## 以下、調査過程のメモ

### 原文

[whitequark/parser: A Ruby parser.](https://github.com/whitequark/parser#compatibility-with-ruby-mri)

```
Unfortunately, Ruby MRI often changes syntax in patchlevel versions. This has happened, at least, for every release since 1.9; for example, commits c5013452 and 04bb9d6b were backported all the way from HEAD to 1.9. Moreover, there is no simple way to track these changes.This policy makes it all but impossible to make Parser precisely compatible with the Ruby MRI parser. Indeed, at September 2014, it would be necessary to maintain and update ten different parsers together with their lexer quirks in order to be able to emulate any given released Ruby MRI version.As a result, Parser chooses a different path: the parser/rubyXY parsers recognize the syntax of the latest minor version of Ruby MRI X.Y at the time of the gem release.
```

### 単語・語句・構文

- `Ruby MRI`：CRuby（Matz' Ruby Implementation）
- `backport`：あるバージョンのソフトウェアに追加した機能やセキュリティ対策などの改良を、それより以前のバージョンのソフトウェアにも取り込むこと。
- `c5013452`、`04bb9d6b`：いずれも`parse.y`におけるバックポートの例。
- `lexer quirks`：lexerが字句解析。字句解析の特徴といったところ？

### 内容に関する知識

- `parse.y`
  - [ruby/parse.y at master · ruby/ruby](https://github.com/ruby/ruby/blob/master/parse.y)
  - `parse.y`はRubyのRubyのルールを記述したもの（記述されたPGは、字句解析→Rubyの順に解析される）
  - yaccは、パーサを自動生成するツール。 `.y`という拡張子のファイルを入力とし、 Cのソースを出力する。
  - [Ruby開発者・まつもとゆきひろ氏の新言語「Streem」のソースコードを読んでみよう！ ～ 文法と構造を規定する「lex.l」と「parse.y」 (1/4)：CodeZine（コードジン）](https://codezine.jp/article/detail/8409)
  - [プログラミング言語を作る/yaccとlex](http://kmaebashi.com/programmer/devlang/yacclex.html)

### 疑問点と思考過程

- 中の人が言及している記事があった：[Parser gem のバージョニングと RuboCop の TargetRubyVersion - koicの日記](https://koic.hatenablog.com/entry/parser-gem-and-target-ruby-version-of-rubocop)
- RubyのバージョンアップごとにrubocopのRubyを担うparserもそれに追随するが、各バージョンのparserは複数のパッチバージョン (2.7 系, 2.6 系, 2.5 系, 2.4 系, 2.3 系...) のみ。
- `Gemfile.lock`を確認してみると`parser (2.7.2.0)`、つまりは2.7系では2.7.2のみに対応しているので、今回のような警告が発生している。
  - [\* Bump 2.7 branch to 2.7.2 by koic · Pull Request #748 · whitequark/parser](https://github.com/whitequark/parser/pull/748)で言及されているように、特に影響はなさそう。

### 訳文（deepLと少し自分）

```
残念なことに、Ruby MRI はパッチレベルのバージョンで構文を変更することがよくあります。例えば、コミット c5013452 や 04bb9d6b は HEAD から 1.9 までバックポートされています。さらに、これらの変更を追跡する簡単な方法はありません。このポリシーにより、ParserをRubyのMRIパーサーと正確に互換性を持たせることは不可能になっています。実際、2014年9月時点では、リリースされたRuby MRIバージョンをエミュレートするためには、10種類の異なるパーサを、それらのlexerの癖と一緒に維持し、更新する必要があります。その結果、Parserは別の道を選択します: parser/rubyXYパーサーはgemのリリース時に最新のマイナーバージョンのRuby MRI X.Yの構文を認識します。
```

[\*1](#fn-51de6e0e):あるバージョンのソフトウェアに追加した機能やセキュリティ対策などの改良を、それより以前のバージョンのソフトウェアにも取り込むこと。
