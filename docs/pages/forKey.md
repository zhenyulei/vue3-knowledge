## 6.for循环/if判断的改变

`<template v-for>`
在 Vue 2.x 中 `<template>` 标签不能拥有 key。不过你可以为其每个子节点分别设置 key。

[vue2-demo2](###)

```vue
<!-- Vue 2.x -->
<template>
    <div class="wrapper">
        <template v-for="item in list">
            <span :key="item.id">{{item.name}}</span>
            <span :key="item.id">{{item.id}}</span>
            <br :key="item.id"/>
        </template>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {            
           list:[
            {
                name:'xiaohua',
                id:12
            },
            {
                name:'xiaowang',
                id:22
            }
           ]
        }
    },
    methods: {
    }
}
</script>
```

在 Vue 3.x 中 key 则应该被设置在 `<template>` 标签上。

[demo19](###)

```vue
<!-- Vue 3.x -->
<template>
    <div class="wrapper">
        <template v-for="item in list" :key="item.id">
            <span>{{item.name}}</span>
            <span>{{item.id}}</span>
            <br/>
        </template>
    </div>
</template>

<script>
import {ref} from 'vue';
export default {
    components: {},
    setup(){
        const list = ref([
        {
            name:'xiaohua',
            id:12
        },
        {
            name:'xiaowang',
            id:22
        }
        ])
        return {
            list
        }
    }
}
</script>
```

### v-if 和 v-for 执行顺序问题

2.x 版本中在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用。

3.x 版本中 v-if 总是优先于 v-for 生效。

由于语法上存在歧义，建议避免在同一元素上同时使用两者。

vue2中 [vue2-demo3](###)

```vue
<template>
    <div class="wrapper">
        <template v-for="(item,index) in list" v-if="item>2">
            <div :key="index">{{item}}</div>
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {            
           list:[1,2,3,4,5]
        }
    }
}
</script>
```
vue3中 [demo20](###)

先判断 v-if 导致 找不到 item，如果改成 list.length > 1 即可显示出来。

```vue
<template>
    <div class="wraper">
    <div v-for="(item,index) in list" v-if="item>1" :key="index">
        <div>{{item}}<div>
    </div>
    </div>
</template>
<script>
import {ref} from 'vue'
export default {
  setup(){
    const list = ref([1,2,3,4,5])
    return {
      list
    }
  }
}
</script>
```