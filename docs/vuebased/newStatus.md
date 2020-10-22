## 2.新特性 
### 2.1、 新增setup方法
setup函数是一个新的组件选项。作为在组件内使用Composition API的入口点。

```vue
<template>
  <div>
    我是组件页面<p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  props:{
    msg:String
  },
  setup(props, ctx) {
    console.log('新增函数入口');
  }
}
</script>
```
#### 2.1.1 执行时机

创建组件实例，然后初始化props，紧接着就调用setup函数，从vue2的生命周期钩子的视角来看，它会在beforeCreate钩子之前被调用。

>注意：为了兼容vue2，vue3也可以在setup外面使用vue2的生命周期函数，但是不建议混合使用，vue3中可以按需将生命周期导入到组件中，且只能在 setup() 函数中使用

beforeCreate【删除】 -> 使用setup()
created【删除】 ->  使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted

**新的调试钩子函数**
在Vue3中使用两个全新的钩子函数来进行调试。他们是：

`onRenderTracked` 和 `onRenderTriggered`

分别对应get()值，和set()变量，这两个事件都带有一个 DebuggerEvent，它使我们能够知道是什么导致了Vue实例中的重新渲染。

```js
export default {
  onRenderTriggered(e) {
    debugger
    // 检查哪个依赖项导致组件重新呈现
  }
}
```
示例：
```vue
<template>
    <div>
        <p> {{ age }} --{{data.counter}}</p>
    </div>
</template>

<script>
import {
    ref,
    reactive,
    toRefs,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    onRenderTracked,
    onRenderTriggered,
} from 'vue';

export default {
    setup() {
        const age = ref(1)//设置响应式变量
        const data = reactive({
          counter:10
        })

        console.log('setup')

        onBeforeMount(() => {
            console.log('onBeforeMount')
        })
        onMounted(() => {
            console.log('onMounted')
        })
        onBeforeUpdate(() => {
            console.log('onBeforeUpdate')
        })
        onUpdated(() => {
            console.log('onUpdated')
        })
        onBeforeUnmount(() => {
            console.log('onBeforeUnmount')
        })
        onUnmounted(() => {
            console.log('onUnmounted')
        })
        onRenderTracked((e) => {
            console.log(e)
            console.log('onRenderTracked')
        })
        onRenderTriggered((e) => {
            debugger
            console.log(e)
            console.log('onRenderTriggered')
        })

        // 测试 update 相关钩子
        setTimeout(() => {
            age.value = 20;
            data.counter = 30;
        }, 2000)

        return {
          data,
          age
        }
    },
}
</script>
```

#### 2.1.2 setup函数接收参数
setup函数接收props作为其第一个参数，ctx上下文对象第二个参数
1）props对象是响应式的，watchEffect或 watch 会观察和响应props的更新。不要对props对象进行解构，那样会失去响应性。
2）ctx上下文包括了三个属性： attrs、slots、emit；
示例1:
父组件：
```vue
<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png" />
      <HelloWorld :msg="parentMsg"></HelloWorld>
      <button @click="myClick">点击我</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      parentMsg:"原始数据"
    }
  },
  methods:{
    myClick(){
      this.parentMsg = '改变后的数据'
    }
  }
}
</script>
```

对应子组件
```vue
<template>
  <div>
    我是子页面
    <p>{{msg}}</p>
  </div>
</template>
<script>
import {watch,watchEffect} from 'vue' 
export default {
  props:{
    msg:String
  },
  setup(props, ctx) {
    const {msg} = props;
    watch(()=>msg, (val,oldVal)=>{
      console.log(`msg change from ${oldVal} to ${val}`);
    })
    watch(()=>props.msg, (val,oldVal)=>{
      console.log(`props.msg change from ${oldVal} to ${val}`);
    })
    watchEffect(() => {
      console.log(`change--msg is: ` + props.msg) // Will not be reactive!
      console.log(`msg is: ` + msg) // Will not be reactive!
    })
  }
}
</script>
```

