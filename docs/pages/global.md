## 12.全局 API
Vue 2.x拥有大量的全局API与配置，这些全局API与配置可以全局影响到Vue的行为方式。 
例如，你可以通过 Vue.component API 创建一个全局Vue组件

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">点了 {{ count }} 次。</button>'
})
```
类似的，这是一个全局指令的定义方式：

```js
Vue.directive('focus', {
  inserted: el => el.focus()
})
```
诚然这种方式很方便，但它也导致了几个问题。从技术上讲，Vue 2 并没有“应用”的概念。 我们定义的应用只是简单地通过 new Vue() 所创建的一个根Vue实例。 **每一个根实例都是由同一个 Vue 构造器创建的，而它们共用相同的全局配置。**

1)在测试的过程中，全局配置容易意外地污染到其他测试样例

2)我们很难在一个页面内的同个 Vue 副本的不同“应用”上使用不同的全局配置


[vue2-app.ts-全局api示例](###)
```js
Vue.mixin({
    created: function () {
      var myOption = this.$options.el
      if (myOption) {
        console.log(myOption)
      }
    }
})
// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
new Vue({
    el: '#vue',
    render: h => h(MyApp)
})
```

为了避免这些问题，在 Vue 3 中，我们引入了：

**全新的全局API: createApp**

调用 createApp 将返回一个 应用实例，这是一个 Vue 3 中的全新概念。

[vue3-main.js-全局api示例](###)

```js
import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import './index.css'
const app = createApp(App)
app.mixin({
    created: function () {
        if(this.$options.name){
            console.log(this.$options.name);
        }
    }
})
app.mount('#app')

const app2 = createApp(App2)
app2.mount('#vue3')
```

类似的

```js
const app = createApp(MyApp)
app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">点了 {{ count }} 次。</button>'
})

app.directive('focus', {
  mounted: el => el.focus()
})

// 伴随着组件树的作用，现在每一个通过 app.mount() 挂载的应用实例都将获得相同的
// “button-counter” 组件与“focus”指令而无需污染全局环境。
app.mount('#app')
```

如果确实想要共享：

```js
import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App2.vue'

import './index.css'

const createMyApp = options => {
  const app = createApp(options)
  app.mixin({
    created: function () {
        if(this.$options.name){
            console.log(this.$options.name);
        }
    }
  })
  return app
}

createMyApp(App).mount('#app')
createMyApp(App2).mount('#vue3')
```


|2.x Global API|3.x Instance API (app)|
|--|--|
|Vue.config|app.config|
|Vue.config.productionTip|removed|
|Vue.config.ignoredElements|app.config.isCustomElement|
|Vue.component|app.component|
|Vue.directive|app.directive|
|Vue.mixin|app.mixin|
|Vue.use|app.use|
|Vue.filter|removed|

其中filter这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是“只是 JavaScript”的假设，这既有学习成本，也有实现成本。

因此在 3.x 中，filters 已删除，不再受支持。相反，我们建议用方法调用或计算属性替换它们。