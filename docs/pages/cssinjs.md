## 5.CSS支持变量

[demo18](###)
```vue
<template>
<div>
  <div class="text">hello</div>
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
.text {
  color: var(--myColor);
  font-size:var(--fontSize)
}
</style>
```