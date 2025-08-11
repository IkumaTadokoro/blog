---
title: "Nihonbashi.js #9に参加してStorybookの話をしてきた"
publishDate: 2024-11-01
category: idea
draft: false
description: "オフラインで開催されたNihonbashi.js #9に参加しました。LT枠でStorybookの内部実装の話をしてきました。"
tags:
  - 勉強会
  - JavaScript
  - Storybook
---
## Nihonbashi.js #9に参加してきた

[Nihonbashi.js #9 - connpass](https://nihonbashi-js.connpass.com/event/332328/)

2024年11月1日開催のNihonbashi.js #9に参加してきました。

Web Developer Conference以来、2度目のサイボウズさんのオフィスでした。前回行っておいたおかげで迷わずにつけた ... ...。

LT会→懇親会の流れですすみ、懇親会ではStreamについて色々と教えていただいたり、ほかの会社さんの開発組織事情を聞くことができ、おもしろかったです。

今回はLT枠で申し込みさせていただいたので、5分間Storybookについて話してきた内容の詳細をこの記事では記録しておきます。

## LT：いまさらのStorybook

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/0cc1784d5c4a4c8cb4ed0401c4403a76" title="いまさらのStorybook" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

タイトルの「いまさらの」は「みんなもう使っているだろうけど、こっちは業務で使ってひと月だから ... ...」というエクスキューズです。実際話してみると、全員が全員そういうわけでもなかった模様なので、期待値調整は難しいですね。

内容としてはスライドの通り2部構成になっています。

1. Storyで使うTypeScriptの型定義
2. Storybook自体がどのように動くか

スライドの通りではありますが、少しだけ文章で補足します。

## Storyで使うTypeScriptの型定義を読み解く

### Storyの型定義

Storyのファイルを書くと、基本的には次のような形になります。

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```

ここには`Meta`と`StoryObj`の2つの型がありますが、これらはいずれもStorybookが準拠するComponent Story Format 3に必要な属性を規定する型になっています。

### CSF3に必要な属性を定義するBaseAnnotationsインターフェイス

型定義を追っていくと、いずれも最終的には`BaseAnnotations`というインターフェイスをimplementしていることがわかります。

```ts
export interface BaseAnnotations<TRenderer extends Renderer = Renderer, TArgs = Args> {
  /**
   * Wrapper components or Storybook decorators that wrap a story.
   *
   * Decorators defined in Meta will be applied to every story variation.
   * @see [Decorators](https://storybook.js.org/docs/addons/introduction/#1-decorators)
   */
  decorators?:
    | DecoratorFunction<TRenderer, Simplify<TArgs>>[]
    | DecoratorFunction<TRenderer, Simplify<TArgs>>;

  /**
   * Custom metadata for a story.
   * @see [Parameters](https://storybook.js.org/docs/basics/writing-stories/#parameters)
   */
  parameters?: Parameters;

  /**
   * Dynamic data that are provided (and possibly updated by) Storybook and its addons.
   * @see [Arg story inputs](https://storybook.js.org/docs/react/api/csf#args-story-inputs)
   */
  args?: Partial<TArgs>;

  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an arg. These get automatically filled in by Storybook Docs.
   * @see [Control annotations](https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations)
   */
  argTypes?: Partial<ArgTypes<TArgs>>;

  /**
   * Asynchronous functions which provide data for a story.
   * @see [Loaders](https://storybook.js.org/docs/react/writing-stories/loaders)
   */
  loaders?: LoaderFunction<TRenderer, TArgs>[] | LoaderFunction<TRenderer, TArgs>;

  /**
   * Function to be called before each story. When the function is async, it will be awaited.
   *
   * `beforeEach` can be added to preview, the default export and to a specific story.
   * They are run (and awaited) in the order: preview, default export, story
   *
   * A cleanup function can be returned.
   */
  beforeEach?: BeforeEach<TRenderer, TArgs>[] | BeforeEach<TRenderer, TArgs>;

  /**
   * Define a custom render function for the story(ies). If not passed, a default render function by the renderer will be used.
   */
  render?: ArgsStoryFn<TRenderer, TArgs>;

  /**
   * Named tags for a story, used to filter stories in different contexts.
   */
  tags?: Tag[];

  mount?: (context: StoryContext<TRenderer, TArgs>) => TRenderer['mount'];
}
```

https://github.com/ComponentDriven/csf/blob/v0.1.11/src/story.ts#L339

BaseAnnotationsはStorybook側のリポジトリではなく、csfのリポジトリで定義されています。中身としてはいつもStoryを定義している際に使っている属性を含んだ型となっているようです。

### Componentレベル・Storyレベルでの設定を実現するためのMeta型、StoryObj型

MetaとStoryObjは定義する属性としてはほぼ同じですが、設定の粒度が異なります。前者はComponentレベル、後者はStoryレベルの設定を可能にします。

具体的な例として、コンポーネントに渡すargsを実例に、型による設定レベルの切り分けの実際をみていきます。なおサンプルのコンポーネントとしては、Reactで以下のように定義されたButtonコンポーネントを使います。

```ts
type ButtonProps = {
  label: string
  variant?: "solid" | "ghost" | "outline" 
  onClick = () => void
}

const Button: FC<ButtonProps> = ...

const meta = {
  // ...
} satisfies Meta<typeof Button>;

export default meta
type Story = StoryObj<typeof meta>
```

### Meta（Componentレベル）ではコンポーネントのPropsを任意で設定できる

まずStoryレベルのMetaでは、すべてのPropsを任意で指定できるようにしています。Componentレベルはあくまで共通で設定したい場合に使うものであるためです。
具体的な型としては次のような定義になっています。

```ts
/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
type Meta<TCmpOrArgs = Args> = [TCmpOrArgs] extends [ComponentType<any>] ? ComponentAnnotations<ReactRenderer, ComponentProps<TCmpOrArgs>> : ComponentAnnotations<ReactRenderer, TCmpOrArgs>;
```

ここで`TCmpOrArgs`は`typeof Button`なので、`ComponentAnnotations<ReactRenderer, ComponentProps<TCmpOrArgs>>`がかえります。

```ts
interface ComponentAnnotations<TRenderer extends Renderer = Renderer, TArgs = Args> extends BaseAnnotations<TRenderer, TArgs> {
    /**
     * Title of the component which will be presented in the navigation. **Should be unique.**
     *
     * Components can be organized in a nested structure using "/" as a separator.
     *
     * Since CSF 3.0 this property is optional -- it can be inferred from the filesystem path
     *
     * @example
     * export default {
     *   ...
     *   title: 'Design System/Atoms/Button'
     * }
     *
     * @see [Story Hierarchy](https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy)
     */
    title?: ComponentTitle;
    /**
     * Id of the component (prefix of the story id) which is used for URLs.
     *
     * By default is inferred from sanitizing the title
     *
     * @see [Story Hierarchy](https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy)
     */
    id?: ComponentId;
    /**
     * Used to only include certain named exports as stories. Useful when you want to have non-story exports such as mock data or ignore a few stories.
     * @example
     * includeStories: ['SimpleStory', 'ComplexStory']
     * includeStories: /.*Story$/
     *
     * @see [Non-story exports](https://storybook.js.org/docs/formats/component-story-format/#non-story-exports)
     */
    includeStories?: StoryDescriptor$1;
    /**
     * Used to exclude certain named exports. Useful when you want to have non-story exports such as mock data or ignore a few stories.
     * @example
     * excludeStories: ['simpleData', 'complexData']
     * excludeStories: /.*Data$/
     *
     * @see [Non-story exports](https://storybook.js.org/docs/formats/component-story-format/#non-story-exports)
     */
    excludeStories?: StoryDescriptor$1;
    /**
     * The primary component for your story.
     *
     * Used by addons for automatic prop table generation and display of other component metadata.
     */
    component?: (TRenderer & {
        T: Record<string, unknown> extends Required<TArgs> ? any : TArgs;
    })['component'];
    /**
     * Auxiliary subcomponents that are part of the stories.
     *
     * Used by addons for automatic prop table generation and display of other component metadata.
     *
     * @example
     * import { Button, ButtonGroup } from './components';
     *
     * export default {
     *   ...
     *   subcomponents: { Button, ButtonGroup }
     * }
     *
     * By defining them each component will have its tab in the args table.
     */
    subcomponents?: Record<string, TRenderer['component']>;
    /**
     * Function that is executed after the story is rendered.
     */
    play?: PlayFunction<TRenderer, TArgs>;
    /**
     * Override the globals values for all stories in this component
     */
    globals?: Globals;
}
```

そしてこのComponentAnnotationsは先ほどのBaseAnnotaionsをimplementしています。ComponentAnnotationsには`args`はありませんが、これはBaseAnnotationsに定義されています。

型引数の`TArgs>`には`ComponentProps<TCmpOrArgs>>`が渡りますので、合わせると`args`の型は次のようになります。

```ts
{
  args: Partial<ComponentProps<ComponentProps<typeof Button>>>>
}
```

したがって、`args`はButtonのすべてのPropsをOptionalで受け入れる型になり、Componentレベルの設定を満たすことになります。

### StoryObj（Storyレベル）ではComponentレベルで定義したPropsは任意になる
つづいてStoryObjです。

```ts
/**
 * Story object that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryObj<TMetaOrCmpOrArgs = Args> = [TMetaOrCmpOrArgs] extends [
    {
        render?: ArgsStoryFn<ReactRenderer, any>;
        component?: infer Component;
        args?: infer DefaultArgs;
    }
] ? Simplify<(Component extends ComponentType<any> ? ComponentProps<Component> : unknown) & ArgsFromMeta<ReactRenderer, TMetaOrCmpOrArgs>> extends infer TArgs ? StoryAnnotations<ReactRenderer, AddMocks<TArgs, DefaultArgs>, SetOptional<TArgs, keyof TArgs & keyof DefaultArgs>> : never : TMetaOrCmpOrArgs extends ComponentType<any> ? StoryAnnotations<ReactRenderer, ComponentProps<TMetaOrCmpOrArgs>> : StoryAnnotations<ReactRenderer, TMetaOrCmpOrArgs>;
```

StoryObjは分岐が多くぱっと見読みづらいです。Reactコンポーネントで形成するMetaを渡した場合の型を抜粋するとこの部分のなります。

```ts
StoryAnnotations<ReactRenderer, AddMocks<TArgs, DefaultArgs>, SetOptional<TArgs, keyof TArgs & keyof DefaultArgs>>
```

StoryAnnotationsは名前から察するとおり、さきほどのComponentAnnotationsのStory版です。

```ts
type StoryAnnotations<TRenderer extends Renderer = Renderer, TArgs = Args, TRequiredArgs = Partial<TArgs>> = BaseAnnotations<TRenderer, TArgs> & {
    /**
     * Override the display name in the UI (CSF v3)
     */
    name?: StoryName;
    /**
     * Override the display name in the UI (CSF v2)
     */
    storyName?: StoryName;
    /**
     * Function that is executed after the story is rendered.
     */
    play?: PlayFunction<TRenderer, TArgs>;
    /**
     * Override the globals values for this story
     */
    globals?: Globals;
    /** @deprecated */
    story?: Omit<StoryAnnotations<TRenderer, TArgs>, 'story'>;
} & ({} extends TRequiredArgs ? {
    args?: TRequiredArgs;
} : {
    args: TRequiredArgs;
});
```

ここでは`args`の型は、3つめの型引数に渡した型、つまり`SetOptional<TArgs, keyof TArgs & keyof DefaultArgs>`になります。`SetOptional`自体は何かというと、type-festで定義されている型ユーティリティで、指定したキーをOptionalにするものです。

https://github.com/sindresorhus/type-fest/blob/main/source/set-optional.d.ts

ここでは`keyof TArgs & keyof DefaultArgs`がOptionalにする対象なので、Componentレベルで定義したProps（`DefaultArgs`）があれば、それらはOptionalになります。

### Storyの型定義のまとめ

- csfから提供されるBaseAnnotationsという型によってComponent Story Formatに必要な属性を規定する
- MetaもStoryObjもBaseAnnotationsをimplementしたCSFを定義する型

## Storyはどのようにコンポーネントカタログになるのか

たとえば`storybook dev`コマンドを実行した時に、定義したStoryがどういう過程を経てStorybookのあのUIになっているのかが気になっていました。
Storybookと実際のアプリケーションとの環境間差異を把握したいためです。全体像を把握しておけば新しいBundlerやPluginが追加になっても、ある程度想像がつくようになると考え、ざっとですが、`storybook dev`からUIが立ち上がるまでを追いかけてみました。

対象バージョン：Storybook 8.3.6

### 結論

<script defer class="speakerdeck-embed" data-slide="15" data-id="0cc1784d5c4a4c8cb4ed0401c4403a76" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

### エントリポイント

### 2つのBuilder

ManagerBuilderとPreviewBuilderという2つのBuilderが取得されています。

```ts
  const [previewBuilder, managerBuilder] = await Promise.all([
    getPreviewBuilder(builderName, options.configDir),
    getManagerBuilder(),
    useStatics(router, options),
  ]);
