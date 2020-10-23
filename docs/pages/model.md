## 8.v-model的变化

v-model选项中v-bind的 sync 修饰符被移除，统一为v-model参数形式

2.x 中 v-model 语法糖底层使用的是 :value 和 emit(‘input’)， 绑定属性值是 value，子组件可以改变父组件的 props

例如

[vue2-demo5](###)

```vue
<template>
  <div>
    <p>父组件内容：{{msg}}</p>
    <Child5 v-model="msg"></Child5>
  </div>
</template>
<script>
import Child5 from "./children/child5.vue"
export default {
  components:{
    Child5
  },
  data(){
      return {
          msg:'123'
      }
  }
}
</script>
```
子组件：
```html
<template>
  <div>
    <div>子组件内容：{{value}}</div>
    <button @click="$emit('input','改变值')">点击我</button>
  </div>
</template>
<script>
export default {
    props: ['value']
}
</script>
```
对应vue3中
- 1、更改为 由 input 事件更改为 update 事件；
- 2、可以自定义 model 事件
- 3、在同一个组件上使用多个 v-model

[demo22](###)
父组件 App.vue

```vue
<template>
  <div>
      <p>父组件：{{msg}}</p>
      <Child22 v-model="msg"></Child22>
  </div>
</template>
<script>
import Child22 from './children/child22.vue'
import { ref } from "vue";
export default {
  name: 'App',
  components: {
    Child22
  },
  setup(){
    const msg = ref('我是父组件内容');
    return {
      msg
    }
  }
}
</script>
```

子组件

```vue
<template>
  <div>
    <div class="my-content">我是子组件内容:{{modelValue}}</div>
    <button @click="$emit('update:modelValue','new value')">点击我</button>
  </div>
</template>
<script>
import {ref,onMounted,nextTick} from 'vue' 
export default {
  props:{ //这里声明props
    modelValue:String,
  }
}
</script>
```

自定义model的名字,并且支持同一个元素中多个v-model

[demo23](###)
```vue
<template>
  <div>
      <p>父组件：{{msg}}---{{modelValue}}</p>
      <Child23 v-model:myModel="msg" v-model:modelValue="modelValue"></Child23>
  </div>
</template>
<script>
import Child23 from './children/child23.vue'
import { ref } from "vue";
export default {
  name: 'App',
  components: {
    Child23
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

子组件

```vue
<template>
  <div>
    <div class="my-content">我是内容{{myModel}}---{{modelValue}}</div>
    <input type="text" @input="$emit('update:modelValue',$event.target.value)" />
    <button @click="$emit('update:myModel','new value')">点击我</button>
  </div>
</template>
<script>
import {ref,onMounted,nextTick} from 'vue' 
export default {
  props:{ //这里声明props
    myModel:String,
    modelValue:String,
  },
  setup(props,cxt){
    console.log(props.myModel);
  }
}
</script>
```