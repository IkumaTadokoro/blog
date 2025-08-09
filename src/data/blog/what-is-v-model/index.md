---
title: "v-modelとはなにか"
publishDate: 2022-06-21
category: tech
draft: false
description: "過去ブログからの移行記事"
tags: []
---
バージョンによる挙動の違いやカスタムコンポーネントで使用する際に、`v-model`の挙動が5秒くらいわからないときがありました。

1秒以内で`v-model`を利用したコードを読めるように、未来の自分に向けて`v-model`を説明しておきます。

## v-modelの概要

`v-model`はVuejsのディレクティブの1つで、主にフォーム入力バインディングの文脈で利用されます。

`v-bind`ディレクティブと`v-on`ディレクティブをまとめて書くためのシンタックスシュガーであり、`v-model="hoge"`の形式でリアクティブな変数`hoge`にフォームの値を束縛し、入力相当のイベント（`input`とか`change`とか）発火時に入力値を`hoge`に代入するという動きをします。

`v-model`理解のためにはシンタックスシュガーを分解するのがよいのですが、Vue2とVue3で使用する変数名が異なるので、別々に解説します。

### Vue 2系におけるv-model

```vue
<input v-model="inputText">
```

これはVue2系の場合、次のシンタックスシュガーになります。

```vue
<input :value="inputText" @input="inputText = $event.target.value">
```

`:value`は`v-bind:value`のショートハンド、`@input`は`v-on:input`のショートハンドです。

 読み下すと、「このフォームに`value`という変数を束縛し、`input`イベント時に`$event.target.value（入力値）`を`value`に設定する」という意味になります。

Vue2系でのv-modelのデフォルト値は

- プロパティ名：`value`
- イベント名：`input`

となっています。これはあくまでデフォルトであって変更することもできますが、それは後述のカスタムコンポーネントの章で紹介します。

### Vue 3系におけるv-model

```vue
<input v-model="inputText">
```

これはVue3系の場合、次のシンタックスシュガーになります。

```vue
<input :modelValue="inputText" @update:modelValue="inputText = $event.target.value">
```

Vue2系との差分はプロパティ名とイベント名です。

- プロパティ名：`modelValue`
- イベント名：`update:modelValue`

1つのコンポーネント内でシンプルに`v-model`を使用している場合は問題ないのですが、複数のコンポーネントで`v-model`で定義した値をやりとりしたり、イベントで発火する処理を変更する場合はVue2と同様にすると動かないので注意が必要です。

こちらもVue2同様、あくまでデフォルトの値ですが、それは後述のカスタムコンポーネントの章で紹介します。


## カスタムコンポーネントでv-modelを使用する

ここまでは単一のコンポーネントで使用するケースを確認してきました。

```vue
<input v-model="inputText">
```


これだけならだいぶ理解もしやすいのですが、カスタムコンポーネントに対して`v-model`を使用するとなると一瞬理解のスピードが落ちるのでここで解説します。

```vue
// カスタムコンポーネントでは値をどうやって受け取る?
<MyCustomComponent v-model="inputText" />
```

基本的な考え方は結局のところ「props down, event up」です。各バージョンごとに詳細を確認します。

### Vue2系概要

先述のようにVue2では`v-model`は次のシンタックスシュガーです。

```vue
<MyCustomComponent :value="inputText" @input="inputText = $event.target.value">
```

そのため、子コンポーネント側でこの`inputText`（親で`v-model`に渡した値）を変更するには、次の要件を満たす必要があります。

1. propsで`value`という名前で`inputText`を受け取る（props down）
2. 値が変更されたタイミングで、新しい値とともに、親コンポーネントの`input`イベントを発火する（event up）

いくつか書き方があるので、それぞれ見ていきます。

#### Vue2: Optins API

**愚直に受け取る**

```vue
<template>
  <input :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  name: 'MyCustomComponent',
  props: {
    value: {
      require: true,
      type: String
    }
  },
}
</script>
```

シンプルに`value`をpropsとして受け取り、子コンポーネント内の`input`イベントで親の`input`イベントを`emit`します。

**modelオプションを指定して受け取る**

Vue2系では`model`オプションを指定することができます（Vue3では廃止）。これを指定することで、子コンポーネント側で`v-model`を受け付ける際に、`v-model`のプロパティ名とイベント名を変更することができるようになります。

```vue
<script>
// プロパティ名がvalueからvalueOfModelに、イベント名がinputからvalueOfModelEventに変更される
model: { prop: 'valueOfModel', event: 'valueOfModelEvent' }
</script>
```

