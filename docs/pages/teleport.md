## 10.Teleport 

Teleport 是一种能够将我们的模板移动到 DOM 中 Vue app 之外的其他位置的技术，就有点像哆啦A梦的“任意门”

场景：像 modals、toast 等这样的元素，很多情况下，我们将它完全的和我们的 Vue 应用的 DOM 完全剥离，管理起来反而会方便容易很多，原因在于如果我们嵌套在 Vue 的某个组件内部，那么处理嵌套组件的定位、z-index 和样式就会变得很困难。

另外，像 modals、toast 等这样的元素需要使用到 Vue 组件的状态（data 或者 props）的值
这就是 Teleport 派上用场的地方。我们可以在组件的逻辑位置写模板代码，这意味着我们可以使用组件的 data 或 props。然后在 Vue 应用的范围之外渲染它。

[demo25](###)
```vue
<template>
  <div>
    <button @click="modalOpen = true">
    弹出一个全屏模态窗口
  </button>
  <teleport to="#teleport-target">
    <div v-if="modalOpen" class="modal">
      <div>
        这是一个模态窗口!
        我的父元素是"body"！
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>
  </div>
</template>

<script>
export default {
 data() {
   return {
     modalOpen: false
  }
},
};
</script>

<style scoped>
.modal {
 position: absolute;
 top: 0; right: 0; bottom: 0; left: 0;
 background-color: rgba(0,0,0,.5);
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}

.modal div {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 background-color: white;
 width: 300px;
 height: 300px;
 padding: 5px;
}
</style>
```