```

https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/src/core-server/dev-server.ts#L76-L80

これらについては[StorybookのドキュメントのBuilder APIのセクション](https://storybook.js.org/docs/builders/builder-api)に説明があります。

画像の通りではありますが、アプリケーションのコンポーネントを描画するiframe部分のためのビルドツールをPreview Builderと読んでおり、それ以外のStorybook自体のUI部分のためのビルドツールをManager Builderと呼ぶそうです。

### Manager Builder
Manager BuilderではStorybookのUIをビルドします。実際にはStorybookに内包される部分だけではなく、StorybookのUI部分に作用するAdd-Onもビルドの対象です、

実態を追っていきます。まずManagerBuilder自体の取得は次のとおり、動的なimportによって実行されます。

```ts
export async function getManagerBuilder(): Promise<Builder<unknown>> {
  return import('@storybook/core/builder-manager');
}
```

https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/src/core-server/utils/get-builders.ts#L7-L9

（Manager BuilderとBuilder Managerだと違う意味に取れそうなものですが ... ...）。

ここで取得されたManager Builderもといbuilder-managerパッケージに対して、dev-server側は`start`を呼び出しています。

`start`関数自体はそこそこに長い処理ですが、やっていることとしてはesbuildによるビルド実行→sirvを介してビルドした静的ファイルをサーブする、という2点です。

`getData`関数ではesbuildのインスタンスやHTMLファイルのエントリポイントとなるejsファイルを取得します。

```ts
export const getData = async (options: Options) => {
  const refs = getRefs(options);
  const favicon = options.presets.apply<string>('favicon').then((p) => basename(p));

  const features = options.presets.apply<Record<string, string | boolean>>('features');
  const logLevel = options.presets.apply<string>('logLevel');
  const title = options.presets.apply<string>('title');
  const docsOptions = options.presets.apply('docs', {});
  const tagsOptions = options.presets.apply('tags', {});
  const template = readTemplate('template.ejs');
  const customHead = options.presets.apply<string>('managerHead');

  // we await these, because crucially if these fail, we want to bail out asap
  const [instance, config] = await Promise.all([
    //
    executor.get(),
    getConfig(options),
  ]);

  return {
    refs,
    features,
    title,
    docsOptions,
    template,
    customHead,
    instance,
    config,
    logLevel,
    favicon,
    tagsOptions,
  };
}
```

- https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/src/builder-manager/index.ts#L133-L145
- https://github.com/storybookjs/storybook/blob/next/code/core/src/builder-manager/utils/data.ts#L9-L41

ここで読み込まれるのは、次のejsファイルです。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title><%= typeof title !== 'undefined'? title : 'Storybook'%></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <% if (favicon.endsWith('.svg')) {%>
    <link rel="icon" type="image/svg+xml" href="./<%= favicon %>" />
    <% } else if (favicon.endsWith('.ico')) { %>
    <link rel="icon" type="image/x-icon" href="./<%= favicon %>" />
    <% } %>
    <style>
      // 省略
    </style>

    <link href="./sb-manager/runtime.js" rel="modulepreload" />

    <% files.js.forEach(file => { %>
    <link href="<%= file %>" rel="modulepreload" />
    <% }); %> <% if (typeof head !== 'undefined') { %> <%- head %> <% } %>

    <style>
      #storybook-root[hidden] {
        display: none !important;
      }
    </style>

    <% files.css.forEach(file => { %>
    <link href="<%= file %>" rel="stylesheet" />
    <% }); %>
  </head>
  <body>
    <div id="root"></div>

    <% if (typeof globals !== 'undefined' && Object.keys(globals).length) { %>
    <script>
      <% for (var varName in globals) { %>
        <% if (globals[varName] !== undefined) { %>
          window['<%=varName%>'] = <%- (globals[varName]) %>;
        <% } %>
      <% } %>
    </script>
    <% } %>

    <script type="module">
      import './sb-manager/globals-runtime.js';
      
      <% files.js.forEach(file => { %>
        import '<%= file %>';
      <% }); %>
      
      import './sb-manager/runtime.js';
    </script>

    <% if (!ignorePreview) { %>
    <link href="./sb-preview/runtime.js" rel="prefetch" as="script" />
    <% } %>
  </body>
</html>
```

