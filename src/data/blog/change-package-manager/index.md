---
title: このブログのパッケージマネージャを pnpm に変更した
publishDate: 2024-04-27T16:35:32.000+09:00
category: tech
draft: false
description: npm から pnpm に移行しました。実行がかなり早くなったので、大変満足です。
tags:
  - tools
---
## pnpm へ移行

もともとこのブログのリポジトリでは npm を使っていましたが、他の箇所では pnpm や bun を使っていることもあり、速度に不満があったため pnpm に移行しました。

## 移行手順

1. pnpm のインストール

```bash
npm install -g pnpm
```

2. 既存の node_modules の削除

```bash
rm -rf node_modules
```

3. package-lock.json の削除

```bash
rm package-lock.json
```

4. package のインストール

```bash
pnpm install
```

## 補足： pnpm コマンドのみを許可する

package.json に以下の設定を追加することで、npm や yarn コマンドを使わないようにできます。

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

なお [only-allow](https://github.com/pnpm/only-allow) は特定のパッケージマネージャのみを許可するパッケージです。

実際のところ、コマンド実行時は [azu/ni.zsh: Alternative \`ni\` written in zsh: npm/yarn/pnpm/bun with the same command](https://github.com/azu/ni.zsh) を使用しているので間違えることもないですが...。
