---
title: Go におけるツールの依存関係を追跡できるようにする
publishDate: 2024-04-30T22:28:33.000+09:00
category: tech
draft: false
description: tools.go ファイルを作成し、そこで依存関係を追跡するツールをインポートすることで、Go におけるツールの依存関係を追跡できるようにします。
tags:
  - Go
  - Today I Learned
author: ikuma-t
---
## 解決したい課題

gqlgen のように、ツールとしては確かにプロジェクトで使用しているけれども、アプリケーションのコードベースに出てこないパッケージを利用するケースがあります。

このようなツールは `go mod tidy` を実行した際に、import されていないため、module が消えてしまいます。

## 解決策

`tools.go` ファイルを作成し、そこで依存関係を追跡するツールをインポートすることで、Go におけるツールの依存関係を追跡できるようにします。
具体的には以下のような `tools.go` を作成します。

```go
//go:build tools
// +build tools

package tools

import (
    _ "github.com/99designs/gqlgen"
    _ "github.com/99designs/gqlgen/graphql/introspection"
)
```

このファイルで import が実行されているため、`go mod tidy` を実行してもツールの依存関係が消えることはありません。
また `//go:build tools` を記載することで、このファイルは `go build` などのビルド時には無視されるようになります。

`// +build tools` は、このファイルが `tools` というビルドタグを持つことを示しています。

## 参考

https://go.dev/wiki/Modules#how-can-i-track-tool-dependencies-for-a-module
