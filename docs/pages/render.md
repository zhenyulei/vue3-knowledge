## 14.渲染函数

vue3 区别于 vue2
1、h 现在全局导入，而不是作为参数传递给渲染函数

```js
// Vue 2 渲染函数示例
export default {
  render(h) {
    return h('div')
  }
}
// Vue 3 渲染函数示例
import { h } from 'vue'
export default {
  render() {
    return h('div')
  }
}
```
2、渲染函数参数更改为在有状态组件和函数组件之间更加一致
```js
 setup(props,ctx){
     //...
 }
```
3、vnode 现在有一个扁平的 prop 结构
```js
// 2.x
{
  class: ['button', 'is-outlined'],
  style: { color: '#34495E' },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```
在 3.x 中，整个 VNode props 结构是扁平的，使用上面的例子，下面是它现在的样子
```js
// 3.x 语法
{
  class: ['button', 'is-outlined'],
  style: { color: '#34495E' },
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

[demo32](###)

父组件app.vue
```vue
<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png" />
      <p>父组件：{{msg}}---{{modelValue}}</p>
      <Functional currAge="12"><em>姓名：</em><span>小花</span></Functional>
      <HelloWorld v-model:myModel="msg" v-model:modelValue="modelValue" ></HelloWorld>
  </div>
</template>
<script>
import Functional from './myapp.js';
import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";
export default {
  name: 'App',
  components: {
    HelloWorld,
    Functional
  },
  setup(){
    const msg = ref('我是父组件内容');
    const modelValue = ref("parenter content");
    return {
      msg,
      modelValue
    }
  }
}
</script>
```
子组件内容：

```js
import { h, reactive} from 'vue'
export default {
    setup(props,ctx){
        const state = reactive({
            count: 0
        })
        function increment() {
            state.count++
        }
        return ()=>
            h(`h1`, {
                class: ['button', 'is-outlined'],
                style: { color: 'red' },
                id: 'submit',
                onClick: increment,
                key: 'submit-button'
            }, [
                '信息:'+ state.count +'年龄：'+ props.currAge,
                h(
                    `p`,
                    ctx.attrs,
                    ctx.slots
                )
            ])
    },
    props: {
        currAge:String
    }
}
```

