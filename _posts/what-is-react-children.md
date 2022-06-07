---
title: "Reactのchildrenとはなにか"
date: "2022-06-07 22:06:37"
---

## 要約

Reactの`children`は`props`が保持しているプロパティです。親コンポーネントのタグに入れられた要素を参照します。

## Reactナニモワカラナイ

いままでVueとVanila JSしか触ってこなかったので、現在TypeScriptとReactのキャッチアップをしているのですが、まずはTypeScriptに時間を割いているためReactはちょっと後回し気味です（のわりにDenoやってるやんけワレ）。一応チュートリアルくらいはやっています。

いやでもReact と TSが目につくようにこのブログはNext.js + TypeScriptで作成しているのですが、カスタマイズにあたってReactの初歩的な知識でつまづいたのでまとめます。

## Reactのchildren
### 対象バージョン

- React v18.0

### 意味

Reactの`children`は`props`が保持しているプロパティです。親コンポーネントのタグに入れられた要素を参照します。

例えばこのブログでは共通レイアウトを`Layout`コンポーネントで定義しています。

```typescript
type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
```

`Layout`コンポーネントは各所で使用されており、一例としてブログのトップページを示す`pages/index.tsx`では次のように呼び出されています。

```typescript
const Index = ({ allPosts }: Props) => {
  const morePosts = allPosts
  return (
    <>
      <Layout>
        <Head>
          <title>ikuma-t</title>
        </Head>
        <Container>
          <Intro />
          {<MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}
```

この時、`<Layout>` ~ `</Layout>`の間の部分が`children`となります。

```typescript
        <Head>
          <title>ikuma-t</title>
        </Head>
        <Container>
          <Intro />
          {<MoreStories posts={morePosts} />}
        </Container>
```

`Layout`コンポーネントでは最終的に次のような内容が描画されます。

```typescript
    <div>
      <Meta />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
	  {// ここからchildrenの内容が描画されている}
          <Head>
            <title>ikuma-t</title>
          </Head>
          <Container>
            <Intro />
            {<MoreStories posts={morePosts} />}
          </Container>
	  {// ここまでchildrenの内容が描画されている}
        </main>
        <Footer />
      </div>
    </div>
```

### childrenの型

先のサンプルコードの通り、`children`の型は`React.ReactNode`です。
どうもv18から仕様が変わったようで、明示的に型を指定していない状態で`props.children`を使用すると、エラーになるようになったそうです。

参考：https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-typescript-definitions

---

おわり
