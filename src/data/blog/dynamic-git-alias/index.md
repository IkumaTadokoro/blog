---
title: スペースなしのGitエイリアスを設定する
description: 動的にエイリアスを設定することでスペースなしでgitコマンドを入力できます。
publishDate: 2025-08-10
draft: false
category: tech
tags:
  - Git
  - zsh
---

## Git のエイリアス

自分の環境では、`git` に対して zsh で `g` を割り当て、各 git コマンドに対して gitconfig でエイリアスを設定しています。

```bash title=".zshrc"
alias g = "git"
```

```bash title="~/.config/git/config"
[alias]
	# [Basic Snapshotting]
	a = add
	e = commit --amend --no-edit
	s = status -s
	c = commit -m
	fix = commit --fixup
	fixup = "!f() { git fix \"$1\" && git ria \"$1^\"; }; f"
	r = restore
	rs = restore --staged
	z = reset --soft HEAD^
	zs = reset --soft
	zh = reset --hard	
	
	# [Branch and Merging]
	b = branch
	co = checkout
	sw = switch
	swc = switch -c
	m = merge
	t = stash
	ta = stash --apply
	tp = stash pop
	td = stash drop
	tag = tag
	w = worktree

	#[Sharing and Updating Projects]
	f = fetch
	pl = pull
	p = push
	pf = push --force-if-includes --force-with-lease
	remote = remote

	# [Inspection and Comparison]
	d = diff
	ds = diff --staged
	l = log
```

たとえば commit であれば `g c` で実行できるわけですが、毎回スペースを追加するのは面倒です。かといって、各コマンドごとにスペースを含まないエイリアス（コミットの例であれば、`gc='git commit'`）を都度貼るのは非効率です。

## スペースなし版エイリアスを自動で設定する

```bash title=".zshrc"
if command -v git >/dev/null 2>&1; then
  for alias in $(git config --get-regexp '^alias\.' | sed 's/^alias\.\([^ ]*\) .*/\1/'); do
    alias g${alias}="git ${alias}"
  done
fi
```

`git config --get-regexp` で正規表現に一致した gitconfig の内容を取得できるので、これを使って動的にエイリアスを貼ります。

これで次のようにスペースなしで git コマンドを実行できるようになります。

```bash
❯ alias gc
gc='git c'
```
