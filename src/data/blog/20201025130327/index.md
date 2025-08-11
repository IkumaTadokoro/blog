---
title: ⚡️初めてのLT会 Vol.5でRubyMineの話をしました！
publishDate: 2020-10-25 13:03:27
category: idea
draft: false
description: ⚡️初めてのLT会 Vol.5でRubyMineの話をしました！
tags:
  - fjordbootcamp
  - ツール・ガジェット
  - RubyMine
  - 登壇
---
IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025125820.jpg

 ![f:id:ikmbear:20201025125820j:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025125820.jpg) 

- [⚡️初めてのLT会 Vol.5に参加しました！](#️初めてのLT会-Vol5に参加しました)
- [参加の経緯](#参加の経緯)

  - [前回のLT会に感化され、参加を決意](#前回のLT会に感化され参加を決意)
  - [テーマはぼんやりと「RubyMineを布教する」](#テーマはぼんやりとRubyMineを布教する)

- [資料作成](#資料作成)

  - [発表内容を決める](#発表内容を決める)

    - [RubyMineについて調べる](#RubyMineについて調べる)
    - [調べたことにツッコミを入れる](#調べたことにツッコミを入れる)
    - [手書きでざっくりと話したいことをまとめる](#手書きでざっくりと話したいことをまとめる)

  - [スライド作り/Keynoteに挑戦！](#スライド作りKeynoteに挑戦)
    - [配色選び](#配色選び)
    - [レイアウトを考える](#レイアウトを考える)

- [スライド完成！練習](#スライド完成練習)

  - [1人web発表会](#1人web発表会)
  - [keynoteのスライドショー記録機能で録音](#keynoteのスライドショー記録機能で録音)
  - [お風呂で練習](#お風呂で練習)

- [当日リハーサル](#当日リハーサル)
- [本番！たのしかったLT会！](#本番たのしかったLT会)
- [おまけ。RubyMineのはじめの一歩。](#おまけRubyMineのはじめの一歩)

  - [公式ヘルプをみる](#公式ヘルプをみる)
  - [日本語化プラグインを入れる](#日本語化プラグインを入れる)
  - [KeyPromoterXを導入する](#KeyPromoterXを導入する)
  - [今日のTipsを確認する](#今日のTipsを確認する)

- [参考](#参考)
  - [調査の過程で読んだ記事](#調査の過程で読んだ記事)

# ⚡️初めてのLT会 Vol.5に参加しました！

昨日[FJORD BOOT CAMP（フィヨルドブートキャンプ）](https://bootcamp.fjord.jp/)で開催された、ライトニング$1初心者のための発表会、「⚡️初めてのLT会 Vol.5」に参加しました！

今回のテーマは「Rubyブートキャンプの歩み方🏃‍♂️」ということで、私は開発ツール「RubyMine」を使うことでRubyの学習が捗るよ〜という話をさせていただきました。

文字通り初めてのLT参加だったので、参加に至る経緯〜発表を終えるまでを振り返ってみようと思います！

# 参加の経緯

## 前回のLT会に感化され、参加を決意

初めてのLT会は、今回でVol.5となるFJORD BOOT CAMPの継続コンテンツです。私が初めて参加したのはVol.4だったのですが、皆さんの発表を見て「自分もやってみたい」「こういう機会でやらなきゃ、死ぬとき絶対後悔する」と思い、その日の日報にやってみようかなと書いてみました（2020/8/22のこと）。

 ![f:id:ikmbear:20201025095220p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025095220.png) 

この日報に心配ごとへのTipsや後押しのコメントをいただき、参加の決意を硬くしたのでした。**後押しいただいたみなさま、ありがとうございます🙏**

## テーマはぼんやりと「RubyMineを布教する」

こちらも日報でのやりとりからです。

メンターの[伊藤さん](https://blog.jnito.com/)の「RubyMine布教してみては」というコメントから、「たしかに自分も使いこなせていないし、アウトプットを通じてRubyMineについて詳しくなるのもいいな」と感じ、ぼんやりと次の機会があったらRubyMineについて発表しようと思っていたのでした。

# 資料作成

## 発表内容を決める

前述の経緯から、ぼんやりと「RubyMineを布教しよう」ということは決まっていたのですが、具体的なところは未定状態でした。

### RubyMineについて調べる

まずは情報収集ということで、RubyMineを知るところから始めました。

ということで、世間一般で言われている「RubyMineどこがいいのよ」という話をかたっぱしから読んでみたり、公式マニュアルをみて試したことを$1（Xmindを使用）にまとめました。

※実際に読んだ記事はこの記事の参考に載せているので、チェックしてみてください！

 ![f:id:ikmbear:20201025101401p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025101401.png) 

### 調べたことにツッコミを入れる

次は調べたことにツッコミ（本当にそれ便利なの？）を入れました。

- コードジャンプでGemの中がみられるのは嬉しいけど、FJORD BOOT CAMPのプRubyティスではgemなしでRubyの課題解くよな
- rails系の機能って、後半戦にならないと使わないのよね。私もまだrailsやってないし
- SearchEverywhereもよく便利と言われるけど、ファイル1つで完結するようなRubyの課題ではそれほどメリット感じないよな（もちろんアクションとかの検索にも使えるけど）
- Gitもめちゃくちゃみやすいし使ってるけど、今のプRubyティスの順番だとRubyの方が先なんだよな

...などなど。ツッコミの結果から、競合分析ってほどではないですが、自分が話すことで他の人にメリットをありそうなところを確認。結果として「初心者=PureRubyでFJORD BOOT CAMPのRubyプRubyティスを進める人」への機能に絞って、発表することに決定しました。

 ![f:id:ikmbear:20201025103019j:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025103019.jpg) 

あとから振り返ると、**ペルソナを仮定して準備を進めると、発表の粒度の指針ができていいな**と感じました（今回だと、「IDEってなんのことか説明する」「RuboCopとは何かを説明する」など。

### 手書きでざっくりと話したいことをまとめる

 ![f:id:ikmbear:20201025104100j:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025104100.jpg) 最初は手書き（ipadのGoodNotes5を利用）で、話したいことをどういう風にスライドを配置するかを考えます。

またスライドを作るとどうしようもないネタ（およそ自己満足）が生まれることがあるので、そういうことを客観視するための機会でもあります。

今回も「RuboCopハードモードってキャッチーでええやん！」と思いつきで書いてみたものの、

- 全然本質ではない、そんなにキャッチーでもなく面白くもない
- 話すときに文字数を食う
- RuboCopがゴゴゴしてるイラスト作るの大変

などの理由で手書きの段階で却下しました。

この段階で30枚くらいのスライドになりそうだったので、全体のバランスをみながら集約できそうな情報はまとめ、いらない情報は削りました。

よくビジネス本で言われることですが、**スライドにいきなり取り掛かるとレイアウトに気がとられてしまうので**、まずは手書きがおすすめです（RuboCopのゴゴゴも、もしスライドにいきなり作っていたらサンクコストが原因で変なスライドになっていた可能性があります）。

## スライド作り/Keynoteに挑戦！

話すことが決まったら、実際にスライドに落とし込んでいきます。普段の仕事ではWindows、PowerPointユーザなので、今回Keynote初挑戦！

せっかく初めて使う機会なので使い方を覚えるために、テンプレートを使用せずに一から自分で作って見ることにしました。

PowerPointユーザがKeynoteを使ってみた感想はちょっと長そうなので、また別の記事で。今回はデザインの部分だけを簡単に。

### 配色選び

**配色選びには[Palettable](https://www.palettable.io)というサイトをよく使っています。** ![f:id:ikmbear:20201025110511p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025110511.png) 

このサイトでは表示された色に「Like」「DisLike」を選択していくだけで、自分の好きな色を使ったよさげなカラーパレットが出来上がります。

今回はRubyMineのブランドカラーから、「赤系」と「黒系」をマストでチョイス。加えて配色の裏テーマとして、「錦鯉」を選び、錦鯉にはいってそうな色を「Like」していきました。（鯉の登竜門伝承と「はじめてのLT会は、LTの登竜門」というところでシンパシーを感じたのです😅） ![f:id:ikmbear:20201025110905p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025110905.png) 

というわけでできたカラーパレットがこちらです。実際には一番右は使っていなかったり、ディスプレイをみて赤の彩度を調整したりしてます。 ![f:id:ikmbear:20201025110732p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025110732.png) 

### レイアウトを考える

今回のレイアウトはそんなに複雑ではないですが、一応ポイントはやっぱり「錦鯉」です笑。

錦鯉の丸い模様をスライドのあしらいとして利用しました。なので表紙のスライドはこんな作りになっています。 ![f:id:ikmbear:20201025123724p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025123724.png) 

他にアクセントとして使っているのはふきだしですが、こちらはデザイン研究所というデザインのいろはを教えてくれるアカウントが呟いていた「プロっぽい$1の話」を参考に作りました。

[2日で1万人のフォロワーが増えた？ 話題の吹き出しデザインをプロっぽくするテクニック「プロと初心者のフキダシの違い」 - Togetter](https://togetter.com/li/1608390)

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Ftwitter.com%2Fdesignkenkyujo%3Fs%3D20" title="デザイン研究所 (デザ研) (@designkenkyujo) | Twitter" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [twitter.com](https://twitter.com/designkenkyujo?s=20)

# スライド完成！練習

## 1人web発表会

今回はオンラインでの登壇なので（もちろん初）、見ている側の見え方を探るためにPC2台を用意し、zoomでプレゼンしてみました。

すると当然ですが、**オンライン故にスライドをめくるところにタイムラグがある**ことが判明。

 ![f:id:ikmbear:20201025112428p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025112428.png) 

上図のような**いわゆるLTっぽい、秒で通過するスライドが非常に使いづらい（話すタイミングとスライド切り替えのタイミングが若干ずれる）ことがわかった**ので、ほとんど消しました。

## keynoteのスライドショー記録機能で録音

 ![f:id:ikmbear:20201025112655p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025112655.png)  ![f:id:ikmbear:20201025112816p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025112816.png) 

keynoteにはスライドショーを記録してくれる機能があります（再生 \> スライドショーを記録）。これを使うと、スライドの切り替えと音声を記録してくれます。

自宅でmacで録音→iCloudで自動同期されるので、通勤中にiPadで確認、という感じでセmacビューを実施（iPadでは録音はできませんが、同じように全画面再生が可能）。

**話していて練習不足以外で詰まるところは、そもそも論に無理がある**ので、スライドを適宜修正しました。

## お風呂で練習

とはいえ嫁さんも家にいるので、録音を大体的にするのは恥ずかしかったりします。なので、お風呂でプレゼンの練習もしております。

中学で生徒会長をやっているときから、演説の前には毎回お風呂で練習していたのですが、これがなんだかんだ一番きいている気がしますね〜。

# 当日リハーサル

当日の本番直前に配信テストをやったのですが、その際に**表示されるスライドが思いのほか小さいことに気がつきました**。

そこそこデカイ字で書いていたつもりですが、見えない可能性を危惧して、本番開始前に少しだけ画像やフォントサイズを大きくしました。

これがSpeakerDeckに上げている版。 ![f:id:ikmbear:20201025114310p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025114310.png) こっちが当日用に大きくしたスライド。 ![f:id:ikmbear:20201025114247p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025114247.png) 

ここらへんは前回のLT会の動画をみていれば気づけたので、もうちょっと研究しておくべきでした。

# 本番！たのしかったLT会！

いよいよ本番。緊張しましたが、なんとか喋り切ることができました！（なんだかんだ本番が一番つまらずに喋ることができたという😅）

この発表の後に、何人かRubyMineを試している方がいらっしゃって、「自分の経験したこと、調べたこと」が誰かの役に立つんだ！ととてもうれしく思いました😆

皆さんも「自分のレベルでは話すことなんてないな」と思わず、**「自分の経験を自分の言葉でアウトプットすれば、まず自分の知識が深まる！そしてきっと誰かの役に立つ。」**と思ってぜひLTに登壇してみてください！

# おまけ。RubyMineのはじめの一歩。

LT後の懇親会で、「どうやってRubyMineの使い方を覚えました？」と聞かれたので、ざっくりと。

## 公式ヘルプをみる

 ![f:id:ikmbear:20201025115517p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025115517.png) [RubyMine 入門 - 公式ヘルプ | RubyMine](https://pleiades.io/help/ruby/get-started.html#gsc.tab=0)

RubyMineには公式で日本語ヘルプがあります。インストール含めて必要な機能は大体ここにあるので、まずはここを見るのがいいと思います。

## 日本語化$1を入れる

 ![f:id:ikmbear:20201025115905p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025115905.png) 

RubyMineを日本語にするには、日本語化パッケージを別途配置して設定ファイルに記述する方法と$1を使用する方法があるのですが、後者がおすすめです。

どちらも日本語訳の範囲と訳語のレベルはそこまで変わらないのですが、$1の場合は切り替えが楽（設定の書き換えが不要）だというメリットがあります。

機能を知りたい！という意味では日本語の方がわかりやすいのですが、プログラミングで使う用語は英語の方がわかりやすいことが多いです。例えば、「属性アクセサー」より「attribute accessor」の方が個人的にはわかりやすい気がします（人によるのかもですが...）。

 ![f:id:ikmbear:20201025120415p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025120415.png) 

こういうときに気軽に言語をスイッチできた方が個人的には便利かな〜と思うので、$1の方がおすすめです！

## KeyPromoterXを導入する

RubyMineではどんなことでもShift二回押せば検索できるのですが、より適切なショートカットを覚えて直接起動できた方が、効率的に作業できます。

ショートカット を覚えるのに便利な$1が「KeyPromoterX」です。 ![f:id:ikmbear:20201025120918p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025120918.png) 

この$1は、ショートカットが割り当てされているメニューをクリックで起動すると、そのショートカットと今までショートカット を忘れた回数を表示してくれます。

[RubyMine 公式ショートカット一覧 (日本語版) Mac](chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/index.html)と一緒にショートカットを覚えるのがおすすめです！

## 今日のTipsを確認する

 ![f:id:ikmbear:20201025121247p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025121247.png) 

ヘルプメニューの中に今日のTipsということで、RubyMineの便利機能を教えてくれるメニューがあります（非表示にしていなければ起動時に勝手に出現するはず）。

 ![f:id:ikmbear:20201025121417p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20201025/20201025121417.png) 

開発の息抜きがてら、「こんな機能あるのね〜」と覚えてみるのもいいかもです。

---

以上、初めてのLT会参加レポでした〜。

# 参考

## 調査の過程で読んだ記事

- [IntelliJ IDEA / RubyMine のいいところ - Speaker Deck](https://speakerdeck.com/morizyun/rubymine-falseiitokoro?slide=5)
- [RubyMineで幸せになったエンジニアの話. はじめまして。エンジニア山本(女)です。… | by 株式会社ジラフ | Medium](https://medium.com/@jiraffestaff/rubymine%E3%81%A7%E5%B9%B8%E3%81%9B%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%9F%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%AE%E8%A9%B1-613266cd92c1)
- [【必読】開発者が「RubyMine」を使ってはいけない4つの理由【JetBrains】 - pavlog](https://www.pavlog.tokyo/entry/rubymine-preview)
- [IntelliJ IDEAのいいところ10選 - 無理しない感じ](https://hogesuke.hateblo.jp/entry/2014/08/10/031812)
- [IntelliJ IDEAをもっと便利で使いやすく！ つまずきがちな設定や、便利な機能を細かに解説します。 - エンジニアHub｜若手Webエンジニアのキャリアを考える！](https://employment.en-japan.com/engineerhub/entry/2020/01/09/103000)
- [IntelliJ IDEAをもっと便利で使いやすく！ つまずきがちな設定や、便利な機能を細かに解説します。 - エンジニアHub｜若手Webエンジニアのキャリアを考える！](https://employment.en-japan.com/engineerhub/entry/2020/01/09/103000#IntelliJ-IDEA%E3%81%AF%E6%9C%89%E5%84%9F%E3%81%AEIDE)
- [複数言語を使うならRubyMine/IntelliJオススメ！ | 酒と涙とRubyとRailsと](https://morizyun.github.io/blog/intellij-rubymine-jetbrain-good-point/)
- [ここが好きだよIntelliJ - Qiita](https://qiita.com/akiko-pusu/items/1caa46bb1fd2f0c60916)
- [Rails専門エディタRubyMineを購入した理由 - Kei178's blog](https://kei178.me/programming/1143/)
- [RubyMine が気になる人に捧ぐ、ざっくり入門編 - Qiita](https://qiita.com/ruzia/items/2edd8d45c16ac2c70dd7)
- [#JetBrainsIDEテクニック Presentation Assistant | 株式会社サムライズム](https://samuraism.com/2020/09/13/11795)
- [RubyMineで簡単に行ごとのコミットログを見る方法 (Annotate,Blame) - Qiita](https://qiita.com/spring_aki/items/04c229a771e44396c4fd)
- [RubyMineでリファクタリングいくつか - Qiita](https://qiita.com/mnuma/items/05b6cb759e880a09bef5)
- [RubyMineアドベントカレンダー2014で集まった質問に回答します - Qiita](https://qiita.com/jnchito/items/762595fad3aff6d00c19)
- [知らないと損?RubyMine(IntelliJ)で役立つ細かいテクニック７つ - Qiita](https://qiita.com/Avene/items/756c17f87d28d2ee47a4#%E3%83%9E%E3%83%8B%E3%82%A2%E3%83%83%E3%82%AF%E3%81%A0%E3%81%91%E3%81%A9%E8%B6%85%E4%BE%BF%E5%88%A9%E3%81%AA%E3%82%B3%E3%83%BC%E3%83%89%E3%82%B8%E3%83%A3%E3%83%B3%E3%83%974%E3%81%A4)
- [PhpStorm 2020.1からの日本語化は純正のJapanese Language Packプラグインがいいみたい - Qiita](https://qiita.com/ABE_TAKASHI/items/fc3c5432d22d7b4bcf36)
- [RubyMineでコミットメッセージだけをamendで修正する方法 - Qiita](https://qiita.com/jnchito/items/a3bf917947d87b0b41ac)
- [JetBrains エディターの便利な機能まとめ(RubyMineで検証) - Qiita](https://qiita.com/Sayatam/items/2ae8bc47386e9ac21a31)
- [RubyMineで条件付きブレイクポイントを使いこなす方法 - もちゅろぐ](https://blog.mothule.com/tools/rubymine/tools-rubymine-how-to-conditioned-breakpoint)
- [RubyMine：Macで日本語対応 - Qiita](https://qiita.com/iwaseasahi/items/e59ac503373adf1a7f11#:~:text=%E6%A6%82%E8%A6%81,%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82)
