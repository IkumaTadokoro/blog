---
title: GraphQLの「Serving over HTTP」とは何か
draft: false
publishDate: 2024-05-03
category: tech
tags:
  - GraphQL
  - Today I Learned
---

## サマリ

- モダンな Web アプリケーションフレームワークは、HTTPを用いてやり取りを行い、ミドルウェアを利用して認証やリクエストの検証、変換を行うパイプライン型のアーキテクチャを採用している
- GraphQL においても、事前に認証・検証が行われた上でリクエストを処理するのがベストプラクティス
- そのために、GraphQL のリクエストを REST のような形式でマッピングして処理する

## Serving over HTTP

https://graphql.org/learn/serving-over-http

GraphQL サーバは GET と POST の 2 種類の HTTP リクエストをハンドリングできるようにします。

マッピングされるパラメータは次のとおりです。

| パラメータ    | 意味                                                           | 必須 |
| ------------- | -------------------------------------------------------------- | ---- |
| query         | クエリそのもの                                                 | 必須 |
| variables     | クエリの変数                                                   | 任意 |
| operationName | クエリの名前。複数のオペレーションを同時に実行する場合には必須 | 任意 |

### GET

GET リクエストでは、GraphQL Query が `query` というクエリパラメータにマッピングされます。

```graphql title="hero.graphql"
query HeroQuery($id: ID!) {
  hero(id: $id) {
    name
  }
}
```

このクエリは、次のようにエンコードされます。

```bash wrap
http://myapi.com/graphql?query=query($id: ID!){hero($id: ID!){name}}&operationName=HeroQuery&variables={"id":"avagfads732"}
```

### POST

POST リクエストでは、`application/json` でリクエストを送信する。次の形式の JSON をボディとして送信されます。

```json wrap
{
  "query": "...",
  "variables": "updateHeroName",
  "operationName": { "id": "avagfads732", "name": "Andrew" }
}
```

### レスポンス

レスポンスは JSON 形式で返される。GraphQL の仕様に則り、`data`フィールドか`errors`フィールドが含まれます。

```json wrap
{
  "data": {
    "hero": {
      "name": "Andrew"
    }
  }
}
```

---

```json wrap
{
  "errors": [
    {
      "message": "Cannot query field 'hero' on type 'Query'",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ]
    }
  ]
}
```

## [Draft] Transport Specification / GraphQL over HTTP

ここまでの内容が GraphQL 公式で公開されている内容で、ここから先はまだドラフト段階です。

### 仕様の定義場所

https://graphql.github.io/graphql-over-http/draft/

### 概要

- GraphQL over HTTP は Serving over HTTP の仕様を拡張したもの。
- HTTP サーバは 1 つ以上の URL を介して、GraphQL スキーマへのリクエストを受け付ける必要がある。
- サーバおよびクライアントは、少なくとも JSON の形式でリクエストをサポートする必要がある。
- レスポンスにおける Media Type は `application/graphql-response+json` が推奨。
- サーバは POST リクエストに必ず対応する必要があり、そのほかの GET のようなメソッドも対応する可能性がある。
- サーバはリクエストの処理の成功時にはその結果を、失敗時にはエラーを返す必要がある。