https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/assets/server/template.ejs

ランタイムとして同梱される`./sb-manager/runtime.js`では、StorybookのUIをレンダリングする`renderStorybookUI`関数を呼び出しています。

```ts
const { document } = global;
const rootEl = document.getElementById('root');

// We need to wait for the script tag containing the global objects
// to be run by Webkit before rendering the UI. This is fine in most browsers.
setTimeout(() => {
  // @ts-expect-error (non strict)
  renderStorybookUI(rootEl, new ReactProvider());
}, 0)
```

https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/src/manager/runtime.ts#L45-L53

ここから先はいつものReactの世界でした。

```tsx
export function renderStorybookUI(domNode: HTMLElement, provider: Provider) {
  if (!(provider instanceof Provider)) {
    throw new ProviderDoesNotExtendBaseProviderError();
  }

  const root = createRoot(domNode);
  root.render(<Root key="root" provider={provider} />);
}
```

https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/src/manager/index.tsx

### Storybookのレイアウト

```tsx
  <Layout
	hasTab={hasTab}
	managerLayoutState={managerLayoutState}
	setManagerLayoutState={setManagerLayoutState}
	slotMain={<Preview id="main" withLoader />}
	slotSidebar={<Sidebar onMenuClick={() => setMobileAboutOpen((state) => !state)} />}
	slotPanel={<Panel />}
	slotPages={pages.map(({ id, render: Content }) => (
	  <Content key={id} />
	))}
  />
```

