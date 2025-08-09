---
title: "herokuのOAuthトークン流出の行方まとめ"
publishDate: 2022-07-06
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
HerokuのOAuthトークン流出からしばらく経って、「あれ、これって今どういうステータスなんだ？」と思ったので、調べてみました。

## 要約

2022年4月にTravis CIのOAuthトークン流出からはじまったHerokuのインシデントは2022年5月30日で収束し、現在はGitHubとの連携も再開している。

## 時系列

| 日付（UTC)                 | イベント                                                                   |
|-------------------------|------------------------------------------------------------------------|
| 時系列不明                   | 攻撃者がTravis-CIのOAuthトークンを用いた攻撃を行う                                       |
| 2022-04-07              | 攻撃者がHerokuのデータベースにアクセスし、OAuth Appのトークンおよび一部ユーザーのConfig Varsをダウンロード     |
| 2022-04-09              | 攻撃者がHerokuのOAuthトークンを用いてプライベートリポジトリをダウンロード                             |
| 2022-04-13              | GitHubからHerokuに対して通知                                                   |
| 2022-04-13              | Herokuが漏洩したOAuthトークンを無効化                                               |
| 2022-04-15              | Herokuが調査している旨を公開                                                      |
| 2022-04-16              | HerokuがGitHubと統合しているOAuthトークンを無効にする旨を発表                                |
| 2022-04-17              | HerokuがすべてのOAuthトークンの失効を完了                                             |
| 2022-04-19 ~ 2022-05-03 | Herokuが頑張っている報告が続く                                                     |
| 2022-05-05              | Herokuがすべてのユーザーのパスワードをリセット開始                                           |
| 2022-05-07              | Herokuがすべてのユーザーのパスワードのリセットを完了。セキュリティベンダーとの調査で2022-04-14以降、不正アクセスはないと発表 |
| 2022-05-25              | HerokuがGitHubとの連携を再開                                                   |
| 2022-05-30              | 調査終了の報告                                                                |


## 詳細

Heroku Statusの一件ずつ機械翻訳して追っていきます。

### 2022-04-15: 調査開始

> At Salesforce, trust is our number one value. We're actively investigating a report received on April 13, 2022, from GitHub that a subset of Heroku’s GitHub private repositories, including some source code, were downloaded by a threat actor on April 9, 2022. We proactively notified our Heroku customers regarding this issue and will continue to provide updates to assist them as the investigation continues. If Salesforce or GitHub becomes aware of unauthorized access to customer GitHub repositories connected to Heroku, we will notify affected customers by email without undue delay.

> セールスフォースでは、信頼が第一の価値観です。2022年4月13日にGitHubから受け取った、一部のソースコードを含むHerokuのGitHubプライベートリポジトリのサブセットが、2022年4月9日に脅威行為者によってダウンロードされたという報告について、積極的に調査を行っています。当社は、この問題についてHerokuのお客様に積極的に通知し、調査が進むにつれて、お客様を支援するための最新情報を提供し続けます。Herokuに接続されているお客様のGitHubリポジトリへの不正アクセスをSalesforceまたはGitHubが認識した場合、影響を受けるお客様に電子メールで過度の遅滞なく通知します。

### 2022-04-15: 概要発表。OAuthトークン流出

> On April 13, 2022, Salesforce Security was notified by GitHub that a subset of Heroku’s GitHub private repositories, including some source code, was downloaded by a threat actor on April 9, 2022. Based on Salesforce’s initial investigation, it appears that unauthorized access to Heroku's GitHub account was the result of a compromised OAuth token. Salesforce immediately disabled the compromised user’s OAuth tokens and disabled the compromised user’s GitHub account. Additionally, GitHub reported that the threat actor was enumerating GitHub customer accounts using OAuth tokens issued to Heroku’s OAuth integration dashboard hosted on GitHub. Based on the information GitHub shared with us, we are investigating how the threat actor gained access to customer OAuth tokens. The compromised tokens could provide the threat actor access to customer GitHub repos, but not customer Heroku accounts. With the access to customer OAuth tokens, the threat actor may have read and write access to customer GitHub repositories connected to Heroku. Given the incident is still active, please review the recommended actions provided below.

