---
title: "ActiveRecord::PendingMigrationErrorに初遭遇したので、ちゃんと対処する"
publishDate: 2021-01-10 19:56:03
category: tech
draft: false
description: "ActiveRecord::PendingMigrationErrorに初遭遇したので、ちゃんと対処する"
tags:
  - PROGRAMMING
  - Ruby on Rails
  - Ruby
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210110/20210110195519.png

 ![f:id:ikmbear:20210110195519p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210110/20210110195519.png) 

ActiveRecord::PendingMigrationErrorに初めて出会ったので、備忘がてらまとめていきます。

- [発生時の状況](#発生時の状況)

  - [環境](#環境)
  - [開発状況](#開発状況)

- [ActiveRecord::PendingMigrationErrorとは](#ActiveRecordPendingMigrationErrorとは)
- [対処方法（今回のケースの場合）](#対処方法今回のケースの場合)

  - [bin/rails db:migrateだけでは解決しない](#binrails-dbmigrateだけでは解決しない)
  - [その1：bin/rails db:resetを実行する@ブランチB](#その1binrails-dbresetを実行するブランチB)
  - [その2：bin/rails db:rollback [STEP=戻す数]を実行する@ブランチA](#その2binrails-dbrollback-STEP戻す数を実行するブランチA)

- [おまけ1：bin/rails db:migrate:reset と bin/rails db:resetの違い](#おまけ1binrails-dbmigratereset-と-binrails-dbresetの違い)
- [おまけ2：マイグレーションの状況確認のために、覚えておくと良さそうなコマンド](#おまけ2マイグレーションの状況確認のために覚えておくと良さそうなコマンド)
- [おまけ3：bin/railsするべきか](#おまけ3binrailsするべきか)
- [参考](#参考)

## 発生時の状況

### 環境

- Rails 6.1
- Ruby 3.0.0

### 開発状況

各ブランチのDDLファイルは以下の通り。DDLファイルの数は違うが、最終的に実行されるDDL文は同じ（ブランチAはRails6.1、ブランチBはRails6.0での作業→6.1アップグレード）。

- ブランチA：（自分）ActiveStorageに関する$1を実行

  - `20210108102934_create_active_storage_tables.active_storage.rb`

- ブランチB：（他の人）ActiveStorageに関する$1を実行
  - `20201122075737_create_active_storage_tables.active_storage.rb`
  - `20201227052520_add_service_name_to_active_storage_blobs.active_storage.rb`
  - `20201227052521_create_active_storage_variant_records.active_storage.rb`

ブランチAで`bin/rails db:migrate`を実行しているため、DBにはすでにテーブルが存在する。  
ブランチAでの作業後に、ブランチBに切り替え`bin/rails s`したところ、`ActiveRecord::PendingMigrationError`が発生。

## ActiveRecord::PendingMigrationErrorとは

 ![f:id:ikmbear:20210110181314p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20210110/20210110181314.png) 

未実行の$1ファイルが存在するということ。  
今回の場合は、ブランチBで作成されている3つの$1ファイルが実行されていないので、エラーとなっています。

ちなみにRailsは次のような形でRailsファイルの実行状況を確認しているみたいです。  
参考：[rails/migration.rb at 914caca2d31bd753f47f9168f2a375921d9e91cc · rails/rails](https://github.com/rails/rails/blob/914caca2d31bd753f47f9168f2a375921d9e91cc/activerecord/lib/active_record/migration.rb#L1120)

1. $1リ内の$1ファイルをすべて検索
2. テーブル`schema_migration`から適用済みの$1ファイルを検索
3. 1と2の差分を確認する（差分がある場合に、`ActiveRecord::PendingMigrationError`を発生させる）

なお`schema_migration`はDBに追加されているテーブルで、以下のような構造です。

| versions       |
| -------------- |
| 20201122065204 |
| 20201121230730 |
| 20201121231228 |
| 20201121231845 |

## 対処方法（今回のケースの場合）

### bin/rails db:migrateだけでは解決しない

今回の場合、$1自体を行っていないのがそもそもの原因なので、`bin/rails db:migrate`を実施すれば良さそうです。  
しかしながら、実際に$1を実行してみると

```
Caused by:ActiveRecord::StatementInvalid: SQLite3::SQLException: table "active_storage_blobs" already exists
```

...こんな感じで怒られます。

それもそのはずで、まったく同じ内容のDDLを実行しようとしているが故に、DB側でテーブルの重複が指摘されているわけですね。  
じゃあどうするか？今回は2パターンの解決方法を記載してみようと思います。

### その1：bin/rails db:resetを実行する@ブランチB

- メリット：お手軽
- デメリット：登録してきたデータが全て消える

「テーブルが重複するなら、消せばいいじゃない」という考え方です。

`bin/rails db:reset`は内部的には以下のコマンドを実行しています。

- `bin/rails db:reset`
  - `bin/rails db:drop`：現在のDBを全て削除する
  - `bin/rails db:setup`
    - `bin/rails db:create`：データベースの作成
    - `bin/rails db:schema:load`：$1（`schema.rb`）からのテーブル作成
    - `bin/rails db:seed`：初期データの登録

seedファイルにあるデータがあればいい、というのであれば別に問題ありませんが、コツコツ積み上げてきたデータがあった場合それらが消えてしまうので注意が必要です。

### その2：bin/rails db:rollback [STEP=戻す数]を実行する@ブランチA

- メリット：データが消えない
- デメリット：なんですかね。たまにコマンド忘れるとかかな😅あと一手間かかる

「テーブルの追加を無かったことにしよう」という考え方です。

`bin/rails db:rollback`は$1ファイルを一つ前のバージョンに戻します。  
STEPパラメータを指定することで、指定した数だけ$1することができます。

今回であれば`bin/rails db:rollback STEP=1`を実行した上でブランチBに移動し、DDLを実行すると、正常にDDLが実行されます。

実際にやってみました。

```
% bin/rails db:rollback STEP=1== 20210108102934 CreateActiveStorageTables: reverting ========================-- drop_table(:active_storage_variant_records)   -> 0.0028s-- drop_table(:active_storage_attachments)   -> 0.0011s-- drop_table(:active_storage_blobs)   -> 0.0009s== 20210108102934 CreateActiveStorageTables: reverted (0.0105s) ===============# テーブルが破棄され、schema.rbに変更が加えられる。
```

$1ファイル自体は削除されないんですが、DBの`schema_migration`から該当の$1ファイルのレコードが削除されることで、pending判定にはかかりません。  
`schema.rb`が変更されているので、`git stash`して、ブランチBにうつります。

```
% bin/rails db:migrate== 20201122075737 CreateActiveStorageTables: migrating ========================-- create_table(:active_storage_blobs)   -> 0.0033s-- create_table(:active_storage_attachments)   -> 0.0030s== 20201122075737 CreateActiveStorageTables: migrated (0.0065s) ================= 20201227052520 AddServiceNameToActiveStorageBlobs: migrating ===============-- column_exists?(:active_storage_blobs, :service_name)   -> 0.0016s-- add_column(:active_storage_blobs, :service_name, :string)   -> 0.0011s-- change_column(:active_storage_blobs, :service_name, :string, {:null=>false})   -> 0.0153s== 20201227052520 AddServiceNameToActiveStorageBlobs: migrated (0.0337s) ======== 20201227052521 CreateActiveStorageVariantRecords: migrating ================-- create_table(:active_storage_variant_records)   -> 0.0029s== 20201227052521 CreateActiveStorageVariantRecords: migrated (0.0031s) =======
```

正常に$1を実行することができました🎉  
（見せられないですが、別のテーブルに作成していたデータもそのまま残っています）

## おまけ1：bin/rails db:migrate:reset と bin/rails db:resetの違い

どちらもDBや$1を一度削除するのは同じですが、再作成に用いるファイルが異なります。

- `bin/rails db:migrate:reset`：$1ファイルをすべて再実行し、DBを再作成します。
- `bin/rails db:reset`：`schema.rb`を実行し、DBを再作成します。

`schema.rb`に変更が適用されていない$1ファイルがある場合、意図したとおりのDBにならない可能性があります。  
そういった点で`bin/rails db:reset`は`bin/rails db:migrate:reset`よりも、強力なリセットと言えるでしょう。

今回のケースではブランチBの内容さえ使えればいいので、`bin/rails db:reset`で十分です。

## おまけ2：$1の状況確認のために、覚えておくと良さそうなコマンド

- `bin/rails db:version`：現在の実行済みの$1のバージョンを表示します。

```
% bin/rails db:versionCurrent version: 20210108102934
```

- `bin/rails db:migrate:status`：$1の実行状況を、バージョンID、$1名とステータスで一覧表示します。

```
% bin/rails db:migrate:statusdatabase: db/development.sqlite3 Status   Migration ID    Migration Name   up     20201121230730  Create books   up     20201121231228  Add author to books   up     20201121231845  Add picture to books   up     20201122003800  Devise create users   up     20201122011641  Add name and postal code and address and self introduction to users   up     20201122065204  Add omniauth to users  down    20201122075737  Create active storage tablesactive storage  down    20201227052520  Add service name to active storage blobsactive storage  down    20201227052521  Create active storage variant recordsactive storage   up     20210108102934  ********** NO FILE **********
```

ステータスは、upが適用済み、downが未適用です。  
この実行結果はブランチBで実行しているので、3つの$1が未実行、最新の$1ファイルがブランチAにしかないので`********** NO FILE **********`となっています。

## おまけ3：bin/railsするべきか

この記事では、すべてのコマンドを`bin/rails`で記載しており、実際に使用しているコマンドもその形式です。

`bin/rails`を使用する理由は、Springを使用して高速にコマンドを実行するため、なのですが残念ながら`bin/rails db...`系のコマンドはSpringが起動しないので関係ありません。

コマンドによってSpringが起動したりしなかったりする+つけても実害はないので、忘れないようにすべて`bin/rails`の形で記載しています。  
なので例えば`bin/rails db:reset`は`rails db:reset`でも問題ありません。

## 参考

- [独習Ruby on Rails](https://www.amazon.co.jp/dp/B07QW41QCM/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)
- FJORD BOOT CAMPのQ&A