https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/src/manager/App.tsx#L26-L35


Previewコンポーネントが実際にコンポーネントを描画する領域で、いくつかコンポーネントを潜っていくと、iframeを見つけることができます。

```tsx
const StyledIframe = styled.iframe(({ theme }) => ({
  backgroundColor: theme.background.preview,
  display: 'block',
  boxSizing: 'content-box',
  height: '100%',
  width: '100%',
  border: '0 none',
  transition: 'background-position 0s, visibility 0s',
  backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
  margin: `auto`,
  boxShadow: '0 0 100px 100vw rgba(0,0,0,0.5)',
}));
```

https://github.com/storybookjs/storybook/blob/v8.3.6/code/core/src/manager/components/preview/Iframe.tsx#L7-L18

### Preview Builder

Preview Builderは先述の通り、ユーザーが定義したStoryのためのBuilderです。Builderは次のインターフェイスを満たすことを必要としており、実際にdev serverの中でも`start`や`bail`などが呼び出されています。

```ts
export interface Builder<Config, Stats> {
  start: (args: {
    options: Options;
    startTime: ReturnType<typeof process.hrtime>;
    router: Router;
    server: Server;
  }) => Promise<void | {
    stats?: Stats;
    totalTime: ReturnType<typeof process.hrtime>;
    bail: (e?: Error) => Promise<void>;
  }>;
  build: (arg: {
    options: Options;
    startTime: ReturnType<typeof process.hrtime>;
  }) => Promise<void | Stats>;
  bail: (e?: Error) => Promise<void>;
  getConfig: (options: Options) => Promise<Config>;
  corePresets?: string[];
  overridePresets?: string[];
}
```

