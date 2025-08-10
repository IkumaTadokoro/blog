---
title: "Formオブジェクトのロケールファイルの定義方法（i18n）"
publishDate: 2022-02-23 10:00:00
category: tech
draft: false
description: "Formオブジェクトのロケールファイルの定義方法（i18n）"
tags:
  - PROGRAMMING
  - Ruby on Rails
author: ikuma-t
slug: "202202231645578000"
---
- [Formオブジェクトを利用した場合の翻訳キーはどれ？](#Formオブジェクトを利用した場合の翻訳キーはどれ)
- [要約](#要約)
- [前提](#前提)

  - [対象バージョン](#対象バージョン)
  - [サンプルケース](#サンプルケース)

- [RailsがModelのi18nを探索する手順](#RailsがModelのi18nを探索する手順)
  - [バリデーションメッセージ](#バリデーションメッセージ)
  - [カラム（画面表示項目）](#カラム画面表示項目)

## Formオブジェクトを利用した場合の翻訳キーはどれ？

通常DBに紐づくモデル、つまり`ActiveRecord::Base`を継承したクラスに対応するフォームを作成する場合、次のような$1ファイルを作成することで、バリデーションメッセージや表示される項目を多$1することができます。

```
ja:  activerecord: # activerecordをキーにする    attributes:      user:        name: 名前        password: パスワード
```

一方DBへの保存だけではなく、複雑な$1を実装する場合にはFormオブジェクトを作って対処します。例えばフォームから入力されたデータを用いて、メール送信を行うような場合です。

Formオブジェクトは複数のモデルを扱ったり、DB以外の操作が伴うため、基本的には`ActiveModel::Model`をincludeした形で実装します。

また、form_withからの$1判定を行うために、to_modelをオーバーライドし、メインとなるModelクラスに向けることもあります。

...こうなってくると、i18n用のi18nファイルをどうやって書いたらいいのかよくわからなくなってきたので、Railsがどのようにi18nファイルを解釈しているのか調べました。

## 要約

- ActiveModelとActiveRecordはそれぞれ`i18n_scope`を実装していて、これによりActiveRecordファイルのトッActiveRecordルの探索キーが決まる。
- Formオブジェクト側で行っている処理（例：バリデーション）は`activemodel`をキーにする
- to_modelをオーバーライドしてActiveRecord::Baseを継承したモデルを参照している場合、それらの表示に対する翻訳は`activerecord`をキーにする

## 前提

### 対象バージョン

- ActiveRecord：\~\> 7.0.0
- ActiveModel：\~\> 7.0.0

### サンプルケース

モデル：User

```
class User < ApplicationRecordend
```

フォームオブジェクト：UserForm

```
class UserForm    include ActiveModel::Model  include ActiveModel::Attributes  attr_reader :user  def initialize(user = User.new, **attributes)    @user = user    attributes = default_attributes if attributes.empty?    super(attributes)  end  validates :name, presence: true  # バリデーションがいっぱい  attribute :name, :string  # カラム定義も様々  def save    # 実際の処理  end  def to_model    user  endend
```

## RailsがModelのi18nを探索する手順

### バリデーションメッセージ

バリデーション用のエラーメッセージの組み立ては、`ActiveModel::Error.generata_message`で行われています。

[https://github.com/rails/rails/blob/main/activemodel/lib/active_model/error.rb#L64](https://github.com/rails/rails/blob/main/activemodel/lib/active_model/error.rb#L64)

```
def self.generate_message(attribute, type, base, options) # :nodoc:      type = options.delete(:message) if options[:message].is_a?(Symbol)      value = (attribute != :base ? base.read_attribute_for_validation(attribute) : nil)      options = {        model: base.model_name.human,        attribute: base.class.human_attribute_name(attribute, { base: base }),        value: value,        object: base      }.merge!(options)      if base.class.respond_to?(:i18n_scope)        i18n_scope = base.class.i18n_scope.to_s        attribute = attribute.to_s.remove(/\[\d+\]/)        defaults = base.class.lookup_ancestors.flat_map do |klass|          [ :"#{i18n_scope}.errors.models.#{klass.model_name.i18n_key}.attributes.#{attribute}.#{type}",            :"#{i18n_scope}.errors.models.#{klass.model_name.i18n_key}.#{type}" ]        end        defaults << :"#{i18n_scope}.errors.messages.#{type}"        catch(:exception) do          translation = I18n.translate(defaults.first, **options.merge(default: defaults.drop(1), throw: true))          return translation unless translation.nil?        end unless options[:message]      else        defaults = []      end      defaults << :"errors.attributes.#{attribute}.#{type}"      defaults << :"errors.messages.#{type}"      key = defaults.shift      defaults = options.delete(:message) if options[:message]      options[:default] = defaults      I18n.translate(key, **options)    end
```

[https://api.rubyonrails.org/classes/ActiveModel/Errors.html#method-i-generate_message](https://api.rubyonrails.org/classes/ActiveModel/Errors.html#method-i-generate_message)

抜粋するとこんな感じです。

```
def self.generate_message(attribute, type, base, options) # :nodoc:    # 1： 対象のクラスについて、i18n_scopeを実行し、キーを取得する。  if base.class.respond_to?(:i18n_scope)    i18n_scope = base.class.i18n_scope.to_s    attribute = attribute.to_s.remove(/\[\d+\]/)    defaults = base.class.lookup_ancestors.flat_map do |klass|      [ :"#{i18n_scope}.errors.models.#{klass.model_name.i18n_key}.attributes.#{attribute}.#{type}",        :"#{i18n_scope}.errors.models.#{klass.model_name.i18n_key}.#{type}" ]    end    # 省略  end  # 2. 取得できた情報でデータを翻訳文を作成し、つっこむ  key = defaults.shift  defaults = options.delete(:message) if options[:message]  options[:default] = defaults  # 3. 2で作成されたデータで翻訳処理を行う（ロケールに応じたファイルを選択する）  I18n.translate(key, **options)end
```

ここで肝になるのは`i18n_scope`というメソッドです。このメソッドにより、`activerecord`を見にいくのか、`activemodel`を見にいくのかが決まります。

ではその実装はどうなっているのかというと、ActiveModelの場合、次のようになっています。

```
# Returns the +i18n_scope+ for the class. Override if you want custom lookup.def i18n_scope  :activemodelend
```

[https://github.com/rails/rails/blob/75a9e1be75769ae633a938d81d51e06852a69ea3/activemodel/lib/active_model/translation.rb#L26](https://github.com/rails/rails/blob/75a9e1be75769ae633a938d81d51e06852a69ea3/activemodel/lib/active_model/translation.rb#L26)

一方で、ActiveRecordでも同じメソッドがオーバーライドされており、次のように実装されています。

```
# Set the i18n scope to override ActiveModel.def i18n_scope # :nodoc:  :activerecordend
```

[https://github.com/rails/rails/blob/75a9e1be75769ae633a938d81d51e06852a69ea3/activerecord/lib/active_record/translation.rb#L20](https://github.com/rails/rails/blob/75a9e1be75769ae633a938d81d51e06852a69ea3/activerecord/lib/active_record/translation.rb#L20)

これにより、翻訳対象のクラスが

- ActiveModelの場合は、`activemodel`
- ActiveRecordの場合は、`activerecord`

が翻訳キーとして採用されることになります。

ここで、バリデーションメッセージについては、Formオブジェクト、つまりActiveModelで実装されたものです。そのため、エラーメッセージの翻訳キーは`activemodel`始まりになります。

```
ja:    activemodel:        user_form:            name: 名前            password: パスワード
```

### カラム（画面表示項目）

カラム（画面表示項目）の翻訳についても先のi18n\_scopeで説明がつきます。

form_withでフォームを作成する際に、to_modelによって、ActiveRecordであるUser側にクラス判定が向くため、ActiveRecordのi18n\_scopeが採用されます。

そのため、以下のような$1ファイルを記述します。

```
ja:    activerecord:        user:            name: 名前            password: パスワード
```

なおUserモデルに含まれない項目をFormオブジェクトに定義した場合も、翻訳ファイルはactiverecord下に記述することに注意が必要です。

---

以上Formオブジェクトでの翻訳キーの参照先についての調査でした。