> 2022年4月13日、Salesforce SecurityはGitHubから、一部のソースコードを含むHerokuのGitHubプライベートリポジトリのサブセットが、2022年4月9日に脅威行為者によってダウンロードされたことを通知されました。Salesforceの初期調査によると、HerokuのGitHubアカウントへの不正アクセスは、侵害されたOAuthトークンの結果であったと思われます。Salesforceは直ちに漏洩したユーザーのOAuthトークンを無効化し、漏洩したユーザーのGitHubアカウントを無効化しました。さらに、GitHubは、脅威者がGitHubにホストされているHerokuのOAuth統合ダッシュボードに発行されたOAuthトークンを使用してGitHubの顧客アカウントを列挙していたことを報告しました。GitHubが教えてくれた情報に基づき、我々は脅威者が顧客のOAuthトークンにアクセスした方法を調査しています。漏洩したトークンは、脅威者が顧客の GitHub リポジトリにアクセスすることはできても、顧客の Heroku アカウントにはアクセスできない可能性があります。顧客OAuthトークンへのアクセスにより、脅威者はHerokuに接続された顧客GitHubリポジトリへの読み取りおよび書き込みアクセスが可能になる可能性があります。このインシデントはまだアクティブであるため、以下の推奨されるアクションを確認してください。

このタイミングでHerokuとOAuthとの連携の切断が推奨されます。

### 2022-04-16: OAuthトークンの無効化発表

> To mitigate impact from potentially compromised OAuth tokens, we will revoke over the next several hours all existing tokens from the Heroku GitHub integration. We are also preventing new OAuth tokens from being created until further notice. Your GitHub repositories will not be affected in any way by this action.

> OAuthトークンの漏洩による影響を軽減するため、今後数時間以内にHeroku GitHub統合の既存のトークンをすべて失効させる予定です。また、追って通知があるまで、新しいOAuthトークンの作成を禁止しています。この措置により、お客様のGitHubリポジトリが影響を受けることはありません。

### 2022-04-17: すべてのOAuthトークンの失効完了

> At 5:00 p.m. PT on April 16, 2022, Salesforce completed the revocation of all OAuth tokens from the Heroku Dashboard GitHub integration.

> 2022年4月16日午後5時（PT）、SalesforceはHeroku Dashboard GitHubインテグレーションからすべてのOAuthトークンの失効を完了しました。

### 2022-05-05: すべてのパスワードリセット

> Separately, our investigation also revealed that the same compromised token was leveraged to gain access to a database and exfiltrate the hashed and salted passwords for customers’ user accounts. For this reason, Salesforce is ensuring all Heroku user passwords are reset and potentially affected credentials are refreshed. We have rotated internal Heroku credentials and put additional detections in place. We are continuing to investigate the source of the token compromise.

> また、我々の調査により、同じ漏洩したトークンを利用してデータベースにアクセスし、お客様のユーザーアカウントのハッシュ化および塩漬けパスワードを流出させたことも判明しました。このため、Salesforce では、すべての Heroku ユーザーのパスワードをリセットし、影響を受ける可能性のある認証情報をリフレッシュするようにしています。私たちは、社内のHeroku認証情報をローテーションし、追加の検知を実施しました。トークン漏洩の原因については、引き続き調査中です。

### 2022-05-07: 不正アクセスの履歴はないと発表。

> Since our last update, we confirmed that Heroku has completed the necessary password resets. We have no evidence of any unauthorized access to Heroku systems since April 14, 2022. This analysis is based on our investigation to date, backed by a leading third-party security vendor and our extensive threat detection systems.
We also wanted to address a question regarding impact to environment variables. While we confirmed that the threat actor had access to encrypted Heroku customer secrets stored in config var, the secrets are encrypted at rest and the threat actor did not access the encryption key necessary to decrypt config var secrets.

