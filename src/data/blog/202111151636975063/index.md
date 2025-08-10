---
title: "RubyMine2021.2.3でdocker compose環境のRailsを動かしてみる"
publishDate: 2021-11-15 20:17:43
category: tech
draft: false
description: "RubyMine2021.2.3でdocker compose環境のRailsを動かしてみる"
tags:
  - PROGRAMMING
  - Ruby on Rails
  - RubyMine
  - Docker
---
## 動機

昨今の開発において、常識になっているDocker。

私もそろそろ学ばねばということで、書籍を使って概要を掴みました。

[![仕組みと使い方がわかる Docker＆Kubernetesのきほんのきほん (Compass Booksシリーズ)](https://m.media-amazon.com/images/I/51vhRrY-JEL._SL500_.jpg "仕組みと使い方がわかる Docker＆Kubernetesのきほんのきほん (Compass Booksシリーズ)")](https://www.amazon.co.jp/exec/obidos/ASIN/B08T961HKP/hatena-blog-22/)

[仕組みと使い方がわかる Docker＆Kubernetesのきほんのきほん (Compass Booksシリーズ)](https://www.amazon.co.jp/exec/obidos/ASIN/B08T961HKP/hatena-blog-22/)

- 作者:小笠原 種高
- $1

[Amazon](https://www.amazon.co.jp/exec/obidos/ASIN/B08T961HKP/hatena-blog-22/)

Dockerの仕組み、Dockerfile、Docker Composeの基本はわかったけれど、実際にRailsアプリを動かしてみたらどうなるんだろう？と気になっていたところ、RubyMineの公式がDocker Compose環境でRailsを動かすサンプルRailsを公開していたので、Railsアプリの起動までやってみました。

## やること

[チュートリアル: リモートインタープリターとしての Docker Compose | RubyMine](https://pleiades.io/help/ruby/using-docker-compose-as-a-remote-interpreter.html)をやる

サンプル$1：

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2FJetBrains%2Fsample_rails_app" title="GitHub - JetBrains/sample_rails_app: The main sample app for the Ruby on Rails Tutorial, 6th Edition" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [github.com](https://github.com/JetBrains/sample_rails_app)

## やってみる

### まずはgit clone

 ![f:id:ikmbear:20211115164149p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115164149.png) 

 ![f:id:ikmbear:20211115164102p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115164102.png) 

コマンドでも構いませんが、RubyMineを使用しているので、「Get from VCS」からサンプルVCSのURLを設定して、cloneを実施します。

### DB設定をPostgresqlに変更する

cloneした時点ではDB設定がsqlite3になっているようなので、`config/database.yml`を開き、使用するDBを変更します。

 ![f:id:ikmbear:20211115170018p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115170018.png) 

### コンテナを起動する

次に`docker-compose.yml`を開いて、ガターにある矢印アイコンを押します。

 ![f:id:ikmbear:20211115164929p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115164929.png) 

これで`/usr/local/bin/docker-compose -f /Users/tadokoroikuma/RubymineProjects/sandbox/sample_rails_app/docker-compose.yml up -d`というコマンドが実行されます。

つまりは、この`docker-compose.yml`をベースとして、バックグラウンドでサービス（コンテナ）を起動するわけです。  
これでPostgresqlとRubyのコンテナがそれぞれ作成&起動されます。

### Rubyーとして、コンテナ上のRubyを指定する

次にRubyMineに対して、コンテナ上のRubyを参照するように設定します。

 ![f:id:ikmbear:20211115184357p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115184357.png) 

Preferences \> Ruby SDK and Gemsを開き、「+」から「New Remote」を選択します。

 ![f:id:ikmbear:20211115184525p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115184525.png) 

 ![f:id:ikmbear:20211115184601p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115184601.png) 

続いて、Docker ComposeのwebコンテナのRubyを参照するように設定し、「OK」を押します。

### DB作成と$1を行う

次に`rails db:create`と`rails db:migrate`を実施します。  
これに限らずですが、ターミナルからコンテナに入ってコマンドを直接実行する方法と、RubyMineの機能を使って実行する方法の2種類があるので、それぞれ解説します。

**ターミナルからコンテナに入ってコマンドを直接実行する方法**

```
# webコンテナを指定してコマンドを実行する（bashを起動する）$ docker-compose exec web bash # DBの作成を行う（rails db:migrateも同様）$ rails db:createCreated database 'sample_rails_app_db'Created database 'sample_rails_app_db_test
```

**RubyMineの機能を使って実行する方法**

RubyMineのRunAnythingに包含されている、Rake Taskの実行を用いて起動します。  
（rakeタスクのコマンドはrailsコマンドに移管されたのですが、RubyMineの機能を使う場合は、Rakeタスクとして扱う必要があります。というかRailsコマンドで実行しても結局はRakeタスクを叩いているだけなので...）

`^`を2回押して、RunAnythingを呼び出し、`rake --tasks`と入力してEnterで実行します。

 ![f:id:ikmbear:20211115185948p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115185948.png) 

これをしないとどうもDocker環境でRakeタスクが認識できないようで...（これは不便）。

これでRakeタスクが使えるようになったので、RunAnythingから`rake db:create`を実行します（`rake db:migrate`も同様）

 ![f:id:ikmbear:20211115190247p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115190247.png) 

### DBが作成されたか確認する

$1にはありませんが、RubyMineのDBクライアント機能を使って作成されたDBを確認してみましょう。

 ![f:id:ikmbear:20211115190656p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115190656.png) 

まずはDatabaseツールウィンドウを開いて、「+」ボタンからDataSourceとしてPostgreSQLを選択します。

 ![f:id:ikmbear:20211115191120p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115191120.png) 

次に接続に必要な情報を以下の通り設定していきます。

| 項目           | 設定                                                         | 説明                                                                                                                            |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Port           | 54333                                                        | docker-compose.ymlで設定したポート$1ードにもとづき、54333を指定します。 |
| Authentication | User & Password                                              | postgresのコンテナの設定にしたがい、この認証方法を指定します。                                                                  |
| User           | postgres                                                     | database.ymlで定義した内容に従って、postgresを指定します                                                                        |
| Password       | \<空欄\>                                                     | docker-compose.ymlで指定した内容にて、パスワード不要のオプションを設定しているため、空欄にします                                |
| Database       | sample\_rails\_app_db | database.ymlで指定した内容に基づき、この名前のDBへの接続を指定します                                                            |

入力が完了したら、TestConnectionを行い、問題なければOKを押してください。

 ![f:id:ikmbear:20211115191635p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115191635.png) 

うまくいけばこのようにDatabaseの中身を確認することができます。

### Railsアプリケーションの実行

 ![f:id:ikmbear:20211115191735p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115191735.png) 

RAILSの実行対象に「DEVELOPMENT:SAMPLE\_RAILS\_APP」を指定し、再生ボタンを押します。

 ![f:id:ikmbear:20211115191943p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115191943.png) 

ブラウザを開き、`http://0.0.0.0:3000/`にアクセスするとサンプルアプリが起動します。

なおターミナルから実行する場合は以下のようにします。

```
$ docker-compose exec web bash$ bin/rails s -b 0.0.0.0
```

### バインドマウントがされているか確認してみる

後述のdocker-composeの設定で、node_modulesを除くすべてのファイルの変更がコンテナ上に反映されます。  
実際にソースを少し改変して、反映されることを確認してみましょう。

`app/views/static_pages/home.html.erb`を開き、23行目にある内容を書き換えてみましょう。

```
    <h2>      BindMountTest      This is the home page for the      <a href="https://www.railstutorial.org/">Ruby on Rails Tutorial</a>      sample application.    </h2>
```

この状態でアプリをリロードします。

 ![f:id:ikmbear:20211115192819p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115192819.png) 

たしかに内容が変更されていることが確認できました。

## 定義ファイルを確認する

ここまでで実際にRailsアプリを立ち上げることができました。ここからはこの環境を作成した定義ファイルを確認していきたいと思います。

### docker-compose.yml

まずは`docker-compose.yml`からです。

```
version: '3'services:  db:    image: postgres    volumes:      - ./tmp/db:/var/lib/postgresql/data    environment:      POSTGRES_HOST_AUTH_METHOD: trust    ports:      - "54333:5432"  web:    build: .    command: tail -f /dev/null    volumes:      - .:/sample_rails_application      - /sample_rails_application/node_modules    ports:      - "3000:3000"      # Ports required for debugging      - "1234:1234"      - "26166:26168"    depends_on:      - db
```

順番に見ていきます。

```
version: '3'
```

これは使用するDocker Composeのバージョンを指定しているだけです。  
今回はバージョン3を指定しています。

```
services:  db:    # 略  web:    # 略
```

次にservices、つまり使用するコンテナの設定です。今回はdbというコンテナとwebというコンテナの2種類を立てます。  
順を追ってみてみましょう。まずはdbコンテナです。

```
  db:    image: postgres    volumes:      - ./tmp/db:/var/lib/postgresql/data    environment:      POSTGRES_HOST_AUTH_METHOD: trust    ports:      - "54333:5432"
```

以下各定義内容の説明です。

| 定義             | 意味                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image:postgres` | dbコンテナではpostgresqlをイメージとします                                                                                                                                                                                                                                                                                                      |
| `volumes`        | `docker-compose.yml`からみた$1で`var/lib/postgresql/data`が呼び出されたら、ホストの`./tmp/db`に読み取り、書き込みを行います。これによりデータが永続化できます                                                                                                                                                               |
| `environment`    | Postgresqlとして、`POSTGRES_HOST_AUTH_METHOD`を定義し、その値に`trust`を指定します。このオプションはPostgresqlのパスワードが不要になるもので、推奨はされていません（今回は検証用のPostgresqlなので...） |
| `ports`          | ホストのポート54333を5432にポート$1ードします。                                                                                                                                                                                                                                                                                     |

`volumes`の指定は、Dockerの2つある方法のうちの「バインドマウント（Dockerエンジン上ではなく、ホストの指定した箇所に保存する）」の指定で、`:`を境にホスト:コンテナのように指定されています。

参考：[Postgres - Official Image | Docker Hub](https://hub.docker.com/_/postgres)

続いてwebコンテナを確認します。

```
  web:    build: .    command: tail -f /dev/null    volumes:      - .:/sample_rails_application      - /sample_rails_application/node_modules    ports:      - "3000:3000"      # Ports required for debugging      - "1234:1234"      - "26166:26168"    depends_on:      - db
```

こちらも同様に各定義内容の説明です。

| 定義         | 意味                                                                                                                                                                                                                                                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build`      | `docker-compose`から見た$1で`.`つまり、カレント$1リにあるDockerfileをベースにしてコンテナを作成します。                                                                                                      |
| `command`    | コンテナ起動時のコマンドを指定する。`tail -f /dev/null`は何もしないで起動を続けるためのコマンドで、RubyMine側でRailsを起動する際に、コンテナ内でRailsが立ち上がっているとプロセスが重複して起動できなくなることを回避するために、このようにしています。                |
| `volumes`    | 一行目は、コンテナの`./sample_rails_application`に対して、ホストの`.`（カレント$1リ）をバインドマウントしています。2行目はコンテナ上の`node_modules`$1リを名前なしボリュームとしてマウントしています |
| `ports`      | ポート$1ードを定義しています                                                                                                                                                                                                                                                                 |
| `depends_on` | dbコンテナに依存することを定義しています                                                                                                                                                                                                                                                                                                             |

結構ややこしいのが、`node_modules`の名前なしボリュームでのマウントです。  
まず先の通り、手元のソースの反映はバインドマウントによって、すべてコンテナ上と同期されます。  
こうすると、ホスト上とコンテナ上の`node_modules`がそれぞれ同期されてしまうのですが、せっかくコンテナ上で固定したnodeが、ホストによって破壊されることになってしまいます。

そのため、`node_modules`のみはバインドの対象外とするのですが、コンテナが破棄されたのちもデータを永続化するため、DockerEngine上に名前なしボリュームとしてマウントする手段をとっています。

参考：[VSCode&Docker Volumeにおけるnode_modules問題を解決する](https://zenn.dev/foolishell/articles/3d327557af3554)

ここまでに記述した内容でたしかにコンテナが起動しているかは、コマンドでも確認することができますが、RubyMineのServicesタブを使って確認することができます。

 ![f:id:ikmbear:20211115182514p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211115/20211115182514.png) webコンテナのポート$1ード設定を確認

### Dockerfile

つづいて、Dockerfileです。

```
# ruby2.7.2のイメージを使用するFROM ruby:2.7.2# yarnのリポジトリを追加します（apt-key add -は標準入力の内容を追加します。つまりcurlで取得した内容を追加します）RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -# teeコマンドを使ってyarnのAPTパッケージレポジトリを自分のシステムに追加しますRUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list# 必要なパッケージをインストールしますRUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs postgresql-client yarn# RUN CMD ENTRYPOINT ADD COPYの際の作業ディレクトリを`/sample_rails_application`に指定RUN mkdir /sample_rails_applicationWORKDIR /sample_rails_application# 必要な初期設定系ファイルのコピーCOPY Gemfile /sample_rails_application/GemfileCOPY Gemfile.lock /sample_rails_application/Gemfile.lockCOPY package.json /sample_rails_application/package.jsonCOPY yarn.lock /sample_rails_application/yarn.lock# 初期設定系のインストールRUN gem install bundler -v '2.2.15'RUN bundle installRUN yarn install --check-files# イメージに`. /sample_rails_application`の内容を追加するCOPY . /sample_rails_application# ポート3000で通信するEXPOSE 3000
```

このimageを元に、docker-composeのwebコンテナは作成されるようです。

## 感想

素晴らしい書籍のおかげでDockerの基礎を理解できたのはよいものの、実際にRailsアプリを一から起動するとなると、ややハードルが高かったです。  
しかしながら、この$1はすでに出来上がっている$1を使ってアプリを動かすので、その中継点として非常にちょうどいい題材だと思いました。

一点気になったのが、node_modulesはVolumeTrickを使って名前なしボリュームにマウントしているのに、Gemfileはいいのか？というところです。  
なんか同じような類なので、Gemfileもボリュームマウントした方がいい気がするんですが、その話はまた別の機会に調べようと思います。