https://storybook.js.org/docs/builders/builder-api#builder-api

現在Storybookで利用できるBuilderにはwebpackとViteがあるので、今回は@storybook/builder-viteを読んでみます。

#### builder-vite

builder-viteもStorybookのリポジトリに格納されています。
https://github.com/storybookjs/storybook/tree/v8.3.6/code/builders/builder-vite

```tsx
export const start: ViteBuilder['start'] = async ({
  startTime,
  options,
  router,
  server: devServer,
}) => {
  server = await createViteServer(options as Options, devServer);

  const previewResolvedDir = join(corePath, 'dist/preview');
  router.use(
    '/sb-preview',
    sirv(previewResolvedDir, {
      maxAge: 300000,
      dev: true,
      immutable: true,
    })
  );
  router.use(iframeMiddleware(options as Options, server));
  router.use(server.middlewares);

  return {
    bail,
    stats: {
      toJson: () => {
        throw new NoStatsForViteDevError();
      },
    },
    totalTime: process.hrtime(startTime),
  };
};
```

startの処理はこれだけで、やっていることととしては次のとおりです。

1. middlewareModeでViteの`createServer`を実行する。
2. Storybookのcoreディレクトリを起点としてdist/previewを静的アセットとして配信できるようにします。
3. iframeMiddlewareをミドルウェアとして指定します。
4. 1をミドルウェアとして指定する。