> 前回の更新以降、Herokuは必要なパスワードのリセットを完了したことを確認しました。2022年4月14日以降、Herokuのシステムに対する不正アクセスの証拠はありません。この分析は、大手サードパーティセキュリティベンダーと当社の広範な脅威検知システムに裏打ちされた、これまでの調査に基づいています。
また、環境変数への影響に関する質問にもお答えしたいと思います。脅威者は config var に格納された暗号化された Heroku の顧客秘密へのアクセスを確認しましたが、秘密は静止状態で暗号化されており、脅威者は config var の秘密を解読するのに必要な暗号化キーにアクセスしませんでした。

### 2022-05-25: GitHub連携が有効化される

> We are happy to report that the GitHub integration is re-enabled! You can now reconnect with GitHub and restore your Heroku pipeline functionality, including Review Apps, with newly generated tokens.
> You can connect to GitHub immediately or wait for the enhanced integration as described in this blog post. To re-establish your GitHub connection now, please follow these instructions.

> GitHubとの連携が再有効化されたことをご報告します!GitHubとの再接続が可能になり、新たに生成されたトークンでReview Appsを含むHerokuパイプラインの機能を復元することができるようになりました。
すぐにGitHubに接続することもできますし、このブログポストで説明されているように統合が強化されるのを待つこともできます。今すぐGitHub接続を再確立するには、以下の手順に従ってください。

ブログポストはこれ。色々セキュリティ向上につとめてますよ、とのこと。