**补充：watch和watchEffect的区别**
1）watchEffect 不需要指定监听的属性，他会自动的收集依赖，只要我们回调中引用到了"响应式的属性"， 那么当这些属性变更的时候，这个回调都会执行，而 watch 只能监听指定的属性而做出变更。
2）watch 可以获取到新值与旧值（更新前的值），而 watchEffect 是拿不到的。
3）watchEffect 在组件初始化的时候就会执行一次用以收集依赖（与computed同理），而后收集到的依赖发生变化，这个回调才会再次执行，而 watch 不需要，因为他一开始就指定了依赖。


示例2，ctx上下文:
```vue
<template>
  <div>
    <div>来自于父组件的props--{{msg}}</div>
    <slot>我是子组件的slot内容</slot>
  </div>
</template>
<script>
export default {
  props:{
    msg:{
      type:String,
      default:''
    },
    word:{
      type:String,
      default:'o'
    },
    myClick:{
        type:Function,
        ddefault:()=>{}
    }
  },
  setup(props,context){
    //声明了props和emits之后，这里attrs获取属性
    console.log(context.attrs.className)
    console.log(props.word)
    console.log(props.msg)
    // 根据上下文获取插槽
    console.log(context.slots.default())
    // 根据上下文触发事件 (方法)
    context.emit('myClick','自组件传出去的参数')
  }
}
</script>
```

对应的父组件：
```vue
<template>
  <div>
      <img alt="Vue logo" src="./assets/logo.png" />
      <HelloWorld className="my-class" :msg="parentMsg" word="你好" @myClick="changeMsg" isShow>
        <div>我是slot外部第一行内容</div>
        <span>我是slot的第二行内容</span>
      </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      parentMsg:"hello vue3"
    }
  },
  methods:{
    changeMsg(parmas){
      console.log("父组件文案--"+parmas) 
    }
  }
}
</script>
```

**补充：如何区分ctx.attr 和 props 呢？**

1)不声明props，则结果显示 props 是一个空对象，而 attrs 中包含了所有父组件传递的方法和属性

```vue
<template>
  <div>
    <div>来自于父组件的props--{{msg}}</div>
    <slot>我是子组件的slot内容</slot>
  </div>
</template>
<script>
export default {
  setup(props,context){
    console.log('props',{...props});
    console.log('context.attrs',{...context.attrs});
  }
}
</script>
```
2）props 要先声明才能取值，attrs 不用先声明；props 声明过的属性，attrs 里不会再出现；props 中不可以声明方法，attrs 包含事件

子组件：
```vue
<template>
  <div>
    <div>来自于父组件的props--{{msg}}</div>
    <slot>我是子组件的slot内容</slot>
  </div>
</template>
<script>
export default {
  props:{
    msg:String,
    myClick:Function,
    isShow:Boolean
  },
  setup(props,context){
    console.log('props',{...props});
    console.log('context.attrs',{...context.attrs});
  }
}
</script>
```

3）出现在 attrs 中的 isShow 是一个值为空字符串的属性，props支持 string 以外的类型，attrs 只有 string 类型；

综上所述：如果是props定义的，在子组件中一定要声明props，否则props无法获取，并且事件在 attrs 中！


- 解释1；为什么props没有被包含在上下文中？
1.组件使用props的场景更多，有时甚至只需要使用props
2.将props独立出来作为一个参数，可以让TypeScript对props单独做类型推导，不会和上下文中其他属性混淆。

- 解释2:
this在setup中不可用，方法和生命周期都可以写在setup中，如果在方法中访问setup中的变量时，直接变量名就可以使用。
方法名和变量名要在setup中return出去才可以正常执行。

```vue
<template>
  <div>
      <p>{{msg1}}</p>
      <p>{{msg2}}</p>
  </div>
</template>
<script>
import {reactive,computed,ref} from 'vue' 
export default {
  setup(props, ctx) {
    console.log(this);
    const msg1 = "无法得到得到常量值"
    const msg2 = "可以得到的常量值"
    setTimeout(()=>{
      msg2 = "改变后的数据"
    },2000)
    return {
      msg2
    }
  }
}
</script>
```

但是上面示例都不是响应式变量，如何设置响应式变量呢？请看下文～