これを利用することで、先程のコードを次のように修正することができます。

```vue
<template>
  <input :value="valueOfModel" @input="$emit('valueOfModelEvent', $event.target.value)">
</template>

<script>
export default {
  name: 'MyCustomComponent',
  model: { prop: 'valueOfModel', event: 'ValueOfModelEvent' },
  props: {
    valueOfModel: {
      require: true,
      type: String
    }
  },
}
</script>
```

なお、この場合でも親コンポーネント側の呼び出し（`v-model=xxx`）は変わりません。あくまでカスタムコンポーネント側で受けた`v-model`をどう処理するかの名前を変更するだけです。

**v-modelと双方向算出プロパティで受け取る** 

算出プロパティ`computed`を用いることで、カスタムコンポーネント内の記述でも`v-model`を使用することができるようになります。

以下の手順で説明します。

1. `computed`のsetter
2. 子コンポーネントでのprops直接編集禁止
3. v-modelと双方向算出プロパティで親のv-modelに子もv-modelでアクセスする

---

**1.`computed`のsetter**

`computed`はプロパティ名のみを指定した場合、getter関数として定義されますが、明示することでsetterを定義することもできます。

```vue
<script>
export default {
  // ...
  computed: {
    fullName: {
       // getterの定義
       get() {
         return `${this.firstName} ${this.lastName}`}
       },
       // setterの定義
       set(newValue) {
	     const [newFirstName, newLastName] = newValue.split(' ')
         this.firstName = newFirstName
         this.lastName = new LastName
       }
    }
  }
}
</script>
```

この仕組みを利用すると、直接編集できないなんらかの値に対して、リアクティブ性を損なわずに参照と編集を行うことができるようになります。


**2.子コンポーネントでのprops直接編集禁止**

もともとサンプルとして出していたカスタムコンポーネントに戻りましょう。

```vue
<template>
  <input :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  name: 'MyCustomComponent',
  props: {
    value: {
      require: true,
      type: String
    }
  },
}
</script>
```

inputタグの部分でやっていることが`v-model`と同じっぽいのでこれを`v-model`に置き換えてみます。

```diff vue
<template>
-  <input :value="value" @input="$emit('input', $event.target.value)">
+  <input v-model="value"> 
</template>

<script>
export default {
  name: 'MyCustomComponent',
  props: {
    value: {
      require: true,
      type: String
    }
  },
}
</script>
```

この実装をすると一見良さそうな感じもしますが、これではVue側で「親の値を直接変更すると、再レンダリングのたびに値が上書きされる」といった警告が出てしまいます。親から貰ってきた値を子が直接編集できてしまうと、複数のコンポーネントで同じようなことをやった時に収集がつかなくなります。

なので、`v-model`のシンタックスシュガーの恩恵を受けつつ、算出プロパティを用いて間接的に値を編集します。


**3.v-modelと双方向算出プロパティで親のv-modelに子もv-modelでアクセスする**

まずは`v-model`に直接紐づけられている親の`value`を別の値に変更します。

```diff vue
<template>
-  <input v-model="value"> 
+  <input v-model="innerValue">
</template>

<script>
export default {
  name: 'MyCustomComponent',
  props: {
    value: {
      require: true,
      type: String
    }
  },
}
</script>
```

このままでは定義が値の定義がされていないので、算出プロパティで「getterでは親のvalueの値を表示する、setterでは親のinputイベントを発火する」ように定義します。

```diff vue
<template>
  <input v-model="innerValue">
</template>

<script>
export default {
  name: 'MyCustomComponent',
  props: {
    value: {
      require: true,
      type: String
    }
  },
+ computed: {
+   innerValue: {
+     get() {
+       return this.value
+     },
+     set(newValue) {
+       this.$emit('input', newValue)
+     }
+   }
+ }
}
</script>
```

これによりこのコンポーネントの`innerValue`は次のように動作するようになります。

1. （親の）`v-model`で定義した値が`props`として子に渡る
2. `innerValue`の`getter`で親の`value`を表示する
3. `input`タグに値を入力すると、`innerValue`の`setter`で`newValue`を引数に親の`input`イベントが発火する
4. 親コンポーネントの`v-model`で定義した値が変更される

... 1に戻る

もちろんVue2系であれば、この方法の中でもmodelオプションを利用することもできます。

#### Vue2: Composition API

