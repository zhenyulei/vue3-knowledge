## 9.针对scoped设置规则

单文件组件 `<style scoped>`现在可以包含全局规则或只针对插槽内容的规则

1、deep
父组件覆盖子组件的样式

2、slot
设置父组件中slot的样式

3、global
设置全局的样式

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

[demo24](###)
```vue
<template>
  <div>
      <div class="text">父组件内容，子组件的全局样式生效</div>
      <Child24><span class="my-slot">我是父组件的slot，子组件设置父组件中slot的样式</span></Child24>
  </div>
</template>
<script>
import Child24 from './children/child24.vue';
export default {
  components: {
    Child24,
  }
}
</script>

<style scoped>
/*覆盖子组件的样式*/
:deep(.my-child){
  color:red;
}
</style>
```
子组件 HelloWorld.vue

```vue
<template>
<div class="wraper">
  <div class="text">子组件内容，全局样式生效</div>
  <slot>我是slot的替代内容</slot>
  <div class="my-child">子组件内容，父组件样式</div>
</div>
</template>

<style scoped>
:global(.text) {
  color:blueviolet;
}
.my-child{
  color:green;
}
/*设置父组件中slot的样式*/
:slotted(.my-slot){
  color:blue;
}
</style>
```