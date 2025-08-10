---
title: "Appraisalを使っている状態でもRubyMineのGUIでRSpecを実行する"
publishDate: 2022-02-09 10:00:00
category: tech
draft: false
description: "Appraisalを使っている状態でもRubyMineのGUIでRSpecを実行する"
tags:
  - PROGRAMMING
  - Ruby
author: ikuma-t
modDatetime: 2022-02-09 10:00:00
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220209/20220209071635.png

- [きっかけ](#きっかけ)
- [TL:DR;](#TLDR)
- [前提のおさらい](#前提のおさらい)

  - [Appraisal](#Appraisal)
  - [RubyMineでのRSpec実行](#RubyMineでのRSpec実行)

- [問題点](#問題点)
- [対応策](#対応策)
- [scriptを作成する](#scriptを作成する)
- [RubyMineにscriptを認識させる](#RubyMineにscriptを認識させる)
- [実行結果](#実行結果)
- [感想](#感想)

## きっかけ

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2FIkumaTadokoro%2Fjp_local_gov%2Fblob%2Fmain%2FAppraisals" title="jp_local_gov/Appraisals at main · IkumaTadokoro/jp_local_gov" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/IkumaTadokoro/jp_local_gov/blob/main/Appraisals)

先日開発したGemはActiveRecordへの対応を仕様として盛り込んでいるため、Appraisalを使って、複数verのActiveRecordでテストができるようにしています。

それはそれでいいんですが、この状態でいつものようにRubyMine上からテストを実行しようとすると、Appraisalで指定しているはずのGem（ActiveRecord）がないためにテストが落ちるようになってしまいました（ActiveRecordからAppraisal経由でテストをすれば問題なくとおる）。

```
Testing started at 7:13 ...An error occurred while loading spec_helper. - Did you mean?                    rspec ./spec/spec_helper.rbFailure/Error: require "active_record"LoadError:  cannot load such file -- active_record# ./spec/spec_helper.rb:6:in `require'# ./spec/spec_helper.rb:6:in `<top (required)>'Run options: include {:full_description=>/JpLocalGov\.find/}All examples were filtered out
```

というわけで今回はAppraisalを経由しても、RubyMine上でテストを実行できるようにしていきます。

## TL:DR;

- Apppraisalを導入する場合、各種コマンドは`bundle exec appraisal`の形式で呼び出す必要がある。
- RubyMine標準のRSpec実行は`bundle exec rspec ….` であるため、Appraisalが導入されていて、そこでインストールされたGemに依存する実装・テストを書いている場合、RubyMine経由でRSpecが実行できなくなる。
- AppraisalのCLIを経由するscriptを作成し、RubyMineに設定することで、RubyMine経由でもRSpecを個別に実行できるようになる。

## 前提のおさらい

### Appraisal

Appraisalはthoutbot社が管理している、複数のバージョンでのテストを同時に行うためのGemです。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fthoughtbot%2Fappraisal" title="GitHub - thoughtbot/appraisal: A Ruby library for testing your library against different versions of dependencies." class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/thoughtbot/appraisal)

公式READMEからの拝借になりますが、以下のように指定することで、Railsの3と4の双方の環境でテストを実行することができます。通常のGemfileでは1つのGemに対して、1つのバージョンしか指定できないため、複数環境に対応したい場合に重宝します。

```
appraise "rails-3" do  gem "rails", "3.2.14"endappraise "rails-4" do  gem "rails", "4.0.0"end
```

Appraisalを使用する場合、各種コマンドは次のように実行することになります。

```
bundle exec appraisal {実行対象の環境} <実行したいコマンド># 上記例で、rails-3のかんきょうでテストしたい場合、bundle exec appraisal rails-3 rspec
```

### RubyMineでのRSpec実行

 ![f:id:ikmbear:20220209071635p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220209/20220209071635.png)

RubyMineではテスティングGUIに関係なく、GUI上でテストの実行ができます。

一括実行と個別実行の双方を行うことができます。

内部的には、各テスティング$1のexampleやname指定のオプションなどを付与しながら、`bundle exec rspec`を実行しているだけです。

## 問題点

上記の通り、Apppraisalは`bundle exec appraisal`の形式で各コマンドを呼び出すことで、指定した環境のGemfileでコマンドを実行することができます。

逆にいえばAppraisalを経由しないと、Appraisalで指定したGemfileは認識されません。冒頭に述べた通り、Appraisalは複数のバージョンでのテストを可能にするためのGemなので、Appraisalを経由しない = テストが実行できない ということです。

RubyMineでのテスト実行はAppraisalを経由しない形式になっているので、結果としてAppraisalを利用すると、テストが実行できないということになります。

## 対応策

以下の2ステップで対応します。

1. Appraisal経由でテストを実行するscriptを作成する
2. 1のscriptをRubyMineに認識させる。

## scriptを作成する

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fthoughtbot%2Fappraisal%2Fissues%2F123" title="IDE integration · Issue #123 · thoughtbot/appraisal" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/thoughtbot/appraisal/issues/123)

```
require 'rubygems'require 'bundler/setup'require 'appraisal'require 'appraisal/cli'begin appraisal_name = ''rails-5.0" # this is just an example, use the appraisal that you have installed  cmd = [appraisal_name, 'rspec'] + ARGV  Appraisal::CLI.start(cmd)rescue Appraisal::AppraisalsNotFound => e  puts e.message  exit 127end
```

AppraisalのIssueを確認していると、同じような問題が起票されていました。

AppraisalにCLIがあるので、それを間接的に呼び出すようです。このコードでは特定のAppraisal環境をしていするようになっていますが、とりあえずすべてのAppraisal環境で実行するように少し修正しました。

```
require "rubygems"require "bundler/setup"require "appraisal"require "appraisal/cli"begin  `bundle exec appraisal list`.split(/\R/) do |appraisal_name|    cmd = [appraisal_name, "rspec"] + ARGV    Appraisal::CLI.start(cmd)  endrescue Appraisal::AppraisalsNotFound => e  puts e.message  exit 127end
```

## RubyMineにscriptを認識させる

RubyMineのGUI実行は、それぞれ実行の構成を指定することができます。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fzenn.dev%2Fikuma%2Fbooks%2Fhow-to-use-redimine%2Fviewer%2Frun-source%23%E5%AE%9F%E8%A1%8C%E3%81%AE%E6%A7%8B%E6%88%90%EF%BC%9Aedit-configurations" title="コードの実行｜RubyMine入門" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [zenn.dev](https://zenn.dev/ikuma/books/how-to-use-redimine/viewer/run-source#実行の構成：edit-configurations)

 ![f:id:ikmbear:20220209071725p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220209/20220209071725.png)

複数の構成に対して、まとめて設定を行うためには「Edit configuration templates...」を選択します。

 ![f:id:ikmbear:20220209071741p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220209/20220209071741.png)

左側のサイドバーからRSpecを選択し、「Use cutom RSpec runner script」に、1で作成したscriptを設定します。scriptはどこにおいてもいいですが、Appraisalはプロジェクト固有のものだと思うので、私はプロジェクトのbinフォルダにおいています。

これにより、RubyMineがRSpecを実行するときは、このコマンドを実行するようになります。

## 実行結果

```
BUNDLE_GEMFILE=/Users/tadokoroikuma/RubymineProjects/jp_local_gov/gemfiles/rails61.gemfile bundle exec rspec
```

これらの設定でRSpec実行時にAppraisalのCLIが走るようになり、Gemfileを指定した状態でテストが実行できるようになりました。

## 感想

Appraisalで作成した環境に対してCLI実行する分にはこのCLIでいいんですが、「ある特定のテストを特定の環境でのみ実行したい」というケースは対応できないので、対応できるようにしておきたいです（CLIの引数処理→Appraisal CLIの引数処理の部分だけクリアできれば、ちゃちゃっとできると思うので）。
