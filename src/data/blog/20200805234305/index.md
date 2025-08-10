---
title: "突然ssh接続でDebianに繋がらなくなったときの対処法"
publishDate: 2020-08-05 23:43:05
category: idea
draft: false
description: "突然ssh接続でDebianに繋がらなくなったときの対処法"
tags:
  - PROGRAMMING
  - Linux
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200805/20200805215246.png

## 記憶喪失のDebian？

3日前くらいに、さくらVPS上のDebianに対して公開鍵の設定しました。  
設定当初から問題なく公開鍵認証で接続できていたのですが、今日ssh接続を試みると、突然`Permission denied (public key)`と言われてしまいました。 ![f:id:ikmbear:20200805215246p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20200805/20200805215246.png) 

何も設定を変えていなかったので、どうしたもんかと。アニメ「一週間フレンズ」しかり、Debianは数日立つと私のことを忘れてしまうのでしょうか。

「Debian！俺だよ！思い出してくれよ！」  
そう叫んだところで相手はシステム。思いは届きません。一つずつ確認しましょう。

- [記憶喪失のDebian？](#記憶喪失のDebian)
- [前提](#前提)
- [思い出せDebian編](#思い出せDebian編)

  - [覚えてるか？俺たち、昔はパスワードでssh接続したりしてさ...](#覚えてるか俺たち昔はパスワードでssh接続したりしてさ)
  - [覚えてるか？この鍵。半分、お前に渡してさ...](#覚えてるかこの鍵半分お前に渡してさ)
  - [なあDebian、閉ざした心を開いてくれよ...](#なあDebian閉ざした心を開いてくれよ)
  - [Debian、お前もしかして...](#Debianお前もしかして)

- [Debianは覚えていた編](#Debianは覚えていた編)

  - [忘れたのはクライアント（mac）のキーチェーン](#忘れたのはクライアントmacのキーチェーン)
  - [キーチェーンにDebianとの友情を邪魔させない。](#キーチェーンにDebianとの友情を邪魔させない)
  - [もっとDebianと仲良くなる](#もっとDebianと仲良くなる)

- [感想](#感想)
- [参考](#参考)

## 前提

- sshクライアント：macOS Catalina（10.15.6）
- 接続先：さくらVPSに構築したDebian10.4
- 以前は公開鍵認証で問題なく接続できていたが、突然`Permission denied (public key)`により接続できなくなった。
- 公開鍵認証については、[ssh接続を鍵認証で行う](http://www.tooyama.org/ssh-key.html)を参考に実施済み。つまり
  - client\_rsaというキーペアを作成
  - クライアントのキーチェーンには$1を登録済（`ssh-add -K ~/.ssh/client_rsa`）
  - Debian側にも公開鍵を登録済
  - Debian側のsshd\_configは以下の設定がしてある

```
PasswordAuthentication  noChallengeResponseAuthentication  noUsePAM  yes
```

## 思い出せDebian編

### 覚えてるか？俺たち、昔はパスワードでssh接続したりしてさ...

- 確認したいこと：原因が公開鍵認証によるものなのかの切り分け
- 確認方法：Debian側のsshd\_configで`PasswordAuthentication yes`に設定変更する。
- 確認結果：パスワード認証では問題なくssh接続できる。

Debian「今もパスワード認証できるで」

### 覚えてるか？この鍵。半分、お前に渡してさ...

- 確認したいこと：公開鍵がちゃんとサーバ側に格納されているかどうかを確認
- 確認方法：macで作成した公開鍵を確認し、debian側のフォルダに配置されているものと比較する。
  - 具体的には以下の流れでクライアント、サーバでのcat結果を比較。

```
# クライアント（mac）にキーペアが作成されていることを確認$ ls ~/.ssh$ cat ~/.ssh/client_rsa.pub# サーバ（debian）に公開鍵が配置されていることを確認$ ls ~/.ssh$ cat ~/.ssh/authorized_keys
```

- 確認結果：作成した公開鍵がサーバ側に正しく格納されている。

Debian「今もちゃんと持ってるで、覚えとるで」

### なあDebian、閉ざした心を開いてくれよ...

- 確認したいこと：エラーメッセージにある`Permission Denied`が本当に$1が原因か確認する。
- 確認方法：クライアント、サーバ側それぞれの.sshsshリのsshを確認する。

  - クライアントは700（rwx）
  - サーバ側は600（rw）

- 確認結果：どちらも期待通り。

Debian「心オープンやで〜」

### Debian、お前もしかして...

Debian「さっきから好き勝手疑ってくれてますけど」  
Debian「全然こっちは問題ないですから。」  
Debian「もうひとつ言っておくと、使用する鍵をちゃんと指定すればssh接続できますから！こんな感じで。」

```
$ ssh -i ~/.ssh/client_rsa -p 3090 YYYYYYYYYYYY@XXX.XX.XX.XXX
```

## Debianは覚えていた編

### 忘れたのはクライアント（mac）のキーチェーン

実は問題があるのはDebianではなく、キーチェーンの方でした。  
macOS 10.12 Sierra以降、キーチェーンが再起動時に読み込まれなくなる仕様となったそうです。

タイトルに「突然」とありますが、実際には「macの再起動」をトリガーとして本事象が発生します。（事象発生まではmacbookをスリープするだけで、再起動していなかったんでしょうね...）

### キーチェーンにDebianとの友情を邪魔させない。

再度`ssh-add -K ~/.ssh/client_rsa`を実行することで、一時的には繋がるようになりますが、再起動すると、またssh接続できなくなってしまいます。  
そのため、恒久対応として\~/.ssh/configに以下の設定を追加します。

```
Host *  UseKeychain yes  AddKeysToAgent yes
```

### もっとDebianと仲良くなる

せっかくconfigの設定をしたので、毎回ポートやipを打たずに済むような設定もしておきます。

```
Host ikuma-t  HostName XXX.XXX.XX.XX  User ikuma-t  IdentityFile ~/.ssh/client_rsa  Port 3090  TCPKeepAlive yes  IdentitiesOnly yes
```

これで再起動しても`ssh ikuma-t`で繋がるようになりました！

## 感想

コマンドだけでリモートとやり取りするような部分って、「これ何やってんだ？」「どれチェックしたか忘れた...もう一回しらみ潰しにやり直してみよう」ってことが多いと思います。

今回はDebianが記憶喪失したというストーリーで擬人化して考えましたが、とっつきにくい内容だからこそ、自分で噛み砕いてコミカルにしてみるのはなかなか効果的でした！

Debian「途中で設定とかストーリー書くの面倒になったでしょ」  
私「ファッ！！！」

## 参考

- [SSH で Permission Denied となる傾向と対策 - Qiita](https://qiita.com/youcune/items/2f427979403771f2e03a)
- [How can I permanently add my SSH private key to Keychain so it is automatically available to ssh? - Ask Different](https://apple.stackexchange.com/questions/48502/how-can-i-permanently-add-my-ssh-private-key-to-keychain-so-it-is-automatically)
- [macOS で再起動しても ssh agent に秘密鍵を保持させ続ける二つの方法 - Qiita](https://qiita.com/sonots/items/a6dec06f95fca4757d4a)
- [.ssh/configファイルでSSH接続を管理する - Qiita](https://qiita.com/0084ken/items/2e4e9ae44ec5e01328f1)
