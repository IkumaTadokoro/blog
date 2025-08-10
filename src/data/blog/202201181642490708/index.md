---
title: "日本の地方公共団体コードをパースするGemをリリースしました"
publishDate: 2022-01-18 16:25:08
category: tech
draft: false
description: "日本の地方公共団体コードをパースするGemをリリースしました"
tags:
  - PROGRAMMING
  - Ruby
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220118/20220118162141.png

 ![f:id:ikmbear:20220118162141p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220118/20220118162141.png) 

## 作ったもの

 ![f:id:ikmbear:20220118162056p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220118/20220118162056.png) 

jp_local_govという日本の$1コードを市区町村の情報にパースしてくれるGemを作りました。人生初Gemリリースです🎉

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2FIkumaTadokoro%2Fjp_local_gov" title="GitHub - IkumaTadokoro/jp_local_gov: Convert japan local government code (JIS X 0402 based) into the local government name." class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/IkumaTadokoro/jp_local_gov)

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Frubygems.org%2Fgems%2Fjp_local_gov" title="jp_local_gov | RubyGems.org | your community gem host" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [rubygems.org](https://rubygems.org/gems/jp_local_gov)

「そもそも$1コードってなんやねん」方も多いと思いますが、

> **$1**（ぜんこくちほうこうきょうだんたいコード）[[注釈 1]](https://ja.wikipedia.org/wiki/%E5%85%A8%E5%9B%BD%E5%9C%B0%E6%96%B9%E5%85%AC%E5%85%B1%E5%9B%A3%E4%BD%93%E3%82%B3%E3%83%BC%E3%83%89#cite_note-2)は、[日本](https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC)の[地方公共団体](https://ja.wikipedia.org/wiki/%E5%9C%B0%E6%96%B9%E5%85%AC%E5%85%B1%E5%9B%A3%E4%BD%93)につけられた、数字3[桁](https://ja.wikipedia.org/wiki/%E6%A1%81)または5桁または6桁の符号（コード）で ある。コードが与えられる$1とは、[都道府県](https://ja.wikipedia.org/wiki/%E9%83%BD%E9%81%93%E5%BA%9C%E7%9C%8C)・[市町村](https://ja.wikipedia.org/wiki/%E5%B8%82%E7%94%BA%E6%9D%91)・[特別区](https://ja.wikipedia.org/wiki/%E7%89%B9%E5%88%A5%E5%8C%BA)、[一部事務組合](https://ja.wikipedia.org/wiki/%E4%B8%80%E9%83%A8%E4%BA%8B%E5%8B%99%E7%B5%84%E5%90%88)・[地方開発事業団](https://ja.wikipedia.org/wiki/%E5%9C%B0%E6%96%B9%E9%96%8B%E7%99%BA%E4%BA%8B%E6%A5%AD%E5%9B%A3)・[広域連合](https://ja.wikipedia.org/wiki/%E5%BA%83%E5%9F%9F%E9%80%A3%E5%90%88)、加えて、$1ではないが[行政区](https://ja.wikipedia.org/wiki/%E8%A1%8C%E6%94%BF%E5%8C%BA)・[東京都区部](https://ja.wikipedia.org/wiki/%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8C%BA%E9%83%A8)である。
>
> [全国地方公共団体コード - Wikipedia](https://ja.wikipedia.org/wiki/%E5%85%A8%E5%9B%BD%E5%9C%B0%E6%96%B9%E5%85%AC%E5%85%B1%E5%9B%A3%E4%BD%93%E3%82%B3%E3%83%BC%E3%83%89)

というものです。JIS規格にも指定されています。

3桁、5桁、6桁とありますが、ルール的には

- 上2桁が$1府県、
- 続く3桁が市区町村
- 残りの1桁がチェックディジット

になっているので、このGemでは6桁フルの状態をパースできるようになっています。

READMEにも書いているのですが、jp_prefectureのア$1に多大に影響を受けています。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fchocoby%2Fjp_prefecture" title="GitHub - chocoby/jp_prefecture: Convert japan prefecture code (JIS X 0402 based) into prefecture name." class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/chocoby/jp_prefecture)

## 作った背景

今作っているサービスで必要だったからです。

ざっくりいうと公共料金を計算するサービスで、その計算のための料率が市区町村ごとに違うために、市区町村ごとにレコードを持つ必要がありました。

で、市区町村だけのテーブルをもつのもなんだか微妙だし、市区町村のための管理画面をもつのも面倒だったので、「Gemでできないかな〜」と思っていたのですが、似たようなア$1のGemは更新が数年前...。

...みたいなことを、FJORD BOOT CAMP内で日報に書いたら、メンターさんから「作ってみては」とアド$1が。

「ちょっと難しいかも...」と思いつつも、内心「作ってみたい、MY FIRST GEM」という思いが心の中に溢れてきたので、作ることにしました！

## 使い方

だいたいREADMEに書いてある通りなんですが、英語なので日本語でも書きます。

### インストール

一応Ruby3.0.0以上が対象です。

普通にインストールするか

```
gem install jp_local_gov
```

Gemfileを使ってインストールします

```
# Gemfilegem 'jp_local_gov'
```

```
bundle install
```

必要に応じて`require` します。

```
require 'jp_local_gov'
```

### id指定の検索（`JpLocalGov.find` ）

$1コード（String）を指定することで、$1の情報を取得することができます。

```
chiyodaku = JpLocalGov.find("131016")# => #<JpLocalGov::LocalGov:0x00007fe706a8f148 @code="131016", @prefecture_code="13", @prefecture="東京都", @prefecture_kana="トウキョウト", @city="千代田区", @city_kana="チヨダク", @prefecture_capital=false>chiyodaku.code# => "131016"chiyodaku.prefecture_code# => "13"chiyodaku.prefecture# => "東京都"chiyodaku.prefecture_kana# => "トウキョウト"chiyodaku.city# => "千代田区"chiyodaku.city_kana# => "チヨダク"chiyodaku.prefecture_capital# => false
```

この後のメソッドでも共通ですが、取得できる情報は

- $1コード
- $1府県コード
- $1府県（漢字）
- $1府県（カタカナ）
- 市区町村（漢字）
- 市区町村（カタカナ）
- $1所在地かどうか

です。

ひらがなとか英字とかも追加するのは苦ではないんですが、$1が出している元データは漢字とカタカナだけなのと、あんまり$1が見つからなかったので、一旦出していません。

あと東京都の都庁所在地は一応「東京」って習ったと思うんですが、「新宿」として登録しています。

### 条件指定での検索（`JpLocalGov.where`）

上記の取得できる情報をキーとして、ハッシュを渡すことで、指定した条件に合致する市区町村の情報が配列で返ってきます。

なお複数の条件を指定した場合はAND検索になります。

```
misato = JpLocalGov.where(city: "美郷町")# => [#<JpLocalGov::LocalGov:0x00007fb1c594cb08 @code="054348", @prefecture_code="05", @prefecture="秋田県", @prefecture_kana="アキタケン", @city="美郷町", @city_kana="ミサトチョウ", @prefecture_capital=false>, #<JpLocalGov::LocalGov:8 @code="324485", @prefecture_code="32", @prefecture="島根県", @prefecture_kana="シマネケン", @city="美郷町", @city_kana="ミサトチョウ", @prefecture_capital=false>, #<JpLocalGov::LocalGov:0x00007fb1c1a3ce40 @code="454311", @prefecture="宮崎県", @prefecture_kana="ミヤザキケン", @city="美郷町", @city_kana="ミサトチョウ", @prefecture_capital=false>]misato.map { "#{_1.prefecture}:#{_1.city}" }# => ["秋田県:美郷町", "島根県:美郷町", "宮崎県:美郷町"]JpLocalGov.where(prefecture: "東京都", prefecture_capital: true)# => [#<JpLocalGov::LocalGov:0x00007fb1c219e418 @code="131041", @prefecture_code="13", @prefecture="東京都", @prefecture_kana="トウキョウト", @city="新宿区", @city_kana="シンジュクク", @prefecture_capital=true>]JpLocalGov.where(prefecture: "東京")# => nil# Exact match search. You should specified "東京都" instead of "東京".
```

### 全件検索（`JpLocalGov.all`）

すべての$1の情報を取得したい場合に使用します。戻り値は配列です。

```
JpLocalGov.all# =>  [#<JpLocalGov::LocalGov:0x00007fdf3a9c6758 @code="011002", @prefecture_code="01", @prefecture="北海道", @prefecture_kana="ホッカイドウ", @city="札幌市na="サッポロシ", @prefecture_capital=true>, #<JpLocalGov::LocalGov:0x00007fdf3a9c6730 @code="011011",...
```

Railsだと、`collection_select` を使用することで、すべての市区町村のコンボボックスを簡単に作ることができます。

### ランダムな$1情報の生成（`JpLocalGov::Random`）

ランダムな$1情報から、指定したプロパティを返します。

```
JpLocalGov::Random.code# => "281077"JpLocalGov::Random.city# => "大島町"JpLocalGov::Random.city_kana# => "チュウオウシ"JpLocalGov::Random.prefecture# => "青森県"JpLocalGov::Random.prefecture_code# => "46"JpLocalGov::Random.prefecture_kana# => "ヒョウゴケン"
```

一応想定するケースとしては、FactoryBotで$1コードを指定する際に、決めうちではんく探索的なテストデータを作成しておきたいという場合を想定しています。

後述しますが、Railsで使用する場合はDBに保持するカラムは`local_gov_code` だけなので、その他のプロパティのメソッドはあまり使い所がないかもしれません笑

補足として、あくまでプロパティ単位でしかランダムな値を生成しないので、ランダムな$1の$1を作成する場合は、

```
JpLocalGov.find(JpLocalGov::Random.code)
```

という具合に呼んでやる必要があります。需要があれば、`JpLocalGov::Random.new` みたいなのを作るかもです。

### Railsでの使用（基本）

このGemをModelクラスに`include`することで、そのモデル内で`local_govenment` というメソッドが使えるようになります。

`jp_local_gov :<地方公共団体コードを保存したカラム名>` とすることで、そのカラム（$1コード）から、$1府県名や市区町村の情報を展開することができるようになります。

```
# app/models/insurance_fee.rb:class InsuranceFee < ActiveRecord::Base  # local_gov_code:String  include JpLocalGov  jp_local_gov :local_gov_codeend
```

```
insurance_fee = InsuranceFee.newinsurance_fee.local_gov_code = "131016"insurance_fee.local_government.city# => "千代田区"
```

なおカラム「$1コード」の作成時、型はStringにする必要があります。

### Railsでの使用（バリデーション）（`JpLocalGov.valid_code?` ）

$1コードのチェックのためのメソッドを設けているので、これをカスタムバリデーションに組み込むことで、$1コードのチェックができます。

```
class InsuranceFee < ApplicationRecord  include JpLocalGov  jp_local_gov :local_gov_code  ## カスタムバリデーションで利用する  validate :valid_code?  def valid_code?    unless JpLocalGov.valid_code?(local_gov_code)      errors.add(:local_gov_code, "is not valid code")    end  endend
```

実施しているチェックは

- コードが文字列かどうか
- コードが正しい長さか（6文字）
- チェックディジットを満たしているか
- 正しい$1府県コードを持っているか

です。

チェックディジットについては、$1コードの仕様に記載があります。

 ![f:id:ikmbear:20220118162309p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220118/20220118162309.png) 

> 11 検査数字
>
> $1における検査数字は、電算処理にあたって、不正なコードが使われないよう第6桁目をチェック用としたもので、次の方式により算出した数字とする。(方式)第1桁から第5桁までの数字に、それぞれ6.5.4.3.2を乗じて算出した積の和を求め、その和を11で除し、商と剰余(以下「余り数字」という。)を求めて、11と余り数字との差の下1桁の数字を検査数字とする。ただし、積の和が11より小なるときは、検査数字は、11から積の和を控除した数字とする。

出典：[https://www.soumu.go.jp/main_content/000137948.pdf](https://www.soumu.go.jp/main_content/000137948.pdf)

実装としてはこんな感じです。ボリューム的にもプログラミングのちょうどいい問題だと感じていて、結構好きな仕様です。

```
CHECK_DIGITS_INDEX = 5CHECK_BASE = 11sub_total = code.chars                .take(CHECK_DIGITS_INDEX)                .map.with_index { |digit, index| digit.to_i * (CHECK_DIGITS_INDEX - index + 1) }                .sumcandidate = (CHECK_BASE - sub_total % CHECK_BASE) % 10check_digits = sub_total > CHECK_BASE ? candidate : CHECK_BASE - sub_totalcode[CHECK_DIGITS_INDEX] == check_digits.to_s
```

なお最初はチェックディジットだけのチェックでいいかなと思っていたんですが、チェックディジットを満たしていても、$1府県コードがイレギュラーになるケースに後から気がつきました。

```
'481238' # 都道府県は47までなので、こんな市区町村はない# 第1桁から第5桁までの数字に、それぞれ6.5.4.3.2を乗じて算出した積の和を求める80# その和を11で除し、商と剰余(以下「余り数字」という。)を求めて、11と余り数字との差の下1桁の数字を検査数字とする。8　　# 存在しない市区町村だけど、チェックディジットを満たす
```

なので、$1府県コード（`1..47`）のチェックも入っています。

## 仕組み

 ![f:id:ikmbear:20220118161859p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20220118/20220118161859.png) 

そこまで複雑なGemではないのですが、一応こういう仕組みです。

[総務省｜地方行政のデジタル化｜全国地方公共団体コード](https://www.soumu.go.jp/denshijiti/code.html)

情報の元は$1のこのページです。手順的には以下のような感じです。

1. 元データ（PDF）をGem：pdf-readerで読み取る
2. sqliteにぶん投げる
3. sqlite内でソートを行う
4. JSON府県ごとにSELECTしてJSONに出力する
5. 出力されたJSONを使ってJSONコードをパースする

このGemはGitHubコードの情報が命なので、この処理自体をRakeタスクとして登録して、GitHub Actionsで1ヶ月に1回、自動でPRを作成する形式にしています。

## 今後の展望

まだIssueにも登録していませんが、ここらへんはやりたいなと思っています。

### `JpLocalGov.all` で$1の行政区を除外する

「区」って東京のイメージが強いですが、実は各$1府県の$1には区があります。例えば札幌市には$1や東区があります。

市区町村を選択するのに、ここら辺を選択したい場合もあれば、「札幌市」という市区町村の単位だけがあればいいケースもあると思っています（私のアプリもそうです）。

なので、これをオプションで除外できるようにしたいです。一応、$1府県コードに続く3桁の決まりでなんとか除外できそうなので、近いうちに入ると思います。

### YARDでドキュメントを書く

`@params` とかかいてあるあれです。

このGemはRBSを使っているので、それが半分ドキュメントの役割を果たしている感じもしますが、まだまだ普及率も高くないことと、自分自身が書いてみたいので、これも時間ができたらやる予定です。

### 各RubyバージョンでのテストのCIを実行する

強いGemのCIで走っているあれです。

今はrubyにruby-versionをおいて、それをGitHub Actionsで参照するようにしているのですが、これを各Rubyバージョンで実行できるようにしたいです。

どうやってやるのかわからんですが。

### 曖昧検索、一つのプロパティに対して複数条件検索、OR検索

今実装している`where` は完全一致検索かつAND検索で、一つのプロパティに対して一つの条件しか指定できないんですが、ここら辺をもうちょっと柔軟にしたいです。

あんまり使う機会ないんですけど、なんかできたら良さそうな感じするじゃないですか。

### 変更差分の$1

リリースしてからまだ時間が立ってないので、$1コードの変更は起こっていないんですが、変更が発生した場合になんかいい感じに見せられないかな〜とぼんやり思っています。

## 終わりに

というわけで、$1コードをパースしてくれるGem「jp_local_gov」をリリースしたというお話でした。

前にもnpmを作ったことはあったのですが、今回はちゃんと実践的に使えるものを作ったので、いろいろと学びも多かったし、楽しかったです😄

（npmの話はこちら）

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fikmbear.hatenablog.com%2Fentry%2F20211017%2F1634472193" title="spotifyのプレイリストを自動で作るnpm（recommendify）を作った - セットプチフォッカ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe>

> [ikmbear.hatenablog.com](https://ikmbear.hatenablog.com/entry/20211017/1634472193)

市区町村まで必要になるケースってそんなに多くないかもですが、もしこのGemを作っていただける方がいるなら嬉しいです！バグや要望はIssueにお気軽に登録してください！

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2FIkumaTadokoro%2Fjp_local_gov%2Fissues" title="Issues · IkumaTadokoro/jp_local_gov" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/IkumaTadokoro/jp_local_gov/issues)
