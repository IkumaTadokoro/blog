---
title: "chezmoiの変更をClaude Codeにコミットさせる"
publishDate: 2026-01-11
category: tech
tags: ["chezmoi", "claude code", "dotfiles"]
draft: false
description: "chezmoiでdotfilesを管理している場合にコミットをするのが面倒なので、Hooks機能を使って、Claude Codeに変更を管理させます"
---

[chezmoi](https://www.chezmoi.io/)でdotfilesを管理しています。

chezmoiでは変更に対して自動でコミットを行うことができ、これまでは`autoCommit`をtrueにすることで、自動コミットを起動させ、自分でコミットメッセージを入力していました。


```toml
[git]
    autoCommit = true
    autoPush = false
    commitMessageTemplate = "{{ promptString \"Commit message\" }}"
```

dotfilesは頻繁に変更が入るのでコミットメッセージを書くのが面倒です。また内容もアプリケーション開発よりも自明なものが多く、自分がコミットメッセージを入力する必要はなおのことないと思い、コミットの入力をClaude Codeに移譲することにしました。

chezmoi の [Hooks](https://www.chezmoi.io/reference/configuration-file/hooks/) 機能を使って、変更時に事前に登録しておいたコミット処理を起動します。この場合コミット処理は Claude Code に移譲するため `autoCommit` は不要になります。

```toml
[git]
    autoCommit = false
    autoPush = false

[hooks.add.post]
    command = "bash"
    args = ["-c", "cd ~/.local/share/chezmoi && claude -p \"/commit\""]

[hooks.edit.post]
    command = "bash"
    args = ["-c", "cd ~/.local/share/chezmoi && claude -p \"/commit\""]
```

なお `-p` は print オプション。これにはスラッシュコマンドも渡せるので、コミットを行うコマンドなりを渡してやれば良いというわけです。

これで変更反映時に自動で Claude Code によるコミットが実行されるようになりました。
