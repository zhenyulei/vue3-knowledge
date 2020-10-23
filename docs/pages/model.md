## 8.v-model的变化

v-model选项中v-bind的 sync 修饰符被移除，统一为v-model参数形式

2.x 中 v-model 语法糖底层使用的是 :value 和 emit(‘input’)， 绑定属性值是 value

例如
```html
<Hellow v-model="msg"></Hellow>
```
子组件：
```html
<button @click="$emit('input','newMsg')">点击我s</button>
```
对应vue3中
1、更改为 由 input 事件更改为 update 事件；
2、可以自定义 model 事件
3、在同一个组件上使用多个 v-model
父组件 App.vue
```vue
<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png" />
      <p>父组件：{{msg}}</p>
      <HelloWorld v-model="msg"></HelloWorld>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";
export default {
  name: 'App',
  components: {
    HelloWorld
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

子组件 helloWorld

```vue
<template>
  <div>
    <div class="my-content">我是内容{{modelValue}}</div>
    <button @click="$emit('update:modelValue','new value')">点击我</button>
  </div>
</template>
<script>
import {ref,onMounted,nextTick} from 'vue' 
export default {
  props:{ //这里声明props
    modelValue:String,
  },
  setup(props,cxt){

  }
}
</script>
```

自定义model,并且支持同一个元素中多个v-model

```vue
<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png" />
      <p>父组件：{{msg}}---{{modelValue}}</p>
      <HelloWorld v-model:myModel="msg" v-model:modelValue="modelValue" ></HelloWorld>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";
export default {
  name: 'App',
  components: {
    HelloWorld
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