- OAuthで要求するスコープを見直すとか
- GitHub Appsへの移行とか
- [RFC 8705 \- OAuth 2\.0 Mutual\-TLS Client Authentication and Certificate\-Bound Access Tokens 日本語訳](https://tex2e.github.io/rfc-translater/html/rfc8705.html)とか。

https://blog.heroku.com/github-integration-update

以下の手順はこれ。普通に再度GitHub接続すればいいみたい。

https://help.heroku.com/UIUA61EH/how-do-i-reconnect-the-github-integration

### 2022-05-31: インシデント終了のお知らせ

> Our investigation has concluded, and as previously mentioned, we restored the GitHub integration on May 25, 2022. We have no evidence of customer impact beyond what has already been reported, including no additional evidence of threat actor activity after April 14, 2022. We will publish details of the attacker’s actions on status.heroku.com the week of June 13, 2022.

> 調査は終了し、前述のとおり、2022年5月25日にGitHubとの連携を復旧させました。2022年4月14日以降、脅威行為者の活動を示す追加の証拠はないなど、すでに報告されている以上のお客様への影響はありません。攻撃者の行動の詳細については、2022年6月13日の週にstatus.heroku.comで公開する予定です。

### 2022-06-15: Follow-up Reportが掲載

> Thank you for your patience and feedback throughout this incident. With the conclusion of our investigation, we are now providing our customers with an overview of the threat actor’s actions. The summary of our investigation includes mitigations and changes we are making to address the evolving threat landscape. For updates on the enhanced GitHub integration, please visit this blog post.

> この件に関しまして、お客様には大変ご迷惑をおかけいたしました。調査の終了に伴い、現在、脅威行為者の行動の概要をお客様に提供しています。調査結果の概要には、進化する脅威の状況に対応するための緩和策と変更が含まれています。GitHubとの連携強化に関する最新情報は、こちらのブログポストをご覧ください。

ブログポストはこれ。2022-05-25のものと同じ。

https://blog.heroku.com/github-integration-update

---

ここからは調べごとのメモです

## OAuthトークンはなぜ盗まれると困るのか？

とりあえずOAuthの理解ができていないといけません。

- OAuthはRFC6749で定義されている認可のためのプロトコル。OAuth2.0はサードパーティアプリケーションによるHTTPサービスへの限定的なアクセスを可能にする認可FW。
- 登場人物はリソースオーナー（私たち）、クライアント（Heroku、Travis CI）、リソースサーバー（GitHub）、認可サーバー（GitHub）
- OAuth認証はOAuthでユーザー情報のAPIを叩いて、それを使ってログインすること
- 認可サーバはリソースオーナーが承諾した場合、リダイレクトURIを介してアクセストークン（誰のリソースがどのような権限に紐づいているか、有効かなどの情報を持つ）をクライアントに渡す

OAuthトークン（アクセストークン）が盗まれると、その発行元であるリソースサーバーに対して、アクセストークンの範囲内でアクセスができてしまうわけです。
HerokuとかTravis CIは大体リポジトリの読み取り権限以上のものをもっているので、privateなnpmのリポジトリのデータが不正ダウンロードされたわけですね。

## Travis CIやHerokuからなぜOAuthトークンが流出したのか？

調べた限りではTravis CIが漏れたのがもともとの原因で、標的型攻撃とのことだったのでそのアクセストークンを使ってHerokuへの攻撃がはじまったという感じっぽいです。

とすると、なぜTravis CIから漏れたのか？なんですが、Hacker Newsに関係ありそうな調査結果がありました。

Unpatched Travis CI API Bug Exposes Thousands of Secret User Access Tokens

記事はクラウドセキュリティファームのAqua社がブログで出しているレポートについて紹介してます。Aqua社は初めて知ったのですが、コンテナセキュリティ製品のAquaも提供していて、日本の代理店とクラスメソッドがパートナー契約をしているので、ある程度信憑性のあるソースとみて良いかと思っています。

https://blog.aquasec.com/travis-ci-security

> 私たち Team Nautilus は、最新の調査において、誰でも過去の平文ログにアクセスできる Travis CI API を通じて、何万ものユーザートークンが公開されていることを発見しました。無料層ユーザーの7億7000万件以上のログが公開されており、そこからGitHub、AWS、Docker Hubといった人気のクラウドサービスプロバイダーに関連するトークン、秘密、その他の認証情報を簡単に抽出することが可能です。攻撃者はこの機密データを利用して、大規模なサイバー攻撃を仕掛けたり、クラウド内で横移動したりすることができます。

どうもこの問題は過去2015年と2019年にも指摘されているみたいなんですが、それに対してTravisCIの対策は

- API呼び出しの速度を遅くさせた
- 昔に比べてマスクされている情報が増えたけど、それでもトークンがマスクされていないバリエーションが20種類ほどある

とだいぶ杜撰な感じで、

- GitHubへのアクセストークン
- AWSへのアクセスキー
- MySQLやPostgreSQLなどのデータベースへのアクセスを許可する、メールやユーザー名、パスワードなどの認証情報セット 
- Docker Hubのパスワード

などなどが実験してみたら取れそうとのことでした（2FAはちゃんとやろうね）。ひええ。

## 参考ソース

- [Incident 2413 \| Heroku Status](https://status.heroku.com/incidents/2413)
- [HerokuのOAuthトークン流出で、やっておくといいことリスト（コメント大歓迎）](https://zenn.dev/hiroga/articles/heroku-incident-2413-checklist)
- [Security alert: Attack campaign involving stolen OAuth user tokens issued to two third\-party integrators \| The GitHub Blog](https://github.blog/2022-04-15-security-alert-stolen-oauth-user-tokens/)
- [The Travis CI Blog: SECURITY BULLETIN; Customer repositories have NOT been accessed](https://blog.travis-ci.com/2022-04-17-securitybulletin)
- [Unpatched Travis CI API Bug Exposes Thousands of Secret User Access Tokens](https://thehackernews.com/2022/06/unpatched-travis-ci-api-bug-exposes.html)
- [Public Travis CI Logs \(Still\) Expose Users to Cyber Attacks](https://blog.aquasec.com/travis-ci-security) 
