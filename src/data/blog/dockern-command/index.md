---
title: dockerのimageとvolumeを選択して消せるか、賑やかしができるdockern（どっかーん）コマンド
draft: false
publishDate: 2023-10-14
category: tech
tags:
  - Docker
  - Deno
---

## 作ったもの

[dockern](https://github.com/IkumaTadokoro/dockern)

denoを使っているので、READMEの通りinstallして`dockern`で実行できます。

## 経緯

色々とDockerコンテナをガチャガチャしていて、何度もimageやvolumeをまとめて削除したいケースが発生しました。

docker compose系のコマンドはエイリアスも貼ってあるし、覚えているのですが、dockerコマンドは全然覚えていないので、ここら辺をラップしてやってくれるコマンドを作ることにしました。
（なおアイデアとライブラリだけ選んでほぼChatGPTで作った）。

仕事中に「dockerをドッカーンと」とか聞いたような記憶があったので、名前はdockernです。

## ぐるぐるどっかーん

スプー世代の方はわかると思います。

```bash
$ dockern guru2
ぐるぐるぐるぐるどっかーん🎺
```

まあメインコマンドは`dockern`だけで実行できるので、明日以降これを実行することはないでしょう。

## おわり

今消したいimageやvolumeがないので、あまりしっかり動作確認はしていません。業務中に動かなくなったら都度直していこうと思います。
