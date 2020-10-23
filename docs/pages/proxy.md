## 3.响应式数据

**方法一：使用ref**

ref包裹的变量是响应式的， 对比没有被 ref 包裹的变量不是响应式的。

[demo8](###)

```vue
<template>
  <div>
    <p>{{desc}}</p>
    <p>{{descSec}}</p>
    <button @click="clickme">点击me</button>
  </div>
</template>
<script>
import {ref} from 'vue' 
export default {
  setup(){
    const desc = ref('描述的信息');
    const descSec = "不会变化的信息"
    function clickme (){
      desc.value = "改变的信息";
      descSec = "变化的"
    }
    return {
      desc,
      descSec,
      clickme
    }
  }
}
</script>
```
**方法二：使用 reactive**

相当于当前的 Vue.observable () API，经过reactive处理后的函数能变成响应式的数据，类似于option api里面的data属性的值

[demo9](###)

```vue
<template>
  <div>
    <h1>{{ data.counter }}</h1>
    <button @click="clickme">点击me</button>
  </div>
</template>
<script>
import {reactive} from 'vue' 
export default {
  setup(){
    const data= reactive({
      counter :10,
    })
    function clickme (){
      data.counter += 1;
    }
    return {
      data,
      clickme
    };
  }
}
</script>
```

:::tip

ref 和 reactive 的区别

一般约定 reactive 的参数是一个对象，而 ref 的参数是一个基本元素。但如果反过来也是可以的，reactive 其实可以是任意值，比如：reactive(123) 也是可以变成一个代理元素，可以实现双向绑定。
:::

1、适应不同的写法
ref相当于包裹了响应式的单个变量，类似于：
```js
const a = 1
const b = 2
```
而reactive包裹的是响应式的对象，类似于：
```js
const obj = {
  a : 1,
  b : 1    
}
```
2、使用方式不一样
ref修改数据需要使用这样 count.value=xxx 的形式，而reactive只需要state.count=值 这样来使用。

**疑问：为什么使用ref定义的变量要使用value取值呢？**

```js
setup() {
    const count = ref(100)
}
```
被 ref 包裹后的元素变成一个代理对象，效果就相当于：

```js
setup() {
    const count = reactive({
        value: 100
    })
}
```
因为变成了一个代理对象，所以取值的时候需要 .value

```js
setup() {
    const count = ref(100)
    console.log(count.value) // output: 100
}
```

另外 ref 的结果在 template 上使用时，会自动打开 unwrap，不需要再加 .value

```vue
<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  setup() {
    const count = ref(100)
    return {
      count
    }
  }
}
</script>
```

### isRef 方法
判断一个对象是否 ref 代理对象。

[demo10](###)

```vue
<template>
  <div>
    <h1>{{ data.counter }}</h1>
    <button @click="clickme">点击me</button>
  </div>
</template>
<script>
import {reactive, onMounted,isRef,ref} from 'vue' 
export default {
  setup(){
    const data= reactive({
      counter :10,
    })
    function clickme (){
      data.counter += 1;
    }
    const myFlag = ref(false);
    onMounted(()=>{
      const currState = isRef(myFlag) ? "myFlag是ref代理数据" : "myFlag不是ref代理数据";
      const currCounter = isRef(data.counter) ? "counter是ref代理数据" : "counter不是ref代理数据";
      console.log(currState,currCounter);
    })
    return {
      data,
      clickme
    };
  }
}
</script>
```

#### toRefs 方法
将一个 reactive 代理对象打平，转换为 ref 代理对象，使得对象的属性可以**直接在 template 上使用**。

原来的方法：

[demo11](###)

```vue
<template>
  <div>记数：{{ count }}</div>
  <div>姓名：{{ data.name }}</div>
  <div>年龄：{{ data.age }}</div>
</template>

<script>
import {reactive,ref} from 'vue' 
export default {
  setup(props,ctx) {
    const count = ref(100);
    const data = reactive({
      name:"小花",
      age:12,
    })
    return {
      count,
      data
    }
  }
}
</script>
```

使用 toRefs 之后,可以在template上直接使用

[demo12](###)

```vue
<template>
  <div>
    <div>记数：{{ count }}</div>
    <div>姓名：{{ name }}</div>
    <div>年龄：{{ age }}</div>
  </div>
</template>

<script>
import {reactive,ref, toRefs} from 'vue' 
export default {
  setup() {
    const count = ref(100);
    const data = reactive({
      name:"小花",
      age:12,
    })
    return {
      count,
      ...toRefs(data)
    }
  }
}
</script>
```

#### computed：计算属性

1、在 reactive 中定义的变量

[demo13](###)

```vue
<template>
  <div>
    <p>{{counter}}</p>
    <p>{{doubleCounter}}</p>
    <button @click="clickme">点击me</button>
  </div>
</template>
<script>
import {reactive,computed,toRefs} from 'vue' 
export default {
  setup(){
    const data= reactive({
      counter :10,
      doubleCounter:computed(()=>data.counter * 2)
    })
    function clickme (){
      data.counter +=1;
    }
    return {
      ...toRefs(data),
      clickme
    }
  }
}
</script>
```
2、在 computed 定义的变量，类似于ref，可以在template中直接使用，不用value

[demo14](###)

```vue
<template>
  <div>
    <p>{{counter}}</p>
    <p>{{doubleCounter}}</p>
    <button @click="clickme">点击me</button>
  </div>
</template>
<script>
import {reactive,computed,toRefs} from 'vue' 
export default {
  setup(){
    const data= reactive({
      counter :10,
    })
    const doubleCounter = computed(()=>data.counter * 2)
    function clickme (){
      data.counter +=1;
    }
    return {
      ...toRefs(data),
      doubleCounter,
      clickme
    }
  }
}
</script>
```

#### vue2 中无法监听数组的变化

[vue2-demo1](###)

```vue
<template>
    <div>
        <div class="wrapper">
            <ul>
                <li v-for="(item,index) in desc" :key="index">{{item.name}}--{{item.age}}</li>
            </ul>
            <p>{{obj.name}}--{{obj.age}}</p>
            <button @click="clickme">点击me</button>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {            
           desc:[
            {
                name:'xiaohua',
                age:12
            },
            {
                name:'xiaowang',
                age:22
            }
           ],
           obj:{
               name:"小王"
           }
        }
    },
    methods: {
        clickme(){
            //新增数据
            this.desc[2]={
                name:"小王",
                age:23
            }
            //修改数据
            this.desc[0]={
                name:'小王',
                age:23
            }
            //修改obj数据
            this.obj.age= 24
        }
    }
}
</script>
```

vue3 可以放心的监听数组和对象的变化

[demo15](###)

```vue
<template>
  <div>
      <ul>
        <li v-for="(item,index) in desc" :key="index">{{item.name}}--{{item.age}}</li>
      </ul>
      <p>{{obj.name}}--{{obj.age}}</p>
      <button @click="clickme">点击me</button>
  </div>
</template>
<script>
import {ref} from 'vue' 
export default {
  setup(){
    const desc = ref([
      {
      name:'xiaohua',
      age:12
      },
      {
      name:'xiaowang',
      age:22
      }
    ]);
    const obj = ref({
      name:"lili"
    });
    function clickme (){
      desc.value[2] = {
        name:"小王",
        age:33
      }
      obj.value.age = 24
    }
    return {
      obj,
      desc,
      clickme
    }
  }
}
</script>
```
#### readonly

传入ref或reactive对象,并返回一个原始对象的只读代理,对象内部任何嵌套的属性也都是只读的。

传入普通对象等也返回只读代理

传入普通数值或字符串不能变成只读

[demo16](###)

```vue
<template>
  <div>
      <p>{{count}}</p>
      <p>{{myCount}}</p>
      <p>{{name}}--{{age}}</p>
      <button @click="clickMe">点击我</button>
  </div>
</template>
<script>
import {reactive,ref,toRefs,readonly,watchEffect} from 'vue' 
export default {
  setup(){
    const original = readonly(reactive({ count: 10 }))
    const myCount = readonly(ref(0))
    const copy = readonly(reactive({
      name:"小花",
      age:12
    })) 
    let aa = readonly("123")
    function clickMe(){
      original.count++
      myCount.value++
      copy.age++ // warning!
      aa = 'hello'
      console.log(aa);
    }
    return {
      myCount,
      ...toRefs(original),
      ...toRefs(copy),
      clickMe
    }
  }
}
</script>
```