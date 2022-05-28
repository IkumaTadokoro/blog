---
title: 'Gemfileにある`require: false`ってなんでしたっけ？'
date: '2022-05-28'
---

Gemfileで度々でてくる`require: false`。ざっくり理解はしているけど、ちゃんと公式ドキュメントを読んでいなかったので、思い出しついでに読んでいく。

まず`require: false`のそもそもの意味は[Bundler: gemfile](https://bundler.io/man/gemfile.5.html#REQUIRE-AS)に記載があって、

> false to prevent any file from being autorequired.

つまり、自動でrequiredしないようにするには、`require: false`と書くことになる。

---

Bundlerを使用していない場合、通常`require`を各ファイルで各gemに対して書く必要があるが、Bundlerにはロードを行うパスの解決を行う`Bundler.setup`とそこで指定されたGemを自動的にrequireする`Bundler.require`という機能があり、これによりGemfile記載のgemは全て自動でrequireされる。

これを無効にするのが`require: false`である（デフォルトがtrue）

---

どういう場面で使用するかというと、「依存関係は管理したいが、アプリでは使用しない」といったケースで使用する。
例えばRakeタスクで自動的にデータを取得するのに使用しているけれども、アプリで使うのはデータであって、そのgem自体は使用しない、みたいな場合に`require: false`を指定してあげるといった例がある。

---

「`Bundler.setup`とか`Bundler.require`とかあまり使ったことないんだけど...」となるものそのはずで、Railsの場合はフレームワーク側でそれが組み込まれているので普段は意識しない。

`Bundker.setup`は`config/boot.rb`に記載されている。

```ruby
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.
```

`Bundler.require`は`config/application.rb`に記載されている。

```ruby
require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
...
```