まず1のmiddlewareModeについて、これによりルーティングの制御は`router`、つまりStorybookがpolkaを用いてたてたHTTPサーバに移ります。結果としてルーティング後の処理をViteが受け持てるようになります。
[サーバーサイドレンダリング | Vite](https://ja.vite.dev/guide/ssr.html#setting-up-the-dev-server)がわかりやすく、この例ではexpressを使っていますが、polkaを使っていても同じ要領で読めるかと思います。

次に2のdist/previewですが、これはViteが配信するiframe.htmlで読み込まれるスクリプトを指しています。

3のiframeMiddlewareは同じファイルに定義されており、どうも`iframe.html`でリクエストが来た場合に、@storybook/buider-vite/input/iframe.htmlをごにょごにょして返すmiddlewareのようです。

```ts
function iframeMiddleware(options: Options, server: ViteDevServer): Middleware {
  return async (req, res, next) => {
    if (!req.url || !req.url.match(/^\/iframe\.html($|\?)/)) {
      next();
      return;
    }
    // the base isn't used for anything, but it's required by the URL constructor
    const url = new URL(req.url, 'http://localhost:6006');

    // We need to handle `html-proxy` params for style tag HMR https://github.com/storybookjs/builder-vite/issues/266#issuecomment-1055677865
    // e.g. /iframe.html?html-proxy&index=0.css
    if (url.searchParams.has('html-proxy')) {
      next();
      return;
    }

    const indexHtml = await readFile(require.resolve('@storybook/builder-vite/input/iframe.html'), {
      encoding: 'utf8',
    });
    const generated = await transformIframeHtml(indexHtml, options);
    const transformed = await server.transformIndexHtml('/iframe.html', generated);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.write(transformed);
    res.end();
  };
}
```

というわけでViteの世界のエントリポイントはiframe.htmlになりそうなので、次はここを起点に処理をみます。

#### iframe.html

```html
  <body>
    <!-- [BODY HTML SNIPPET HERE] -->
    <div id="storybook-root"></div>
    <div id="storybook-docs"></div>
    <script type="module" src="./sb-preview/runtime.js"></script>
    <script type="module" src="/virtual:/@storybook/builder-vite/vite-app.js"></script>
  </body>
```

iframe.htmlの中身は薄く、bodyとしてはこれだけです。いくつかdivがあるのでStorybookのUIと照らし合わせると、たしかにiframeの中にこの要素がありますね。

さきほども出てきましたが、`sb-preview/runtime.js`が出てきているので、これを確認します。

#### sb-preview/runtime.js
実際のディレクトリでいうと、code/core/src/previewを指していそうです。このモジュールでは、Storybookの各モジュールをグローバルスコープに突っ込む役割を担っています。

あまり具体的な処理はなかったので、もう1つのscriptをみます。

#### @storybook/builder-vite/vite-app.js

Viteの仮想モジュールなのですが、具体的にどのファイルの処理で生成されるものを指しているのかいまいちわからず ... ...。

残念ながら今回はここでタイムアップです。

## おわりに

発表ではStorybook 8.3で発表されたexperimental-nextjs-viteにも触れたのですが、こちらもあまり深追いはできておらず、サラッと紹介する程度でした。まだまだコード読解力が足りませんね。

ただ今回のドキュメントリーディング、コードリーディングを経て、だいぶStorybookに対して自信が持てました。
