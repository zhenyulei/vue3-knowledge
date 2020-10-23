## 1. 配置环境

使用vite脚手架轻松启动项目：


- npm init vite-app demo-vue3
- cd demo-vue3
- npm install
- npm run dev

:::tip
安装node版本为12.xx，否则低版本node 会导致 build 报错
:::
vue3 挂载元素的方法：

```js
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

对比vue2方法：
```js
import Vue from 'vue'
import App from './app.vue'
export default new Vue({
    el: '#app',
    render: h => h(App)
})
```

