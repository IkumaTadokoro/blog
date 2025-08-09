---
title: "GitHub Actionsをローカルで試せるactを試してみる"
publishDate: 2023-05-10
category: tech
draft: false
description: "act は Docker を利用して、.github/workflows のワークフローを実行するための Go 製のツールです"
tags: [GitHub_Actions]
---
最近開発生産性を取得したりで GitHub Actions をよく書いています。最近では GitHub Actions の VSCode 拡張が出てきたことで、構文的なエラーには気が付きやすくなりましたが、やはり実際に動作するかは GitHub に push しなければならず、やや面倒でした。

N 番煎じではありますが、ローカルで GitHub Actions を実行できる[nektos/act](https://github.com/nektos/act)を使って、GitHub Actions のローカル実行を試してみました。

## act の概要

act は Docker を利用して、.github/workflows のワークフローを実行するための Go 製のツールです。実行環境は現時点で ubuntu のみです。

https://github.com/nektos/act#runners

インストール方法は[こちら](https://github.com/nektos/act#installation-through-package-managers)の通りで、今回は Mac で使用するため、HomeBrew でインストールします。

```bash
brew install act
```

## act の使い方

https://github.com/IkumaTadokoro/forke

ここからはこのリポジトリをサンプルに進めていきます。このリポジトリでは以下の GitHub Actions が定義されています。

```
.github/workflows
├── lint.yml
├── test.yml
└── release.yml
```

### リポジトリのワークフローの確認

まずは対象のワークフローが認識されているかを確認します。

```
$ act -l

WARN  ⚠ You are using Apple M-series chip and you have not specified container architecture, you might encounter issues while running act. If so, try running it with '--container-architecture linux/amd64'. ⚠
Stage  Job ID   Job name  Workflow name  Workflow file  Events
0      lint     lint      Lint           lint.yml       push
0      release  release   Release        release.yml    push
0      test     test      Test           test.yml       push
```

期待通り、3 つのワークフローが認識されています。
M1 Mac を使っているので、実行時にエラーが出るかもと警告が出ていますが、一旦無視して進めます。

### ワークフローの実行

今回は vitest によるテストを実行する Job「test」を実行してみます。特定の Job を指定するには`-j`オプションを使います。
初回なので、DryRun（`-n`）で実行してみます。

```
$ act -j test -n

? Please choose the default image you want to use with act:

  - Large size image: +20GB Docker image, includes almost all tools used on GitHub Actions (IMPORTANT: currently only ubuntu-18.04 platform is available)
  - Medium size image: ~500MB, includes only necessary tools to bootstrap actions and aims to be compatible with all actions
  - Micro size image: <200MB, contains only NodeJS required to bootstrap actions, doesn't work with all actions

Default image and other options can be changed manually in ~/.actrc (please refer to https://github.com/nektos/act#configuration for additional information about file structure)  [Use arrows to move, type to filter, ? for more help]
  Large
> Medium
  Micro

*DRYRUN* [Test/test-1] 🚀  Start image=catthehacker/ubuntu:act-latest
*DRYRUN* [Test/test-2] 🚀  Start image=catthehacker/ubuntu:act-latest
*DRYRUN* [Test/test-3] 🚀  Start image=catthehacker/ubuntu:act-latest
*DRYRUN* [Test/test-2]   🐳  docker pull image=catthehacker/ubuntu:act-latest platform= username= forcePull=true
*DRYRUN* [Test/test-3]   🐳  docker pull image=catthehacker/ubuntu:act-latest platform= username= forcePull=true
*DRYRUN* [Test/test-1]   🐳  docker pull image=catthehacker/ubuntu:act-latest platform= username= forcePull=true
*DRYRUN* [Test/test-3]   🐳  docker create image=catthehacker/ubuntu:act-latest platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
*DRYRUN* [Test/test-3]   🐳  docker run image=catthehacker/ubuntu:act-latest platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
*DRYRUN* [Test/test-2]   🐳  docker create image=catthehacker/ubuntu:act-latest platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
*DRYRUN* [Test/test-2]   🐳  docker run image=catthehacker/ubuntu:act-latest platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
*DRYRUN* [Test/test-1]   🐳  docker create image=catthehacker/ubuntu:act-latest platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
*DRYRUN* [Test/test-1]   🐳  docker run image=catthehacker/ubuntu:act-latest platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
*DRYRUN* [Test/test-2]   ☁  git clone 'https://github.com/actions/setup-node' # ref=v3
*DRYRUN* [Test/test-3]   ☁  git clone 'https://github.com/actions/setup-node' # ref=v3
*DRYRUN* [Test/test-1]   ☁  git clone 'https://github.com/actions/setup-node' # ref=v3
*DRYRUN* [Test/test-2] 🧪  Matrix: map[node-version:18.x os:ubuntu-latest]
*DRYRUN* [Test/test-2] ⭐ Run Main actions/checkout@v3
*DRYRUN* [Test/test-2]   ✅  Success - Main actions/checkout@v3
*DRYRUN* [Test/test-2] ⭐ Run Main Use Node.js 18.x
*DRYRUN* [Test/test-2]   ✅  Success - Main Use Node.js 18.x
*DRYRUN* [Test/test-2] ⭐ Run Main Install
*DRYRUN* [Test/test-2]   ✅  Success - Main Install
*DRYRUN* [Test/test-2] ⭐ Run Main Unit Test
*DRYRUN* [Test/test-2]   ✅  Success - Main Unit Test
*DRYRUN* [Test/test-2] ⭐ Run Post Use Node.js 18.x
*DRYRUN* [Test/test-2]   ✅  Success - Post Use Node.js 18.x
*DRYRUN* [Test/test-2] 🏁  Job succeeded
*DRYRUN* [Test/test-3] 🧪  Matrix: map[node-version:20.x os:ubuntu-latest]
*DRYRUN* [Test/test-3] ⭐ Run Main actions/checkout@v3
*DRYRUN* [Test/test-3]   ✅  Success - Main actions/checkout@v3
*DRYRUN* [Test/test-3] ⭐ Run Main Use Node.js 20.x
*DRYRUN* [Test/test-3]   ✅  Success - Main Use Node.js 20.x
*DRYRUN* [Test/test-3] ⭐ Run Main Install
*DRYRUN* [Test/test-3]   ✅  Success - Main Install
*DRYRUN* [Test/test-3] ⭐ Run Main Unit Test
*DRYRUN* [Test/test-3]   ✅  Success - Main Unit Test
*DRYRUN* [Test/test-3] ⭐ Run Post Use Node.js 20.x
*DRYRUN* [Test/test-3]   ✅  Success - Post Use Node.js 20.x
*DRYRUN* [Test/test-3] 🏁  Job succeeded
*DRYRUN* [Test/test-1] 🧪  Matrix: map[node-version:16.x os:ubuntu-latest]
*DRYRUN* [Test/test-1] ⭐ Run Main actions/checkout@v3
*DRYRUN* [Test/test-1]   ✅  Success - Main actions/checkout@v3
*DRYRUN* [Test/test-1] ⭐ Run Main Use Node.js 16.x
*DRYRUN* [Test/test-1]   ✅  Success - Main Use Node.js 16.x
*DRYRUN* [Test/test-1] ⭐ Run Main Install
*DRYRUN* [Test/test-1]   ✅  Success - Main Install
*DRYRUN* [Test/test-1] ⭐ Run Main Unit Test
*DRYRUN* [Test/test-1]   ✅  Success - Main Unit Test
*DRYRUN* [Test/test-1] ⭐ Run Post Use Node.js 16.x
*DRYRUN* [Test/test-1]   ✅  Success - Post Use Node.js 16.x
*DRYRUN* [Test/test-1] 🏁  Job succeeded
```

初回ではどのサイズの image を利用するか聞かれます。一般的なワークフローであれば Medium で良さそうです。
無事にワークフロー自体は正常終了したようなので、今度はテストの内容を変えて再度実行してみます。

```diff
# 日付差分を分単位で計測する関数の期待値を変えて失敗させてみる。
  test.each<[Date, Date, number]>([
    [new Date("2021-01-01T00:00:00Z"), new Date("2021-01-01T01:00:00Z"), 60],
-   [new Date("2021-01-01T00:00:00Z"), new Date("2021-01-01T00:06:00Z"), 6],
+   [new Date("2021-01-01T00:00:00Z"), new Date("2021-01-01T00:06:00Z"), 7],
    [new Date("2021-01-01T00:00:00Z"), new Date("2021-01-01T00:05:00Z"), 5],
    [new Date("2021-01-01T00:00:00Z"), new Date("2021-01-01T00:01:00Z"), 1],
    [new Date("2021-01-01T00:00:00Z"), new Date("2021-01-01T00:00:01Z"), 0],
  ])(`[DEFAULT: minute]calcTimeDiff(%s, %s): %s`, (date1, date2, expected) => {
    expect(calcTimeDiff(date1, date2)).toBe(expected);
  });
```

```
$ act -j test

...

[Test/test-1]   ✅  Success - Main Install
[Test/test-1] ⭐ Run Main Unit Test
[Test/test-1]   🐳  docker exec cmd=[bash --noprofile --norc -e -o pipefail /var/run/act/workflow/3] user= workdir=
|
| > forke@1.1.4 test:ci
| > vitest run
|
|
|  RUN  v0.30.1 /Users/ikuma/src/github.com/IkumaTadokoro/forke
|
|  ✓ src/lib/__test__/mathUtil.test.ts  (12 tests) 5ms
|  ✓ src/lib/__test__/stat.test.ts  (9 tests) 8ms
|  ❯ src/lib/__test__/dateUtil.test.ts  (24 tests | 1 failed) 56ms
|    ❯ src/lib/__test__/dateUtil.test.ts > calcTimeDiff > [DEFAULT: minute]calcTimeDiff(2021-01-01T00:00:00.000Z, 2021-01-01T00:06:00.000Z): 7
|      → expected 6 to be 7 // Object.is equality
|
| ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯
|
|  FAIL  src/lib/__test__/dateUtil.test.ts > calcTimeDiff > [DEFAULT: minute]calcTimeDiff(2021-01-01T00:00:00.000Z, 2021-01-01T00:06:00.000Z): 7
| AssertionError: expected 6 to be 7 // Object.is equality
|  ❯ src/lib/__test__/dateUtil.test.ts:41:40
|      39|     [new Date("2021-01-01T00:00:00Z"), new Date("2021-01-01T00:00:01Z"…
|      40|   ])(`[DEFAULT: minute]calcTimeDiff(%s, %s): %s`, (date1, date2, expec…
|      41|     expect(calcTimeDiff(date1, date2)).toBe(expected);
|        |                                        ^
|      42|   });
|      43|
|
|   - Expected  - 1
|   + Received  + 1
|
|   - 7
|   + 6
| ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
|
|  Test Files  1 failed | 2 passed (3)
|       Tests  1 failed | 44 passed (45)
|    Start at  20:40:05
|    Duration  868ms (transform 143ms, setup 0ms, collect 456ms, tests 69ms, environment 0ms, prepare 514ms)
|
[Test/test-1]   ❌  Failure - Main Unit Test
[Test/test-1] exitcode '1': failure
[Test/test-1] 🏁  Job failed

...
```

マトリクス実行しているのと、act 側のログが大量に出ているので実行部分のみ抜粋ですが、ローカルファイルの変更を反映してワークフローが実行されていることがわかります。これは便利。

## ログ出力を抑制する

「act 側のログが大量に出ている」と先に挙げましたが、実例としては次のようなものです。

```
[Test/test-3]   💬  ::debug::{"archiveLocation":"***","cacheKey":"node-cache-linux-npm-eb3cb123726e2245d1ac05822a0ed4f5b7ab0e59926ef990db3189e8565ae3f7","result":"hit"}
[Test/test-3]   💬  ::debug::Archive Path: /tmp/71f659f3-b296-414e-a049-7495a8b9fd5e/cache.tzst
[Test/test-3]   💬  ::debug::Use Azure SDK: true
[Test/test-3]   💬  ::debug::Download concurrency: 8
[Test/test-3]   💬  ::debug::Request timeout (ms): 30000
[Test/test-3]   💬  ::debug::Cache segment download timeout mins env var: undefined
[Test/test-3]   💬  ::debug::Segment download timeout (ms): 3600000
| Cache Size: ~39 MB (40876809 B)
| [command]/usr/bin/tar --use-compress-program unzstd -xf /tmp/71f659f3-b296-414e-a049-7495a8b9fd5e/cache.tzst -P -C /Users/ikuma/src/github.com/IkumaTadokoro/forke
| Cache restored successfully
| Cache restored from key: node-cache-linux-npm-eb3cb123726e2245d1ac05822a0ed4f5b7ab0e59926ef990db3189e8565ae3f7
[Test/test-3]   ❓ add-matcher /run/act/actions/actions-setup-node@v3/.github/tsc.json
[Test/test-3]   ❓ add-matcher /run/act/actions/actions-setup-node@v3/.github/eslint-stylish.json
[Test/test-3]   ❓ add-matcher /run/act/actions/actions-setup-node@v3/.github/eslint-compact.json
[Test/test-3]   ✅  Success - Main Use Node.js 20.x
[Test/test-3]   ⚙  ::set-env:: NPM_CONFIG_USERCONFIG=/tmp/.npmrc
[Test/test-3]   ⚙  ::set-env:: NODE_AUTH_TOKEN=XXXXX-XXXXX-XXXXX-XXXXX
[Test/test-3]   ⚙  ::set-output:: node-version=v20.1.0
[Test/test-3]   ⚙  ::set-output:: cache-hit=true
[Test/test-3]   ⚙  ::add-path:: /opt/hostedtoolcache/node/20.1.0/arm64/bin
[Test/test-3] ⭐ Run Main Install
[Test/test-3]   🐳  docker exec cmd=[bash --noprofile --norc -e -o pipefail /var/run/act/workflow/2] user= workdir=
```

毎回この量が出るのはしんどいので、これを`-q, --quiet`オプションで抑制します。

```
$ act -j test -q
```

...が、期待通りにはなりませんでした。この`--quiet`オプションはワークフロー側のログ出力レベルを抑制するもので、今回のワークフローの例で言えば、vitest の実装結果が省略されることになります。

## おわりに

ログ出力の多さゆえに使えないということはないですが、このツールは試行錯誤中に利用したいものだと思うので、デバッグ用の情報はシンプルな方が嬉しい気がします。
それを加味してもローカルで検証できることで GitHub への push 回数は抑制できると思うので、しかるべきときに使っていきたいですね。
