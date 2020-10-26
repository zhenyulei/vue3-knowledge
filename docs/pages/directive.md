## 13.自定义指令

在 Vue 2，自定义指令是通过使用下面列出的钩子来创建的，这些钩子都是可选的

[vue2-demo8](###)
子组件
```js
Vue.directive('highlight', {
    //指令绑定到元素后发生。只发生一次。
    bind(el, binding, vnode) {
      el.style.background = binding.value
    },
    inserted(el){
      //元素插入父 DOM 后发生。
      console.log(el.parentNode);
    },
    update(){
      //当元素更新，但子元素尚未更新时，将调用此钩子。
    },
    componentUpdated(){
      //一旦组件和子级被更新，就会调用这个钩子。
    },
    unbind(){
      //一旦指令被移除，就会调用这个钩子。也只调用一次。
    }
})
```

使用方式：
```vue
<template>
  <div>
    <p>父组件内容</p>
    <p v-highlight="'yellow'">高亮显示此文本亮黄色</p>
  </div>
</template>
<script>
import Hello from "./hello.vue"
export default {
  components:{
    Hello
  }
}
</script>
```

在 vue2中API与我们的组件生命周期方法有很大的不同，
所以，在 Vue 3 中，自定义指令中的 API 已重命名，以便更好地与组件生命周期保持一致。

bind---------------beforeMount

inserted-----------mounted

beforeUpdate-------新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。

update-------------移除！有太多的相似之处要更新，所以这是多余的，请改用 updated。

componentUpdated---updated

beforeUnmount------新的！与组件生命周期钩子类似，它将在卸载元素之前调用。

unbind-------------unmounted


[vue3-main-自定义指令：demo28](###)

```js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
const app = createApp(App)
app.directive('highlight', {
    beforeMount(el, binding, vnode) {
        el.style.background = binding.value
    }
})
app.mount('#app')
```

> 疑问：如果自定义指令代码量很多，如何提取到其他文件中呢？

[demo29](###)

局部指令
```vue
<template>
  <div>
    <p>父组件内容</p>
    <input type="text" v-focus/>
  </div>
</template>
<script>
export default {
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus()
      }
    }
  }
}
</script>
```

:::tip
延伸
:::
自定义指令：`<div v-demo="test"></div>`，被编译成：
```vue
{
  onVnodeMounted(vnode) {
    // call vDemo.mounted(...)
  }
}
```
所以可以在元素上直接使用：

在元素上可以直接使用生命周期：

[demo30](###)
```vue
<template>
<div>
     组件的内容
     <br>
     <span 
        @vnodeBeforeMount="mybeforeMount"
        @vnodeMounted="myMounted" 
        @vnodeUpdated="myUpdated"
     >age: {{number}} </span>
  </div>
</template>
<script>
import {onMounted,ref} from 'vue'
export default {
    setup(props,ctx){
        const number = ref(0);
        setTimeout(()=>{
            number.value++;
        },2000)
        function mybeforeMount(){
            console.log('自定义指令');
        }
        function myMounted(el){
            el.el.style.backgroundColor="red"
        }
        function myUpdated(el){
            console.log(el.el);
        }
        return{
            number,
            mybeforeMount,
            myMounted,
            myUpdated
        }
    }
}
```

vue多层传递$attrs

解释：一个组件嵌套了子组件，子组件又嵌套了子组件，而且在父组件里需要自定义的属性很多，传递给子组件的数据很多，但是并不是每一个组件都会用到所以新增一个$attrs这个属性

官方文档说明：
解释：包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。 意思就是父组件往子组件传没有在props里声明过的值时，子组件可以通过$attrs接受，且只包含父组件没有在props里声明的值。

[demo31](###)
父组件

```vue
<template>
  <div class="home">
    <Child31 gender="child" age="22" v-highlight="'green'"/>
  </div>
</template>

<script>
import Child31 from './children/child31.vue'
export default {
  components: {
    Child31,
  },
  directives: {
    highlight: {
      // 指令的定义
      beforeMount(el, binding, vnode) {
        el.style.background = binding.value
    }
    }
  }
}
</script>
```
子组件
```vue
<template>
     <div>gender: {{$attrs['gender']}}</div>
     <div v-bind="$attrs">age: {{$attrs['age']}}</div>
</template>
<script>
import {onMounted} from 'vue'
export default {
    setup(props,ctx){
        onMounted(()=>{
            console.log(ctx);
        })
    }
}
```

:::warning
以下没有看懂？？ 

无法找到attrs上的指令
"组件上自定义指令的规则将与其他无关 attribute 相同：由子组件决定在哪里以及是否应用它。当子组件在内部元素上使用 v-bind="$attrs" 时，它也将应用对其使用的任何自定义指令。"

[相关疑问链接](https://v3.cn.vuejs.org/guide/custom-directive.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8)
:::
