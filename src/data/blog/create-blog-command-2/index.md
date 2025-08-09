---
title: "ブログ用のコマンド試作その2"
publishDate: 2022-05-27
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
ブログ用のコマンド試作の続き。もはや保存した瞬間にデプロイしてしまって良いのではと思ったので、ただただgit pushするまでのコマンドを組み込んだ


```bash
#!/bin/bash

if [ -e ~/blog/_posts/$1.md ]; then
    vim ~/blog/_posts/$1.md
    cd ~/blog
    git add ~/blog/_posts/$1.md
    git commit -m "feat: update post"
    git push
    cd -
else
    cp ~/bin/template.md ~/blog/_posts/$1.md
    mkdir ~/blog/public/blog/$1
fi
```

画像とかを入れていきたい場合は微妙な感じがするけど、そういう場合はエディタちゃんと開いてやるし、ターミナルでささっと学習メモをあげるにはこれで十分なのでは？と思っていたりする。
しばらくこれで運用してみます。
