## 9.针对scoped设置规则

单文件组件 `<style scoped>`现在可以包含全局规则或只针对插槽内容的规则
1、deep
父组件覆盖子组件的样式
2、slot
设置父组件中slot的样式
3、global
设置 全局的样式

```vue
<style scoped>
/* deep selectors */
::v-deep(.foo) {}
/* shorthand */
:deep(.foo) {}

/* targeting slot content */
::v-slotted(.foo) {}
/* shorthand */
:slotted(.foo) {}

/* one-off global rule */
::v-global(.foo) {}
/* shorthand */
:global(.foo) {}
</style>
```
父组件 App.vue
```vue
<template>
  <div>
      <div class="text">父组件</div>
      <HelloWorld><span class="my-slot">我是父组件的slot</span></HelloWorld>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  components: {
    HelloWorld,
  }
}
</script>

<style scoped>
/*覆盖子组件的样式*/
:deep(.my-button){
  color:red;
}
</style>
```
子组件 HelloWorld.vue

```vue
<template>
<div class="wraper">
  <div class="text">hello</div>
  <slot>我是slot的替代内容</slot>
  <button @click="changeColor" class="my-button">改变颜色</button>
</div>
</template>

<style scoped>
:global(.text) {
  color:blueviolet;
}
.my-button{
  color:green;
}
/*设置父组件中slot的样式*/
:slotted(.my-slot){
  color:blue;
}
</style>
```