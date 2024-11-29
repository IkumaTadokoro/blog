---
title: "ObjectSpace.#define_finalizer"
description: "過去ブログからの移行記事"
publishDate: 2022-09-11

tags: []
draft: false
---


ソースリーディングしているGemの中で、接続開始したタイミングでセッションをkillするスクリプトがあったのをきっかけに調べた。

https://docs.ruby-lang.org/ja/latest/method/ObjectSpace/m/define_finalizer.html

```ruby
class Foo
  def Foo.callback
    proc {
      puts 'bar'
    }
  end

  def initialize
    ObjectSpace.define_finalizer(self, Foo.callback)
  end

  def hoge
    puts 'hoge'
  end
end

Foo.new
Foo.new.hoge
```

```bash
$ ruby define_finalizer_sample.rb

hoge
bar
bar
```

そのオブジェクトが解放されたタイミングで実行される処理を登録することができる。読んだソースの中では、先の通りセッションを開いたタイミングで対象のpidを指定してセッションのkillを予約している構造になっていた。
