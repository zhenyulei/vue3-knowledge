## 7.slot插槽

在 vue2 中, this.$scopedSlots 可以获取到所有的slot，this.$slot 可以获取到指定的slot，代码如下：

[vue2-demo4](###)
父组件：
```vue
<template>
  <div>
    <p>父组件内容</p>
    <Hello>
      <template v-slot:header>父组件header的内容</template>
      父组件的slot
      <template v-slot:footer>父组件footer的内容</template>
    </Hello>
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

子组件
```vue
<template>
  <div>
    <p>子组件内容</p>
    <slot name="header">我是header的slot</slot>
    <slot>我是defaults的slot</slot>
    <slot name="footer">我是footer的slot</slot>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$slots, '$slots:父组件的默认slots')//父组件的slots
    console.log(this.$slots.header, '$slots:父组件的slots.header')//父组件的slots
    console.log(this.$scopedSlots, '$scopedSlots:父组件中所有的slot')//父组件中所有的slot
  }
}
</script>
```

在vue3中

移除 this.$scopedSlots, 统一到 $slots 选项中

[demo21](###)

```vue
<template>
  <div>
    <p>子组件内容</p>
    <slot name="header">我是header的slot</slot>
    <slot>我是defaults的slot</slot>
    <slot name="footer">我是footer的slot</slot>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$slots, '$slots')//父组件的slots
    console.log(this.$slots.header(), '$slots')//父组件的slots
    console.log(this.$scopedSlots, '$scopedSlots') //undefined
  }
}
</script>
```