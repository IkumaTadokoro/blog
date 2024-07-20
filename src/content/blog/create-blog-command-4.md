---
title: "ブログ用のコマンド試作その4"
description: "過去ブログからの移行記事"
publishDate: 2022-06-05

tags: []
draft: false
---


https://ikuma-t.work/posts/create-blog-command-3

前回の時点ではただファイルを生成するシェルスクリプトでしたが、今回思い切って一気に色々機能を追加しました。

というわけでできたものがこちら。

https://github.com/IkumaTadokoro/blog-cli

![](/blog/create-blog-command-5/blog_command.gif)

もともとRubyで書いていてThor gemで作ろうと思っていたのですが、インタラクティブなものを作るのが大変そうだったのと、2日前くらいから「Denoってなんかいいな」と思い始めたので、途中からDenoに切り替えて実装しました。
各機能を順番に紹介していきます。

## 実装

```bash
❯ deno --version
deno 1.22.2 (release, x86_64-apple-darwin)
v8 10.3.174.6
typescript 4.6.2
```

Third PartyにはcliffyというCLI用のフレームワークを使用しているのみです。

https://cliffy.io/

:::alert
追記: 嘘をつきました。[frontmatter@v0\.1\.4 \| Deno](https://deno.land/x/frontmatter@v0.1.4/mod.ts)も使っていました。
:::

## 機能一覧

```bash
❯ blog -h

  Usage:   blog
  Version: 0.1.0

  Description:

    ✍️ CLI tool for my blog: https://ikuma-t.work

  Options:

    -h, --help     - Show this help.
    -V, --version  - Show the version number for this program.

  Commands:

    completions  - Generate shell completions.
    list         - List the last 5 articles
    open         - Open blog in browser
    config       - Config BLOG_PATH
    new          - Create new article
    edit         - Edit article in editor.
```

## 各機能紹介
### 設定: `config`

```bash
❯ blog config 
 ? 記事の格納ディレクトリを指定してください > path
 設定が完了しました
```

```bash
❯ blog config -h

  Usage:   blog config
  Version: 0.1.0

  Description:

    Config BLOG_PATH

  Options:

    -h, --help  - Show this help.
```

設定用のコマンドです。ブログ記事のあるパスを雑にJSONファイルにして保存しています。

### 補完：`completions`

![](/blog/create-blog-command-5/completions.gif)

```bash
❯ blog completions -h

  Usage:   blog completions
  Version: 0.1.0

  Description:

    Generate shell completions.

    To enable shell completions for this program add the following line to your ~/.bashrc or similar:

        source <(blog completions [shell])

        For more information run blog completions [shell] --help

  Options:

    -h, --help  - Show this help.

  Commands:

    bash  - Generate shell completions for bash.
    fish  - Generate shell completions for fish.
    zsh   - Generate shell completions for zsh.
```

cliffyのビルトインコマンドの1つで、各シェルの補完機能を提供します。

https://cliffy.io/docs@v0.24.2/command/build-in-commands#completions-command

私の場合はzshを使っているので、`.zshrc`あたりに

```bash
source <(blog completions zsh)
```

と書いてあげることで、自動的に補完が使用できるようになります。

### ブログを開く： `open`

```bash
❯ blog open -h

  Usage:   blog open
  Version: 0.1.0

  Description:

    Open blog in browser

  Options:

    -h, --help  - Show this help.
```

ブラウザでブログを開きます。

### 一覧: `list`

```bash
❯ blog list -h

  Usage:   blog list
  Version: 0.1.0

  Description:

    List the last 5 articles

  Options:

    -h, --help  - Show this help.
    -a, --all   - List all articles instead of the last 5 articles
```

デフォルトでは最新の記事5件を取得します。`-a`オプション指定時には全て取得します。

表示するのは左から、

- ファイル名
- 記事名（YAMLフロントマターから取得）
- 投稿日（YAMLフロントマターから取得）

です。

```bash
┌─────────────────────────────┬─────────────────────────────────────┬─────────────────────┐
│ name                        │ title                               │ published_at        │
├─────────────────────────────┼─────────────────────────────────────┼─────────────────────┤
│ join-mdn-translate-event.md │ MDNドキュメントの翻訳に参加                 │ 2022-06-18          │
├─────────────────────────────┼─────────────────────────────────────┼─────────────────────┤
│ sample.md                   │ サンプルの記事                           │ 2022-06-05 22:06:58 │
├─────────────────────────────┼─────────────────────────────────────┼─────────────────────┤
│ create-blog-command-4.md    │ ブログ用のコマンド試作その4                   │ 2022-06-05 21:06:49 │
├─────────────────────────────┼─────────────────────────────────────┼─────────────────────┤
│ type-challenge-push.md      │ type-challenge 9日目: 3057-Push     │ 2022-06-05 15:06:43 │
├─────────────────────────────┼─────────────────────────────────────┼─────────────────────┤
│ type-challenge-unshift.md   │ type-challenge 10日目: 3060-Unshift │ 2022-06-05 15:06:11 │
└─────────────────────────────┴─────────────────────────────────────┴─────────────────────┘
```

出力はcliffyのTableを使用しています。

https://cliffy.io/docs@v0.24.2/table

日本語が全体的にダメで、ちょっとずれてしまっているんですが、実害がないので無視しています。

### 新規作成: `new`

![](/blog/create-blog-command-5/new.gif)

```bash
❯ blog new -h

  Usage:   blog new
  Version: 0.1.0

  Description:

    Create new article

  Options:

    -h, --help  - Show this help.
```

タイトルとファイル名を指定して記事を作成します。

cliffyのInput promptにはlocal storageもしくは配列を使用して入力値をサジェストできる機能があります。

https://cliffy.io/docs@v0.24.2/prompt/types/input#auto-suggestions

シリーズものの記事を書く際に、以前の回の記事名などを参照することがあるので、過去記事を配列につっこんでカーソルキーで候補が出るようになっています。

### 編集: `edit`

![](/blog/create-blog-command-5/edit.gif)


```bash
❯ blog edit -h

  Usage:   blog edit
  Version: 0.1.0

  Description:

    Edit article in editor.

  Options:

    -h, --help              - Show this help.
    -e, --editor  <editor>  - Choose your editor. Default is vim  (Default: "vim")
```

ファイルを指定して編集します。エディタはオプションで指定できるのですが、デフォルトはvimです（たまに`mi`で登録しているRubyMineで編集することがあります）。

cliffyのSelect promptにファイル名を投げて選択しているのですが、便利なのが`enable-search-input`です。`search: true`を指定することで、インクリメンタル検索ができるようになります。これはとても嬉しい...!

https://cliffy.io/docs@v0.24.2/prompt/types/select#enable-search-input

## 感想

とりあえず作ってみたんですが、候補から選択できるのがかなり便利ですね。
これを作成する前は、似たような記事を一度別で開いてコピーして...みたいなことをやっていたので、生産性めちゃくちゃ上がりました。

Denoはこれの前に練習として、deno-jpsumという、ダミー文作成メーカーLorem JpsumをCLI化したものを作っていましたが。

https://github.com/IkumaTadokoro/deno-jpsum

が、まだ仕様があまり頭に入っていないのと、そもそもTypeScript自体を最近始めたので、全体的にコードがお粗末です...。

とはいえ、Denoは標準でFormatterやLinterを提供しているし、TypeScriptも設定なしで使えるし、cliffyは多機能だし、CLIツールの開発体験としては非常によかったです。

今後もDenoやっていくぞ！
