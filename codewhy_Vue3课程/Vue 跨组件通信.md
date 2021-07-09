# Vue 跨组件通信

## 使用`provide`与`inject`进行组件间的通信

跨组件通信使用`provide`与`inject`。

```vue
export default {
  components: {
    Tab
  },
  provide:{
    name:"codewhy",
    age: 23
  }
};
```

`provide`提供数据。

```vue
<template>
  <div>
    <h1>{{name}}--{{age}}</h1>
  </div>
</template>

<script>
export default {
  inject:["name", "age"]
};
</script>
```

`inject`用于接收数据。

