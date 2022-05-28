---
title: 'type-challenges 1日目'
date: '2022-05-28 18:06:00'
---

## 問題 & 回答

[type\-challenges/README\.ja\.md at main · type\-challenges/type\-challenges](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.ja.md)

- `Pick<T, K>`：Utility Typesの一つ。既に存在する`T`型の中から`K`で選択した一部のプロパティのみを含んだ新たな型を構築する。
- これを独自に実装すると次のような形式になる

```typescript
type MyPick<T, K extends keyof T> = { [S in K]: T[S] }
```

## 調べたこと
### ルックアップ型

`定義済みの型["キー"]`とすることで、指定したキーに対応する型を取り出すことができる。

```typescript
type Todo = {
  id: number
  title: string
  comment: string
}

// キー`id`の型`number`を取得する
type Id = Todo['id']

const id: Id = '1' // TS2322: Type 'string' is not assignable to type 'number'.
```

### `keyof`演算子

オブジェクトの全てのキーを、文字列リテラル型のUnion型として取得する。

```typescript
type Todo = {
  id: number
  title: string
  comment: string
}

type TodoKeys = keyof Todo // type TodoKeys = "id" | "title" | "comment"
```

###  マップ型（`mapped type`）

オブジェクトのキーの型と値の型をマッピングするための方法。
どの値の型がどのキーの名前に対応するかを制約できる

```typescript
// P：Parameter（引数型）
// K：Constraint（制約型）
// T：Template（テンプレート型）
{  [P in K]: T}
```

ここまでの内容を踏まえると次のようになる。

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyPick<T, K extends keyof T> = { [S in K]: T[S] }

// { 'title': string, 'completed': boolean }
// keyofを使用しているので、`contents`とかTodoにないキーを指定するとエラーになる
type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

## 感想
初日から全然とけなかったんですが...。型を理解するためにこれを始めたので、根気強くやっていきたいと思います！
