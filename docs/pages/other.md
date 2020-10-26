## 15.其他细节


**1) template 的渲染**
`<template>` 没有特殊指令的标记 (v-if/else-if/else、v-for 或 v-slot) 现在被视为普通元素，并将生成原生的 `<template> `元素，而不是渲染其内部内容。
在 Vue 2.x 中，应用根容器的 outerHTML 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。Vue 3.x 现在使用应用容器的 innerHTML，这意味着容器本身不再被视为模板的一部分。[参考上述template]

**2)keyCode 支持作为 v-on 的修饰符**

```vue
<!-- keyCode方式不再被支持 -->
<input v-on:keyup.13="submit" />

<!-- 只能使用alias方式 -->
<input v-on:keyup.enter="submit" />
```

**3) bind属性排序敏感**

在元素上动态绑定 attribute 时，常见的场景是在一个元素中同时使用 v-bind="object" 语法和单独的 property。然而，这就引出了关于合并的优先级的问题。

#2.x 语法
在 2.x，如果一个元素同时定义了 v-bind="object" 和一个相同的单独的 property，那么这个单独的 property 总是会覆盖 object 中的绑定。

```html
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="red"></div>
```
#3.x 语法
在 3.x，如果一个元素同时定义了 v-bind="object" 和一个相同的单独的 property，那么声明绑定的顺序决定了它们如何合并。换句话说，相对于假设开发者总是希望单独的 property 覆盖 object 中定义的内容，现在开发者对自己所希望的合并行为有了更好的控制。

```html
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="blue"></div>

<!-- template -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- result -->
<div id="red"></div>
```