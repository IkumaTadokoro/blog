---
title: "chezmoiの備忘録"
publishDate: 2022-07-18
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
ちょっと設定をいじる時にchezmoiの管理方法をいつも忘れるので書いておく。

https://www.chezmoi.io/#considering-using-chezmoi

## 編集する

### 変更をchezmoi側から追加する

`~.local/share/chezmoi`ディレクトリ内のファイルが編集できる

```bash
chezmoi edit <file>
```

で変更を反映する。

```bash
chezmoi apply
```

### 変更を元ファイル側から追加する

```bash
chezmoi add <file> 
# or
chezmoi re-add
```

こっちの方が使いやすいかも


## Gitに反映する

### ディレクトリ移動して、普通にgit

`chezmoi cd`で chezmoiが管理しているディレクトリに移動することができる

```bash
chezmoi cd
git add .
git commit -m 'commit message'
git push
```

### どこからでもgitを叩く

```bash
chezmoi git add .
chezmoi git -- commit -m 'commit message' # フラグを持つ場合は、`--`で区切る必要がある
chezmoi git push
```

### 自動で変更を反映する

`~/.config/chezmoi/chezmoi.toml`に以下の設定を追加する

```toml
[git]
    autoCommit = true
    autoPush = true
```

## 最新の変更を反映する

```bash
chezmoi update
```

---

忘れる時点で別のツールにした方がいいのかなと思ったりもしたり。
