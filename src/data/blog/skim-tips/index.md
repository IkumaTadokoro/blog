---
title: skim で移動/コマンド履歴検索をインタラクティブに行う
publishDate: 2024-05-02T20:34:51.000+09:00
category: tech
draft: false
description: Rust製の Fuzzy Finder である skim で移動/コマンド履歴検索をインタラクティブに行う方法を調べました。
tags:
  - tools
  - skim
  - Today I Learned
author: ikuma-t
modDatetime: 2024-05-02T20:34:51.000+09:00
featured: false
---
## モチベーション

新しく M3 Macbook Air を購入したので、これを機に色々とツールを乗り換えています。

Fuzzy Finder にはこれまで peco を使っていたのですが、全部 Rust 製に統一したいという思いがあり、skim に乗り換えました。

乗り換えたはいいのですが、キーバインドやコマンドの設定を怠っており活用できていなかったので、調べて設定してみた、というのがこの記事の内容です。

## zoxide の絞り込みに skim を使う

https://github.com/ajeetdsouza/zoxide

zoxide には標準で `zi` というエイリアスが設定されており、これを使うことでインタラクティブにディレクトリを選択できます。
しかし内部的には `fzf` が使われており、そのままだと `fzf` もインストールしなければなりません。

これを `skim` で使うための設定が以下の Issue で提案されていました。

https://github.com/ajeetdsouza/zoxide/issues/228

```bash
function __zoxide_zi() {
    \builtin local result
    result="$( \
        zoxide query -ls -- "$@" \
        | sk \
            --delimiter='[^\t\n ][\t\n ]+' \
            -n2.. \
            --no-sort \
            --keep-right \
            --height='40%' \
            --layout='reverse' \
            --exit-0 \
            --select-1 \
            --bind='ctrl-z:ignore' \
            --preview='\command -p ls -F --color=always {2..}' \
        ;
    )" \
        && __zoxide_cd "${result:7}"
}
zle -N __zoxide_zi
setopt noflowcontrol
bindkey '^z' __zoxide_zi
```

通常のシェルインテグレーションと同様に、`__zoxide_zi` 関数を定義し、`zoxide query` でディレクトリを取得し、`sk` で選択するようにしています。

https://github.com/ajeetdsouza/zoxide/blob/main/templates/zsh.txt#L69-L73

## 履歴検索を skim で行う

最適かは分かりませんが、履歴検索を `skim` で行う設定を以下のようにしました。

```bash
function hist() {
    BUFFER=$(history -n -r 1 | sk --query "$LBUFFER" --reverse)
    CURSOR=$#BUFFER
    zle reset-prompt
}
zle -N hist
bindkey '^r' hist
```

## zle、bindkey is 何？

Zsh Line Editor の略で、Zsh のコマンドライン編集機能を提供します。
ターミナル上の文字列やカーソル位置をシェルスクリプト上で操作するための機能のようです。

今回出てくる `-N` オプションは、新しく関数をバインドするためのオプションです。

> -N new-keymap [ old-keymap ]
> Create a new keymap, named new-keymap. If a keymap already has that name, it is deleted. If an old-keymap name is given, the new keymap is initialized to be a duplicate of it, otherwise the new keymap will be empty.

`bindkey` は、キーバインドを設定するためのコマンドです。指定したキーに対して、指定した関数をバインドします。

https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html

## 参考

https://speakerdeck.com/naoya/sierunolu-li-toikunrimentarujian-suo-woshi-u

https://k-koh.hatenablog.com/entry/2020/10/24/160323

https://www.rasukarusan.com/entry/2020/04/19/193450
