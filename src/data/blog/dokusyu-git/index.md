---
title: 独習Gitを読んでみた
draft: false
publishDate: 2021-08-01
category: tech
tags:
  - Git
---



![代替テキスト](image)

## GUIに頼りきりでGitコマンドうろ覚え

RubyMineを使っていると、Git操作はGUIで完結してしまい、ちょっとコマンドが覚えづらいというデメリットがあります（コマンドの概念と便利さを知る分には十分有用です）。

もちろん`git add`、`git commit`といった基本的なコマンドは使えますが、「差分コミットしたい」「一部だけステージから下ろしたい」など、イレギュラー操作はちょっとしたところでもコマンドでやろうとするとググらないといけないレベルです。

そのため、この度独習Gitを購入し、コマンドの習得に励んでみました💪

![dokusyu-git](//images.ctfassets.net/ojolxk47aqpx/4fVEbSzC7mEh0o6X16U4Be/fd3d3fff0ccd4868f40ca3de84d265d4/dokusyu-git.png)

[独習Git（リック・ウマリ 吉川 邦夫）｜翔泳社の本](https://www.shoeisha.co.jp/book/detail/9784798144610)

## 学習方針

先に述べたようにGitコマンド全部がわからないわけではないので、本書に登場する未知（or既知だけれども習熟していない）コマンドだけを、各章にある「この章のコマンド」ページから抜粋します。

## 学習内容
### 3章：Gitに馴染む

- `git config --list`(ショートハンドは`-l`)：すべてのGitの設定値を表示。エイリアスの設定値を確認するのにたまに使うけど、オプションを忘れがち。`git config`だけ実行すると、usageが表示されるので、そこから再実行するのもよし。

### 4章：リポジトリの作り方と使い方

- `git ls-files`：リポジトリにあるファイルをリスト表示する。使い所あるかなあ。

### 6章：ファイルの追跡と更新

- `git commit -a -m "Message"`：git addとcommitを同時に実行する。

```bash
$ git commit --help
#
-a, --all
           Tell the command to automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected.
```

aオプションはallオプションのショートハンドで、変更があったファイルを自動的に追随するようにする内容見たいです。これは結構使い所が多そう。

- `git log --shortstat --oneline`：オプション重ねがけ。`--shortstat`は各コミットで変更されたファイルのリストを一行で表示し、`--oneline`はコミット自体を一行で表示する
- `git add {-n | --dry-run} <変更対象>`：`git add <変更対象>`を実行した際に、どう言ったステージングが実施されるかを表示する。実際にはステージングはされない。
- `git diff`、`git diff --staged`：GUIでやっているとつい忘れがち。前者が作業ツリーとステージングエリアの差分、後者がステージングエリアとリポジトリとの差分を表示する

### 7章：変更箇所をコミットする

- `git rm <ファイル名>`：ステージングエリアからファイルを削除する。作業ツリーに対して削除を実施した場合、それをステージングエリアに反映する必要があるが、このコマンドの場合、直接ステージングエリアのファイルを削除できる。
- `git add -p`：部分的なステージングを実行する。コマンドを実行すると、ステージング対象のハンク（一塊）が、順番に表示される。それぞれに対して、以下のいずれかを指定する。

```bash
Stage this hunk [y,n,q,a,d,K,g,/,e,?]? ?
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
K - leave this hunk undecided, see previous hunk
e - manually edit the current hunk
? - print help
```

※続きは随時更新
