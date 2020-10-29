## 5.CSS支持变量

[demo18](###)
```vue
<template>
<div>
  <div class="w-text">hello</div>
  <button @click="changeColor">改变颜色</button>
</div>
</template>

<script>
import { ref,reactive,toRefs } from "vue";
export default {
  setup(){
    const data = reactive({
      myColor: 'red',
      fontSize: '12px'
    })
    function changeColor(){
        data.myColor = data.myColor === 'green'?'red':'green';
        data.fontSize = data.fontSize === '12px'?'20px':'12px';
    }
    return {
      ...toRefs(data),
      changeColor
    }
  }
}
</script>

<style vars="{ myColor,fontSize }">
.w-text {
  color: var(--myColor);
  font-size:var(--fontSize)
}
</style>
```


那么问题来了，假如我要是在全局样式里定义了一个--color属性，我在带有scoped属性的组件里想用这个全局的CSS变量，可是一旦在scoped中使用CSS变量就会被编译成：--hash-color，可是全局定义的不是--hash-color而是--color，这样就会出现找不到全局属性的局面，这个问题要怎么解决呢？其实也很简单，只需要在--的后面加上一个global:就可以了：

```vue
<template>
<div>
  <div class="w-text">hello</div>
</div>
</template>

<style vars="{ currcolor }" scoped>
.w-text {
  color: var(--global:currcolor);
  font-size:20px;
}
</style>
```

全局css

```css
body {
  --currcolor:orange;
}
```