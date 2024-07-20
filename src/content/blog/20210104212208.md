---
author: ikuma-t
publishDate: 2021-01-04 21:22:08
modDatetime: 2021-01-04 21:22:08
title: "【Rails】ActiveRecord::core#==はidを比較する（Rails6.1）"
slug: "20210104212208"
featured: false
draft: false
tags:
  - PROGRAMMING
  - Ruby on Rails
  - Ruby
description: "【Rails】ActiveRecord::core#==はidを比較する（Rails6.1）"
---

- [きっかけ](#きっかけ)
- [ソースをみる](#ソースをみる)

  - [Rubyの演算子の優先順位](#Rubyの演算子の優先順位)
  - [コメントを眺めてみる](#コメントを眺めてみる)

- [まとめ](#まとめ)

## きっかけ

```
<% if @user.id == current_user.id %>
```

$1ブートキャンプの課題で、こんなコードを書いていたら

> ActiveRecordはデフォルトでid同士を比較するので@user == current_userでOKです。

とレビューいただきました。

「$1〜そうなんや」ではもったいないので、ソースを追っかけてみました。

## ソースをみる

```
# Returns true if +comparison_object+ is the same exact object, or +comparison_object+# is of the same type and +self+ has an ID and it is equal to +comparison_object.id+.## Note that new records are different from any other record by definition, unless the# other record is the receiver itself. Besides, if you fetch existing records with# +select+ and leave the ID out, you're on your own, this predicate will return false.## Note also that destroying a record preserves its ID in the model instance, so deleted# models are still comparable.def ==(comparison_object)  super ||    comparison_object.instance_of?(self.class) &&    !id.nil? &&    comparison_object.id == idendalias :eql? :==
```

[rails/core.rb at c7dfe33f3958295a857d7bfb1070302e5b7429ff · rails/rails](https://github.com/rails/rails/blob/c7dfe33f3958295a857d7bfb1070302e5b7429ff/activerecord/lib/active_record/core.rb#L411)

それでは頭の悪さを晒していきましょう。

### RubyのRubyの優先順位

$1ばっかりで面食らいました。

`&&`は`||`よりも優先順位が高いので、このメソッドは以下のように書き換えることができます。

```
def ==(comparison_object)  super || (comparison_object.instance_of?(self.class) && !id.nil? && comparison_object.id == id)end
```

参考：[演算子式 (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/doc/spec=2foperator.html)

Rubyは式全体の真偽を決定するまで、左辺から順に式を評価します。  
つまりは`super`（自分とまったく同じオブジェクトなら真）が偽であれば、`||`以降の内容が評価されることになります。

### コメントを眺めてみる

ソースに書いてあることを全部調べた上で、コメントをみてみましょう。

> Returns true if +comparison_object+ is the same exact object, or +comparison_object+ is of the same type and +self+ has an ID and it is equal to +comparison_object.id+.  
> 比較対象がまったく同じオブジェクト、もしくはクラスが同じで、IDを持ち、かつIDの値が比較対象同士で同じならtrueを返す

これはソースそのものの通りですね。

> Note that new records are different from any other record by definition, unless the other record is the receiver itself.  
> 新しいレコードは、他のレコードがレシーバ自身でない限り、定義上、他のレコードとは異なることに注意してください。
>
> Besides, if you fetch existing records with +select+ and leave the ID out, you're on your own, this predicate will return false.  
> また、既存のレコードを+select+で取得する際にIDを対象外とすると、このメソッドはfalseを返します。

いずれもこのメソッドでは`!id.nil?`が条件となっているので、必ずfalseがかえるということですかね。

1つ目は、newしたばかりのレコードはidがnilだから、  
2つ目は`select`でカラムを指定する際に`id`を対象外とすると、`id`はnilだから、ということでしょうか。

> Note also that destroying a record preserves its ID in the model instance, so deleted models are still comparable.  
> また、レコードの削除はモデル$1のIDを保持するので、削除されたモデルはまだ比較可能であることにも注意してください。

いまいちよくわからなかった箇所。結局`id`が残ってさえいれば、いつまでもtrueがか返すということでしょうか...🤔

```
book = Book.find(1)bookA = Book.find(1)book == bookA#=> truebook.deletebook == bookA#=> true
```

## まとめ

- `ActiveRecord::core#==`は`id`同士を比較する
- `id`がnilの場合は、必ずfalseを返す
- `id`とクラスさえ合っていれば、他の値が違っていてもtrueを返す
