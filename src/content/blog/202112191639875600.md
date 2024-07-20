---
author: ikuma-t
publishDate: 2021-12-19 10:00:00
modDatetime: 2021-12-19 10:00:00
title: "最近のScrapboxの使い方（2021/12）"
slug: "202112191639875600"
featured: false
draft: false
tags:
  - ツール・ガジェット
  - Scrapbox
description: "最近のScrapboxの使い方（2021/12）"
---

IMAGE: https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015135059.png

 ![f:id:ikmbear:20211015135059p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211015/20211015135059.png) 

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fikmbear.hatenablog.com%2Fentry%2F20211015%2F1634273489" title="最近のScrapboxの使い方（2021/10） - セットプチフォッカ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe>

> [ikmbear.hatenablog.com](https://ikmbear.hatenablog.com/entry/20211015/1634273489)

2ヶ月前にこんな記事を書きましたが、微妙に進化している & LT会でScrapboxについてお話ししたので、現状のカスタマイズをScrapboxと合わせてご紹介します。

- [UserScriptとUserCSS](#UserScriptとUserCSS)

  - [UserScript](#UserScript)
  - [UserCSS](#UserCSS)

- [UserScript](#UserScript-1)

  - [テンプレート](#テンプレート)

    - [仕組み](#仕組み)
    - [日報テンプレート](#日報テンプレート)
    - [じぶんRelease Notesテンプレート](#じぶんRelease-Notesテンプレート)

  - [今日のページに移動するボタン](#今日のページに移動するボタン)
  - [チェックボックスなどを表示する](#チェックボックスなどを表示する)

- [UserCSS](#UserCSS-1)

  - [ピン留めされたページを別の段として表示する](#ピン留めされたページを別の段として表示する)
  - [セクション用の見出しCSS](#セクション用の見出しCSS)

- [運用方法](#運用方法)

  - [概要](#概要)
  - [日報 & ライフログ](#日報--ライフログ)
  - [じぶんReleaseNotes（週報）](#じぶんReleaseNotes週報)
  - [月次ページ](#月次ページ)

- [Scrapbox用クライアント](#Scrapbox用クライアント)

## UserScriptとUserCSS

この記事に記載してあるカスタマイズ内容には、ScrapboxのUserScriptとUserCSSを使っています。

### UserScript

JavaScriptを使ってページを動的にカスタマイズできる機能です。

 ![f:id:ikmbear:20211218223348g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218223348.gif) UserScriptの有効化

有効化：TOP \> User settings \> Extensions \> User Script「Enabled」をオンにする

 ![f:id:ikmbear:20211218223615p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218223615.png) 

自分のユーザーページ（ユーザー名と同じタイトルのページ）に`code:script.js`という形式でコードを定義することで、そのJavaScriptを有効にすることができます（コード変更直後は、一度トップページに戻って、表示されている「再読み込み」的なボタンをクリックする必要があります）。

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fscrapbox.io%2Fhelp-jp%2FUserScript" title="UserScript - Scrapbox ヘルプ" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [scrapbox.io](https://scrapbox.io/help-jp/UserScript)

### UserCSS

CSSを使って見た目をカスタマイズできる機能です。

`settings`というページを作って、`code:style.css`というCSSを書くことで、そのプロジェクトでのみ有効なCSSを定義することができます。

 ![f:id:ikmbear:20211218233446p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218233446.png) UserCSSの設定例

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fscrapbox.io%2Fhelp-jp%2FUserCSS" title="UserCSS - Scrapbox ヘルプ" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe>

> [scrapbox.io](https://scrapbox.io/help-jp/UserCSS)

## UserScript

UserScriptでカスタマイズしている機能を紹介します。

### テンプレート

 ![f:id:ikmbear:20211218233939g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218233939.gif) 

各種テンプレートをボタンクリックで挿入する$1です。

#### 仕組み

テンプレート機能は次の3つから構成されます。

1. テンプレートボタンを追加する機能（UserScript）
2. テンプレートボタンの見た目を編集する機能（UserCSS）
3. 挿入するテンプレート（ただのページ）

**テンプレートボタンを追加する機能**

 ![f:id:ikmbear:20211218235145p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218235145.png) 

```
// UserScriptとしてユーザーページに追加するaddTemplateItemsToPageMenu()  function addTemplateItemsToPageMenu() {    // テンプレートメニューの定義ここから ----------   const __templates = [     { title: '🥞today', url: '/api/code/ikuma-t/template/today.js' },     { title: '🥞tomorrow', url: '/api/code/ikuma-t/template/tomorrow.js' },     { title: '🚀release', url: '/api/code/ikuma-t/template/release.js' }     // メニューを追加する場合は、同じように行を追加する。     // titleにはテンプレートメニューに表示する名前を、urlはそのテンプレートがあるスクリプトのURLを指定する     // `api/code/{自分のユーザー名}/{テンプレートファイルを置いているページ名}/{テンプレート名}.js   ]   // テンプレートメニューの定義ここまで ----------      const __templateMenuTitle = 'Templates'   scrapbox.PageMenu.addMenu({ title: __templateMenuTitle, image: '/assets/img/logo.png', onClick: () => { } })   __templates.forEach((template) => {       scrapbox.PageMenu(__templateMenuTitle).addItem({            title: template.title,           onClick: () => { __loadTemplate(template.url) }})   })      const __loadTemplate = templateUrl => {     if (scrapbox.Page.lines && scrapbox.Page.lines.length == 1) {       const line = document.getElementById('L' + scrapbox.Page.lines[0].id)       const lastChar = line.querySelector('span.char-index:last-of-type')       const textarea = document.getElementById('text-input')       lastChar.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))       textarea.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, cancelable: true, keyCode: 35}))       // テンプレートを読み込む       $('#text-input').load(templateUrl, function (response, status, xhr) {         if (status == "success") {           try {             // 読み込んだテンプレートをテキストエリアにセット             textarea.value = /\.js$/.test(templateUrl) ? eval(response) : response             // テキストエリアのinputイベント             textarea.dispatchEvent(new InputEvent('input', {bubbles: true, cancelable: true}))             console.log("できました")           } catch (ex) {             console.log("だめでした>< \n" + ex)           }         } else {           console.log("だめでした>< \n" + status)         }       })     }   } }
```

**テンプレートボタンの見た目を編集する機能**

 ![f:id:ikmbear:20211218234758p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218234758.png) 

こんな感じにFontAwesomeを使っていい感じのアイコンにします

```
/* UserCSSとしてSettingsページに追加する */a#Templates.tool-btn:hover { text-decoration: none }a#Templates.tool-btn::before { position: absolute; content: '\f067'; font: 900 21px/46px 'Font Awesome 5 Free' }a#Templates.tool-btn img { opacity: 0 }
```

**挿入するテンプレート**

 ![f:id:ikmbear:20211218234852p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218234852.png) 

これは適当なページを作って、そこにテンプレートをコードブロックとして定義するだけです。  
なおJavaScriptで書く必要があります。

ただし、「テンプレートボタンを追加する機能」からアクセスするので、ちゃんとテンプレートごとに別々の名前で定義しておく必要があります。

ページ名についてはなんでも良いのですが、管理がしやすいので「template」というページに設置しています。

以下に自分が作成しているテンプレートのコード例を示します。

#### 日報テンプレート

毎日の日報ページを作成するためのテンプレートです。

```
// today.js (function() {  const today = new Date()  const year = today.getFullYear()  const month = ("0"+(today.getMonth() + 1)).slice(-2)  const date = ("0"+today.getDate()).slice(-2)  const yesterdayDate = ("0"+(today.getDate()-1)).slice(-2)  const tomorrowDate = ("0"+(today.getDate()+1)).slice(-2)   return `　←[${year}/${month}/${yesterdayDate}]：[${year}/${month}/${tomorrowDate}]→　　[{ 日報] [*** 👍やったこと]  [_]  [*** 🎓学習したこと] [** 【わかったこと】] [** 【わからなかったこと】]  [*** 🥷次にやること]  [*** 🍘感想・余談] 　[{ ライフログ]` })()
```

私は毎日明日分の日記を作ってから1日を始めるので、明日分のテンプレートも作っています（ほぼほぼ同じです）。

```
// tomorrow.js (function() {  const today = new Date()  const year = today.getFullYear()  const month = ("0"+(today.getMonth() + 1)).slice(-2)  const date = ("0"+(today.getDate()+1)).slice(-2)  const yesterdayDate = ("0"+(today.getDate())).slice(-2)  const tomorrowDate = ("0"+(today.getDate()+2)).slice(-2)   return `　←[${year}/${month}/${yesterdayDate}]：[${year}/${month}/${tomorrowDate}]→　　[{ 日報] [*** 👍やったこと]  [_]  [*** 🎓学習したこと] [** 【わかったこと】] [** 【わからなかったこと】]  [*** 🥷次にやること]  [*** 🍘感想・余談] 　[{ ライフログ]` })()
```

#### じぶんRelease Notesテンプレート

週/1ペースで書いているじぶんRelease Notesのテンプレートです。  
最近作ったばかりなので、ちょっと荒削りです。

```
// release.js  (function() {   const today = new Date()   const year = today.getFullYear()   const month = ("0"+(today.getMonth() + 1)).slice(-2)   const date = ("0"+(today.getDate()+1)).slice(-2)   const thisWeek = Math.floor(date / 7) + 1   const lastWeek = thisWeek - 1   const nextWeek = thisWeek + 1      const birthDayYear = 1995      const age = year - birthDayYear     return ` 前：[じぶん Release Notes（ver 0.${age}.${month}.${lastWeek}）] 次：[じぶん Release Notes（ver 0.${age}.${month}.${nextWeek}）]  本日[${year}/${month}]/${date}、ikuma-t（ver 0.${age}.${month}.${thisWeek}）がリリースされました  [** 今週の日記]  [*** 📆振り返り（KPT）] [** KEEP]  [** PROBLEM]  [** TRY]  [*** 🍳感想] 　`  })()
```

### 今日のページに移動するボタン

 ![f:id:ikmbear:20211218235744g:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211218/20211218235744.gif) 

別のページを開いているときに、ふと自分の日報ページにメモを残したくなることがあります。そのためのボタンです。

```
  const today = new Date()  const year = today.getFullYear()  const month = ("0"+(today.getMonth() + 1)).slice(-2)  const date = ("0"+today.getDate()).slice(-2)  const formatToday = encodeURIComponent(`${year}/${month}/${date}`)  const menuTitle = 'Daily'   scrapbox.PageMenu.addMenu({    title: menuTitle,    image: 'https://twitter.com/favicon.ico',    onClick: () => window.location.href = `https://scrapbox.io/ikuma-t/${formatToday}`  })
```

こちらも見た目をFontAwesomeにするために、UserCSSを書いています。

```
 a#Daily.tool-btn:hover { text-decoration: none } a#Daily.tool-btn::before { position: absolute; content: '\f783'; font: 900 21px/46px 'Font Awesome 5 Free' } a#Daily.tool-btn img { opacity: 0 }
```

### $1などを表示する

 ![f:id:ikmbear:20211219000106p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211219/20211219000106.png) 

ログを書くための拡張表現をJavaScriptで描画する機能です。どっかから拾ってきたんですけど、どこから拾ったか忘れました。

```
 const tagIconStyles = {    "!" : "{ content: '\\f06a'; color: #F6AE2D }",   /* ひらめき */   "?" : "{ content: '\\f059'; color: #758E4F }",   /* 疑問、要調査 */   "*" : "{ content: '\\f069'; color: #F26419 }",   /* 重要 */      " " : "{ content: '\\f0c8'; color: #08BDBD }",   /* タスク */   "x" : "{ content: '\\f14a'; color: #2489C5 }",   /* 完了タスク */   ">" : "{ content: '\\f14d'; color: lightgrey }", /* 先送りしたタスク */   "<" : "{ content: '\\f274'; color: lightgrey }", /* 日付を決めたタスク */   "e" : "{ content: '\\f192'; color: #F26419 }",   /* イベント */      "good" : "{ content: '\\f164' }",   "bad" : "{ content: '\\f165' }", };  (function(m){   let charSelectors = [], afterLinkSelectors = [], iconStyle = ""   const linkSelFmt = ".line:not(.cursor-line) a[href='./#']:not(.icon)"   const charStyle = "{display:inline-block;width:0;text-indent:-9999px}"   const afterLinkStyle = "{display:inline-block;min-width:1.15em;padding-left:1px;font: 900 110%/normal 'Font Awesome 5 Free';text-align:center}"   const a = "::after", f = " span"   const enc = ['@$&+=:;", ','@$&+=:;",_']   const encode = tag => Array.from(tag).map(c => {      const i = enc[0].indexOf(c)     return -1 < i && enc[1][i] ? enc[1][i] : encodeURIComponent(c) }).join("");   for (var k in m) {     const href = encode(k)     charSelectors.push(linkSelFmt.replace(/#/, href) + f)     afterLinkSelectors.push(linkSelFmt.replace(/#/, href) + a)     iconStyle += linkSelFmt.replace(/#/, href) + a + m[k]   }   let style = document.createElement('style')   style.appendChild(document.createTextNode(charSelectors.join(",") + charStyle))   style.appendChild(document.createTextNode(afterLinkSelectors.join(",") + afterLinkStyle))   style.appendChild(document.createTextNode(iconStyle))   document.head.appendChild(style) })(tagIconStyles)
```

## UserCSS

UserCSSでカスタマイズしている機能を紹介します

### ピン留めされたページを別の段として表示する

 ![f:id:ikmbear:20211219000528p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211219/20211219000528.png) 

Scrapboxではページをピン留めすることで、トップページの最上段に貼り付けられます。  
このCSSはピンされたページだけ別の段として表示するものです。

```
 .page-list-item.pin + .page-list-item:not(.pin) {    clear: both; }
```

### セクション用の見出しCSS

 ![f:id:ikmbear:20211219001027p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211219/20211219001027.png) 

日報に使っているセクション用の見出しを作るCSSです。`[{ 文字 ]`とすることで、見た目が変わります。

```
   .deco-\{, .deco-\} {     font-size: 0.9em;     color: #fff;     background-color: #FB7476;     padding: 0 0.5em 0 0.5em;     margin-bottom: 0.4em;     border-radius: 0.2em;     display: inline-block;     max-width: calc(100% - 100px);     vertical-align: top;   }
```

## 運用方法

### 概要

個別のメモページはそのままページを作っていますが、それ以外のページは以下の4種類です。

- 日報 & $1（毎日）
- じぶんRelease Notes（毎週）
- 月次ページ（毎月作って、毎日更新）
- 年間ページ（毎年作って、毎月更新）

### 日報 & $1

 ![f:id:ikmbear:20211219001408p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211219/20211219001408.png) 

毎日作るページです。

基本的に1日のはじめに「今日やったこと」にやることをタスク形式で書き込みます（UserCSSにより`[_]`と書くことでUserCSSが、`[x]`とすることで完了のUserCSSが、それぞれ描画できます）。

だいたい前日の「次にやること」をコピペしています。

あとはすべての作業を$1以下に書き込んでいき、1日の終わりにこれを日報の各セクションに振り分けて、FJORD BOOT CAMPに提出します。

ScrapboxはMarkdown形式ではないので、変換が必要ですが、これは後述のsbeというアプリで行っています。

### じぶんReleaseNotes（週報）

 ![f:id:ikmbear:20211219002218p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211219/20211219002218.png) 

週の振り返りです。毎週金曜日に書いています。金曜日書く理由は働いている時は土日が最も時間がとれたので、土日をスタートにすると週の計画がうまくいきやすかったからです。

内容は単純なKPTと感想です。あまり無理しないように書いています。また今週の日記を貼り付けて見直す時間にもしています。

### 月次ページ

 ![f:id:ikmbear:20211219002548p:plain](https://cdn-ak.f.st-hatena.com/images/fotolife/i/ikmbear/20211219/20211219002548.png) 

月の日記をまとめたページです。今月の目標と達成確認も簡単に書いています。

11月の途中からですが、日付の横にはその日の気分の絵文字とタイトルを載せています。（これはKPTで提案されたものです）

ここの部分もテンプレート作れるんですが、1ヶ月に一回しかやらないのと、ブラウザのコンソールですぐに作れてしまうので、毎回for文を書いてリンクを作成しています。

## Scrapbox用クライアント

ブラウザでも見られるのですが、[sbe: An unofficial Scrapbox desktop app](https://github.com/kondoumh/sbe)というScrapbox用のクライアントを使っています。

- タブが使える
- 見出し（`[* ]`など）を`⌘` + `1`（数字）で挿入できる
- 右クリックメニューから、Markdownとしてコピーできる

という理由で使っています。他にも色々できるのですが、今のところちゃんと使っているのは上記3つです。

---

以上、最近のScrapboxの使い方（2021/12）でした〜！何かご質問があればTwitterまたはコメントでお願いたします！
