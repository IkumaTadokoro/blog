---
title: "ブログ用のコマンド試作その1"
description: "過去ブログからの移行記事"
publishDate: 2022-05-27

tags: []
draft: false
---


雑に投稿するためのコマンドを作ってみた。ファイルがなければmarkdownファイルと画像格納用のディレクトリを作成し、ファイルがあればmarkdownファイルを開く。

```bash
#!/bin/bash

if [ -e ~/blog/_posts/$1.md ]; then
    vim ~/blog/_posts/$1.md
else
    cp ~/bin/template.md ~/blog/_posts/$1.md
    mkdir ~/blog/public/blog/$1
fi
```

あまりにも雑すぎるけど、これでどこにいてもターミナル上でささっとブログがかける。

[1日1問、半年以内に習得 シェル・ワンライナー160本ノック：書籍案内｜技術評論社](https://gihyo.jp/book/2021/978-4-297-12267-6)をみてシェルスクリプトに親しむか、もはやzxを使ってTypeScriptで書いた方がよさそう。
