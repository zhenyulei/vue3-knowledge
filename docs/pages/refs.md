## 11.ref 的变化

**1、vue3中的ref在响应式中绑定**

先看vue2中获取dom实例：

[vue2-demo6](###)

```vue
<template>
  <input type="text" ref="myInput"/>
</template>
<script>
import {ref, onMounted} from 'vue'
export default {
    mounted(){
        console.log(this.$refs.myInput)
        this.$refs.myInput.focus();
    }
}
</script>
```

在vue3中

这里我们在渲染上下文中暴露 myInput，并通过 ref="myInput"，将其绑定到 div 作为其 ref。在虚拟 DOM 补丁算法中，如果 VNode 的 ref 键对应于渲染上下文中的 ref，则 VNode 的相应元素或组件实例将被分配给该 ref 的值。这是在虚拟 DOM 挂载/打补丁过程中执行的，因此模板引用只会在初始渲染之后获得赋值。

作为模板使用的 ref 的行为与任何其他 ref 一样：它们是响应式的，可以传递到 (或从中返回) 复合函数中。

[demo26](###)

```vue
<template>
  <input type="text" ref="myInput" data-value="input-number"/>
</template>
<script>
import {ref, onMounted} from 'vue'
export default {
  setup(){
    const myInput = ref(null);
    onMounted(()=>{
      console.log(myInput.value);
      myInput.value.focus();
    })
    return {
      myInput
    }
  }
}
</script>
```

在 Vue 2 中，在 v-for 里使用的 ref 会用 ref 数组填充相应的 $refs property。当存在嵌套的 v-for 时，这种行为会变得不明确且效率低下。

在 Vue 3 中，这样的用法将不再在 $ref 中自动创建数组。要从单个绑定获取多个 ref，请将 ref 绑定到一个更灵活的函数上 (这是一个新特性)：

**示例**

vue2中，如果给 v-for 绑定一个 ref ，通过这个 ref 可以获取到全部 v-for 的节点。

[vu2-demo7](###)

```vue
<template>
  <div>
    <p v-for="item in renderData" :key="item.name" ref="nodes" :class="item.name+'-item'">{{item.name}}</p>
  </div>
</template>
<script>
export default {
    data() {
        return {
            renderData: [
                { name: 'a' },
                { name: 'b' },
                { name: 'c' },
                { name: 'd' },
                { name: 'f' }
              ]
        }
    },
    mounted(){
      console.log(this.$refs.nodes)
    }
}
</script>
```


对 v-for 的一体化（数组化）处理已经取消，变为函数处理 ref 。对 ref 进行自定义处理：

[demo27](###)

```vue
<template>
  <ul>
    <li 
      v-for="item in list" 
      :ref="setItemRef" 
      :key="item" 
      :class="item===1?'list-li':''"
    >{{item}}</li>
  </ul>
</template>
<script>
import {ref, onMounted} from 'vue'
export default {
  setup(){
    const list = ref([1,2,3,4]);
    let itemRefs = []
    const setItemRef = el => {
      itemRefs.push(el)
    }
    onMounted(() => {
      console.log(itemRefs)
    })
    return {
      list,
      setItemRef,
    }
  }
}
</script>
```