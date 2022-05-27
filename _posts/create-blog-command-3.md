---
title: 'ブログ用のコマンド試作その3'
date: '2022-05-27'
---

初回作成時に2回コマンドを叩くのはめんどいだろうということで、if文を変えた。

```bash
#!/bin/bash

if [ ! -e ~/blog/_posts/$1.md ]; then
    cp ~/bin/template.md ~/blog/_posts/$1.md
    mkdir ~/blog/public/assets/$1
fi

vim ~/blog/_posts/$1.md
cd ~/blog
git add ~/blog/_posts/$1.md
git commit -m "feat: update post"
git push
cd -
```

これで`blog hoge`とすれば、その瞬間に記事を書くことができる。
