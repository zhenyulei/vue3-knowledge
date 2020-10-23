## 4.异步组件

异步组件要求使用 defineAsyncComponent 方法创建

由于 vue3 中函数式组件必须定义为纯函数，异步组件定义时有如下变化：

- 新的 defineAsyncComponent 助手方法，用于显式地定义异步组件
- component 选项重命名为 loader
- Loader 函数本身不再接收 resolve 和 reject 参数，且必须返回一个 Promise

父组件 App.vue

```vue
<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png" />
      <button @click="clickMe">点击我</button>
      <HelloWorld v-if="isShow"></HelloWorld>
  </div>
</template>
<script>
import { ref, defineAsyncComponent } from "vue";
export default {
  name: 'App',
  components: {
    HelloWorld: defineAsyncComponent(()=>import('./components/HelloWorld.vue')),
  },
  setup(){
    const isShow = ref(false);
    function clickMe(){
      isShow.value = true
    }
    return {
      isShow,
      clickMe
    }
  }
}
</script>
```

父组件：App.vue
在 Vue 3 中，由于函数式组件被定义为纯函数，因此异步组件的定义需要通过将其包装在新的 defineAsyncComponent 助手方法中来显式地定义 

:::tip
注意在 3G 弱网下进行模拟
:::

[demo17](###)

```vue
<template>
  <div>
      <button @click="clickMe">点击我</button>
      <HelloWorld v-if="isShow"></HelloWorld>
  </div>
</template>
<script>
import { ref, defineAsyncComponent } from "vue";
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 待配置的异步组件
const asyncPageWithOptions = defineAsyncComponent({
  loader:()=>import('./components/HelloWorld.vue'),
  delay: 2000, //展示加载时组件,也就是loading组件的延时时间。默认值是 200 (毫秒)
  timeout: 7000, //如果提供了超时时间且组件加载也超时了，则展示error 组件
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})

export default {
  name: 'App',
  components: {
    HelloWorld: asyncPageWithOptions,
  },
  setup(){
    const isShow = ref(false);
    function clickMe(){
      isShow.value = true
    }
    return {
      isShow,
      clickMe
    }
  }
}
</script>
```
子组件 HelloWorld.vue：

```vue
<template>
  <div>
    <div class="my-content">我是子组件的内容</div>
  </div>
</template>
<script>
import {ref,onMounted,nextTick} from 'vue' 
export default {

}
</script>
```

子组件:LoadingComponent.vue

```vue
<template>
  <div>loading...</div>
</template>
<script>
export default {
    setup(props,cxt){
        console.log('我是loading组件');
    }
}
</script>
```