---
title: WhichKeyでVSCodeのショートカットをすいすい叩けるようにする
draft: false
publishDate: 2024-01-06
category: tech
tags:
  - VSCode
  - WhichKey
  - VSCode Extension
---

## はじめに

VSCode を利用し始めてかれこれ1年くらい経ちますが、基本的なものを除いていまいちショートカットが覚えられません。

JetBrains 系のエディタのプラグインにある Key Promoter X の VSCode 版を導入してみたのですが、結局正しいキーはなんなのかがわからずうまくいきませんでした。

これに対し、 Which Key という拡張機能を使うことでショートカットを覚えずに、ショートカットを活用できるようになったので紹介します。

## WhichKey とは

WhichKey は　[VSpaceCode](https://vspacecode.github.io/) という Spacemacs ライクなキーバインドを実現する拡張機能が提供している拡張機能です。

![whichkeyを開いたところ](https://ikuma.assets.newt.so/v1/5834520b-8e50-44c9-87c4-ac430dedf4c2/Codeat2024-01-06-19.03.17.png)

キーバインドに対応したコマンドパレット / チートシート機能を提供します。もともと Emacs に搭載されている機能を VSCode の拡張機能として実装したもののようです。

## インストールと初期設定

VSpaceCodle をインストールしても Which Key は導入されますが、 Whichey 単独でもインストールすることができます。

https://marketplace.visualstudio.com/items?itemName=VSpaceCode.whichkey

私の場合は VSCode NeoVim を利用しているので、以下のようなキー設定を追加して、 `cmd` + `space` で Whichkey が起動するようにしています（`alt` + `space` は Raycast ですでに使っていた）。

```json
{
  "key": "alt+space",
  "command": "whichkey.show",
  "when": "editorTextFocus"
},
```

## メニューのカスタマイズ

表示されるメニューは settings.json で編集することができます。

1つのキーに対して1つのアクションを指定する場合は以下のように設定します。

```json
"whichkey.bindings": [
	{
	  "key": "バインドしたいショートカットキー",
      "name": "任意の名前。メニューで表示される",
      "type": "command",
      "command": "VSCodeのコマンドの名前"
	}
]
```

またショートカットキーをネストさせることもできます。その場合は次のように設定します。

```json
"whichkey.bindings": [
	{
	  "key": "バインドしたいショートカットキー",
      "name": "任意の名前。メニューで表示される",
      "type": "bindings",
      "bindings": [
	    // ...以下単一のアクションを設定する場合と同じシンタックス
      ]
	}
]
```

## WhichKey 自体の設定

WhichKey 自体の挙動を settings.json に指定できます。
冒頭の初期設定で述べた、 whichkey.show もその一例で、すでに説明した通り WhichKey を起動するためのコマンドです。

その他の細かな設定については [Reference | VSpaceCode](https://vspacecode.github.io/docs/whichkey/reference) をご参照ください。
## わたしの Which Key

こんな感じの key bindings を設定しています。

```json
  "whichkey.bindings": [
    {
      "key": "q",
      "name": "Quit",
      "type": "command",
      "command": "workbench.action.closeActiveEditor"
    },
    {
      "key": ";",
      "name": "commands",
      "type": "command",
      "command": "workbench.action.showCommands"
    },
    {
      "key": "a",
      "name": "Toggle Sidebar",
      "type": "command",
      "command": "workbench.action.toggleSidebarVisibility"
    },
    {
      "key": "e",
      "name": "Editors...",
      "type": "bindings",
      "bindings": [
        {
          "key": "d",
          "name": "Close active editor",
          "type": "command",
          "command": "workbench.action.closeActiveEditor"
        },
        {
          "key": "e",
          "name": "Show all editors",
          "type": "command",
          "command": "workbench.action.showAllEditors"
        },
        {
          "key": "f",
          "name": "Focus active editor",
          "type": "command",
          "command": "workbench.action.focusActiveEditorGroup"
        },
        {
          "key": "m",
          "name": "Close other editors",
          "type": "command",
          "command": "workbench.action.closeOtherEditors"
        },
        {
          "key": "n",
          "name": "Next editor",
          "type": "command",
          "command": "workbench.action.nextEditor"
        },
        {
          "key": "p",
          "name": "Previous editor",
          "type": "command",
          "command": "workbench.action.previousEditor"
        },
        {
          "key": "u",
          "name": "Reopen closed editor",
          "type": "command",
          "command": "workbench.action.reopenClosedEditor"
        },
      ]
    },
    {
      "key": "f",
      "name": "Find & Replace...",
      "type": "bindings",
      "bindings": [
        {
          "key": "f",
          "name": "File",
          "type": "command",
          "command": "editor.action.startFindReplaceAction"
        },
        {
          "key": "p",
          "name": "Project",
          "type": "command",
          "command": "workbench.action.replaceInFiles"
        }
      ]
    },
    {
      "key": "g",
      "name": "Git",
      "type": "command",
      "command": "workbench.view.scm"
    },
    {
      "key": "h",
      "name": "Split Horizontal",
      "type": "command",
      "command": "workbench.action.splitEditorDown"
    },
    {
      "key": "m",
      "name": "Toggle Minimap",
      "type": "command",
      "command": "editor.action.toggleMinimap"
    },
    {
      "key": "o",
      "name": "Open File",
      "type": "command",
      "command": "workbench.action.quickOpen"      
    },
    {
      "key": "s",
      "name": "Show search",
      "type": "command",
      "command": "workbench.view.search"
    },
    {
      "key": "x",
      "name": "Show explorer",
      "type": "command",
      "command": "workbench.view.explorer"
    },
    {
      "key": "t",
      "name": "Terminal...",
      "type": "bindings",
      "bindings": [
        {
          "key": "t",
          "name": "Toggle Terminal",
          "type": "command",
          "command": "workbench.action.togglePanel"
        },
        {
          "key": "f",
          "name": "Focus Terminal",
          "type": "command",
          "command": "workbench.action.terminal.toggleTerminal",
          "when": "!terminalFocus"
        }
      ]
    },
    {
      "key": "v",
      "name": "Split Vertical",
      "type": "command",
      "command": "workbench.action.splitEditor"
    },
    {
      "key": "w",
      "name": "Window...",
      "type": "bindings",
      "bindings": [
        {
          "key": "h",
          "name": "Move editor group left",
          "type": "command",
          "command": "workbench.action.moveActiveEditorGroupLeft"
        },
        {
          "key": "j",
          "name": "Move editor group down",
          "type": "command",
          "command": "workbench.action.moveActiveEditorGroupDown"
        },
        {
          "key": "k",
          "name": "Move editor group up",
          "type": "command",
          "command": "workbench.action.moveActiveEditorGroupUp"
        },
        {
          "key": "l",
          "name": "Move editor group right",
          "type": "command",
          "command": "workbench.action.moveActiveEditorGroupRight"
        },
        {
          "key": "t",
          "name": "Toggle editor group sizes",
          "type": "command",
          "command": "workbench.action.toggleEditorWidths"
        },
        {
          "key": "m",
          "name": "Maximize editor group",
          "type": "command",
          "command": "workbench.action.minimizeOtherEditors"
        },
        {
          "key": "d",
          "name": "Close editor group",
          "type": "command",
          "command": "workbench.action.closeEditorsInGroup"
        },
        {
          "key": "x",
          "name": "Close all editor groups",
          "type": "command",
          "command": "workbench.action.closeAllGroups"
        }
      ]
    },
    {
      "key": "z",
      "name": "Toggle Mode...",
      "type": "bindings",
      "bindings": [
        {
          "key": "f",
          "name": "Toggle full screen mode",
          "type": "command",
          "command": "workbench.action.toggleFullScreen"
        },
        {
          "key": "z",
          "name": "Toggle zen mode",
          "type": "command",
          "command": "workbench.action.toggleZenMode"
        }
      ]
    },
  ],
```

## おわりに

WhichKey は見た目もスッキリしているし、ショートカットを忘れずに済むのでおすすめです。ぜひ使ってみてください。