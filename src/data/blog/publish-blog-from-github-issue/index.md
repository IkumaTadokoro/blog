---
title: GitHub Issue から Markdown ファイルを生成してブログ記事を公開する
publishDate: 2024-04-28T17:27:11.000+09:00
category: tech
draft: false
description: GitHub Issue の作成をトリガーにブログ記事を公開する方法を紹介します。
tags:
  - tools
  - GitHub
  - GitHub CLI
  - GitHub Actions
author: ikuma-t
modDatetime: 2024-04-28T17:27:11.000+09:00
featured: false
---
## モチベーション

このブログは Astro を用いて実装されており、記事は Markdown ファイルとして管理されています。基本的に PC で作業しているのでこの形式でも問題はないのですが、たまにスマホから記事を書きたいと思うことがあります。

しかしながら記事は GitHub 上の Markdown ファイルとして管理されているため、スマホで書くにはやや面倒です。特に YAML フロントマターは PC 上では VSCode のスニペットにより簡単に挿入できるのですが、スマートフォンではそうもいきません。

## GitHub Issue から Markdown ファイルを生成する

そこで、GitHub Issue から Markdown ファイルを生成する方法を考えました。

Markdown で管理することを前提として、スマホでも書きやすくするための選択肢としては次のようなものが考えられます。

1. GitHub Issue から Markdown ファイルを生成する
2. CodeSpaces を利用して、ブラウザ上で記事を編集する
3. 記事作成用の Web アプリを作成する

今回はお手軽に実施したかったことと、CodeSpaces をスマホで触るのは体験としてやや無理がったので、GitHub Issue から Markdown ファイルを生成する方法を選択しました。

## 実装

### 全体の構成

1. GitHub Issue を作成する（Issue テンプレートとして、ブログのテンプレを用意しておく）
2. GitHub Actions で ラベルが付与されたことをトリガーに GitHub Actions を実行する
   1. ラベルを検知し、`publish` が付与されていれば後続の処理を実行する
   2. Issue の内容から Markdown ファイルを生成する
   3. Issue の内容を元に Markdown ファイルを生成し、新たにブランチを作成する
   4. プルリクエストを作成する
   5. 対象となった Issue にプルリクエストを紐付け、Issue を Close する
3. Cloudflare Pages　のプレビューが走るため、プレビューする
4. 問題なければマージし、記事が公開される

### GitHub Actions の ワークフロー

GitHub Actions のワークフローは次のようになります。

```yaml
name: publish content from GitHub Issue

on:
  issues:
    types: [labeled]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check issue labels
        if: contains(github.event.issue.labels.*.name, 'publish') != true
        run: exit 0
      - name: Define title
        id: define_title
        run: |
          title=$(echo "${{ github.event.issue.title }}" | sed -r 's/([a-z0-9])([A-Z])/\1-\2/g; s/ /-/g' | tr '[A-Z]' '[a-z]')
          echo "title=$title" >> $GITHUB_OUTPUT
      - name: Create Content File
        run: |
          echo -e "${{ github.event.issue.body }}" | sed -e "s/publishDate:/publishDate: $(TZ=-9 date -Iseconds)/" | sed -e "s/modDatetime:/modDatetime: $(TZ=-9 date -Iseconds)/" >> src/content/blog/${{ steps.define_title.outputs.title }}.md
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Commit Content File
        uses: EndBug/add-and-commit@v9
        with:
          new_branch: ${{ steps.define_title.outputs.title }}
      - name: Create PullRequest
        run: gh pr create --title "${{ github.event.issue.title }}" --body "#${{ github.event.issue.number}}" --base main --head ${{ steps.define_title.outputs.title }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Close Issue
        run: gh issue close ${{ github.event.issue.number }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Issue テンプレート

Issue を起点に作成するので、テンプレートも用意しておきます。

```md
---
name: blog
about: create blog draft
title: ""
labels: ""
assignees: ""
---

## <!-- Issueタイトルはslugとして使用。時刻は埋めなくて良い -->

author: ikuma-t
publishDate:
modDatetime:
title:
featured: false
draft: false
tags:

- description:

---

##
```

Issue テンプレート自体の YAML フロントマターと衝突するため、やむを得ず一行コメントを挟んでいます。

### ショートカットの追加


![代替テキスト](image)

MacroDroid を使って、メニュー部分に「ブログを追加」ボタンを設置します。

Issue Template はクエリパラメータで設定できるので、その URL を登録しておきます。


![代替テキスト](image2)

GitHub Mobile がインストール済みであれば、ブラウザではなくこちらで Issue を作成することができます。

Web 版よりも Markdown エディタが使いやすく便利です。

## おわりに

GitHub Issue から Markdown ファイルを生成する方法を紹介しました。

画像の挿入には対応していないものの、比較的お気軽に記事を投稿できるようになり満足です。