CompositionAPIの場合も同じです。modelオプションを使用することもできます。一例として算出プロパティを利用する例をComposition APIに書き換えてみます。

```vue
<template>
  <input type="text" name="name" v-model="innerValue">
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  name: 'MyInputComposition',
  model: { prop: 'modelValue', event: 'update:modelUpdate' },
  props: {
    label: {
      require: true,
      type: String
    },
    modelValue: {
      require: true,
      type: String
    }
  },
  setup (props, { emit }) {
    const innerValue = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        emit('update:modelUpdate', newValue)
      }
    })

    return {
      innerValue
    }
  }
}
</script>
```

### Vue3系概要

Vue3では`v-model`は次のシンタックスシュガーです。

```vue
<MyCustomComponent :modelValue="inputText" @update:modelValue="inputText = $event.target.value">
```

そのため、子コンポーネント側でこの`inputText`（親で`v-model`に渡した値）を変更するには、次の要件を満たす必要があります。

1. propsで`modelValue`という名前でinputTextを受け取る（props down）
2. 値が変更されたタイミングで、新しい値とともに、親コンポーネントの`update:ModelValue`イベントを発火する（event up）

またVue2との変更点として、modelオプションが廃止されました。その代わりにv-modelに引数を取ることができます。

例えばカスタムコンポーネントの呼び出し側で

```vue
<MyCustomComponent v-model:title="inputText" >
```

とした場合、これは次と同じ意味になります。

```vue
<MyCustomComponent :title="inputText" @update:title="inputText" >
```

ちょうどデフォルト値の`modelValue`の部分が指定した引数に置き換わるような形です。

次に各APIでのカスタムコンポーネントの書き方を見ていきます。簡略化のため、引数は用いずにデフォルト値で実装します。

#### Vue3: Options API

```vue
<template>
  <input type="text" name="options" v-model="innerValue">
</template>

<script>
export default {
  name: 'MyInputOptions',
  props: {
    modelValue: {
      type: String
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.modelValue
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
}
</script>
```

算出プロパティを使用した形式ですが、Vue2で使用していた他の形式も使用できます（ただしmodelオプションは使えません）。

差分としては先述のプロパティ名とイベント名です。

#### Vue3: Composition API

Vue3.2.26からは`script setup`構文が使えて、基本的にはこれが推奨されているので、その形式で書き直してみます。

```vue
<template>
  <input type="text" v-model="innerValue">
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'

interface Props {
  modelValue: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const innerValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue: string) {
    emit('update:modelValue', newValue)
  }
})
</script>
```

一部tsが入ったことでPropsとEmitsの型が追加されましたが、冗長なreturn文が消えてスッキリしました。

## v-modelの修飾子

v-modelでは`v-model.modifier`の形式で修飾子を補うことで、v-modelにbindしている値を任意の形式に変換することができます。

### Vue 2系

Vue2では組み込みの修飾子3種類のみが定義されています。

- `.trim`：入力から空白を取り除く
- `.number`：入力をnumberへ型キャストする。
- `.lazy`：inputイベントではなく、changeイベントでイベントを発火する

### Vue 3系

Vue3では上記の3種類の組み込み修飾子に加えて、カスタム修飾子を定義することもできるようになりました。

公式のサンプルにもある、最初の一文字を大文字にする`capitalize`修飾子を実装します。

**親コンポーネント**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import MyVModelModifier from './components/MyVModelModifier.vue'
const text = ref('')
</script>

<template>
  <MyVModelModifier v-model.capitalize="text"></MyVModelModifier>
  {{ text }}
</template>
```

**子コンポーネント**

```vue
<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

const emitValue = (e) => {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>
```

`v-model.modifier`の形式で記述すると、`modelModifiers`というpropが使用できるようになります。例えば、`capitalize``をmodifierの位置に指定すると、

```javascript
modelModifiers = {
  capitalize: true
}
```

という具合にtrueを値に持つプロパティが作成されます。Vue側が提供するのはこのフラグ的な機能のみで、これを利用して実際にv-modelに紐づいたイベントで期待する処理（ここでは大文字にする処理）を実装する形式になります。

## 感想

ちょっと前までずっと`script setup`で書いていたので、久しぶりにOptionsAPIだったり3.2.26以下のCompositionを触る機会でちょっと頭がこんがらがりました（「あれ、これVue3から使えるのか？CompositionAPIだから使えるのか？3.2.26以上で使えるのか？」など）。

今回整理したので、これでしばらくは大丈夫でしょう！
