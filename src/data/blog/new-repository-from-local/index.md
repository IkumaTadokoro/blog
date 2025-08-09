---
title: 現在のディレクトリから新しいリポジトリを作成する
publishDate: 2024-03-11T21:00:19.000+09:00
category: tech
draft: false
description: gh repo create --<public|private> $(basename $(pwd)) --push -s .
tags:
  - GitHub
  - Git
  - GitHub CLI
author: ikuma-t
modDatetime: 2024-03-11T21:00:19.000+09:00
featured: false
---
何度やっても忘れるのでメモ。

private repository

```sh
gh repo create --private  $(basename $(pwd)) --push -s .
```

public repository

```sh
gh repo create --public $(basename $(pwd)) --push -s .
```

学習用のリポジトリを作成するときに便利。
