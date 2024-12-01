---
title: slidevでスライドの進捗に応じたプログレスバーを表示する
draft: false
publishDate: 2023-10-09
category: tech
tags:
  - Slidev
  - Vue
---



Slidevでスライドを作成する際に、現在のページを表示しつつ、全体に対する進捗をプログレスバーとして表示したいと思い作ってみました。

Slidevではglobal-bottom.vueというファイルを作成すると、自動ですべてのスライドにそのコンポーネントがレンダリングされます。

以下の内容をglobal-bottom.vueとして配置することで、プログレスバーを表示できます。

```vue
<script setup lang="ts">
import { computed } from 'vue';

const r = 40
const strokeWidth = 11
const circumference = 2 * Math.PI * r

const progress = computed(() => {
  return ($slidev.nav.currentPage / $slidev.nav.total) * circumference;
});

const offset = computed(() => {
  return circumference - progress.value;
});
</script>

<template>
  <footer class="abs-br m-3">
    <svg w-8 viewBox="0 0 100 100">
      <circle class="base-circle" cx="50" cy="50" :r="r" fill="none" :stroke-width="strokeWidth" />
      <circle class="progress-circle" ref="progressCircle" cx="50" cy="50" :r="r" transform="rotate(-90 50 50)" fill="none" :stroke-width="strokeWidth" :stroke-dasharray="circumference" :stroke-dashoffset="offset"/>
      <text class="progress-text" font-size="9" x="50" y="52" dominant-baseline="middle" text-anchor="middle">{{ $slidev.nav.currentPage }}</text>
    </svg>
  </footer>
</template>

<style>
// 色は適当に調節してください
:root {
  --bg-stroke-color: #e2e8f0;
  --progress-stroke-color: #b91c1c;
  --text-fill-color: #020617;
}

.base-circle {
  stroke: var(--bg-stroke-color);
}

.progress-circle {
  stroke: var(--progress-stroke-color);
}

.progress-text {
  fill: var(--text-fill-color);
}
</style>
```
![プログレスバーのデモ](https://ikuma.assets.newt.so/v1/92ed761f-0500-41e5-b403-23e730301de4/Arcat2023-10-09-20.56.58.gif)
