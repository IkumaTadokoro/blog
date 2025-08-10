---
title: .env.developmentからdirenvで読み込む用の.envrcを作成するワンライナー
draft: false
publishDate: 2023-10-15
category: tech
tags:
  - direnv
  - .env
---

## ベースとなる環境変数ファイルから、direnv用のファイルを一発で作りたい

環境変数のベースとなるファイルを`.env.development`やらで作成しておき、実際の値は.gitignoreに記載された.envなどのファイルを各開発者のローカルで編集する、といった運用はよくある。

プロジェクトだけで使う環境変数をグローバルにexportするのもアレなので、こういった時には[direnv](https://direnv.net/)が使える。しかし

- .env.developmentは`HOGE=foo`形式で記述されている
- .envrc（direnvの読み込みファイル）は`export HOGE=foo`で記述する

という時に、単純に`cp .env.development .envrc`とするだけでは動かない。

とはいえ全部に手でexportをつけるのもだるいのでワンライナーだとどうやるのか少しばかり試行錯誤してみた。

## 結論

```bash
awk '{if (NF > 0 && $0 !~ /^#/) print "export " $0; else print $0}' .env.development > .envrc
```

## 解説

解説というほどの大きなスクリプトでもないが、小さな心配りを説明する。

- `NF > 0`: Number of fieldsが0より大きい、つまり非空行のみを対象にする。環境変数のグループを明示的にするために空行があったりする場合にexportだけが残らないようにする心配り。
- `$0 !~ /^#/`: `#`から始まらない、つまりコメント行でない行を対象にする。

```bash
HOGE=foo
FUGA=bar

# animals
TAMA=cat
POCHI=dog
```

例えば上記の.env.developmentから次の.envrcが生成される。

```bash
export HOGE=foo
export FUGA=bar

# animals
export TAMA=cat
export POCHI=dog
```
