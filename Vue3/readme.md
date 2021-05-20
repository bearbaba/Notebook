# Vue3 语法

## 基本指令

### 双括号语法

`{{}}` 双括号语法，渲染括号内的变量的值。

``` vue
<h1>{{message}}</h1>
const app = { template: "#template", data() { return { message: "hello Vue" } }
}
```

![image-20210515110126867](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210515110126867.png)

## `v-text` 语法

与 `{{}}` 类似，不过不会把双括号里的内容当成变量渲染，（没啥用）。

``` vue
<h4 v-text="num1"></h4>
data() { return { message: "hello Vue", num1: "{{ 100 }}" }
```

![image-20210515110440509](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210515110440509.png)

### v-pre

使用 `v-pre` 后直接输出内容，不进行编译，（没啥用）。

### v-html

如果希望渲染后变量的值作为 HTML 进行展示，那么使用 `v-html` 。

``` vue
<div v-html="htmlVal"></div>
```

### v-once

对内容只进行一次渲染，之后即使值被改变也不进行重新渲染，（有点用）

### v-clock

如果性能差的话，可能会看到 `{{num}}` 编译成 `num` 值的过程，使用 `v-clock` 将不会看到编译过程，必须与 CSS 一起使用（性能差的时候有点用）。

``` vue
<style>
[v-clock] {
  display: none;
}
</style>

<h4 v-clock>{{message}}</h4>
```

## v-bind

表示动态绑定属性。

### v-bind 语法糖

可以使用 `:` 代替 `v-bind` ，

### 动态绑定 class

通常可以动态绑定 `class` ，

``` vue
<div :class="active">hello world</div>
```

允许动态绑定的值为数组，数组中可以含有多个值。

``` vue
<div class="box-size" :class="[active, bgc, border]">Vue</div>
```

如果在动态 `class` 之外还含有原生的静态 `class` ，那么编译后的结果会是这两个 `class` 合并的结果。

数组中可以使用三元运算符。

``` vue
<div :class="[activeVal ? active : none, bgc]">Vue3.0</div>
```

也允许动态绑定的值是对象。

### 动态绑定 style

与动态绑定 `class` 类似，但需要注意的是如果使用了 `-` 分隔法，需要使用字符串形式，或者驼峰写法。

``` vue
<div :style="{ fontSize: 40 + 'px', 'background-color': 'green' }">hello</div>
```

要注意的是，它并非使用的是原生 HTML 中内联样式的写法，而是对象的写法。

### 动态绑定对象中各个值

如果需要绑定一个对象，把对象中的各个键值对作为动态绑定的内容，那么它的写法为：

``` vue
<div v-bind="bindObj">V</div>
data() { 
  return 
  { 
    bindObj: 
    { 
      name: "bind", 
      age: "22", 
      gender: "femal", 
    }, 
  }; 
}
```

![image-20210515212530384](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210515212530384.png)

## v-on

动态监听事件。

### 语法糖

使用 `@` 替代 `v-on` 。

### 监听事件

一般我们使用它来监听点击事件 `@click` ，不过还包含大量其它事件，例 `mousemove` 等。

监听事件绑定一个函数，可以在 Vue 内部通过 `event` 参数获取默认传递的事件，在组件内容不加括号表示默认传递一个`event`，在函数定义时如果需要使用到这个`event`，那么就需要定义这个`event`形参。

``` vue
<div @click="demoFun">click</div>

methods(){
  demoFun(event){
    console.log(event);
  }
}
```

其中 `event.target` 指向绑定的元素内容。

### 修饰符

Vue 提供大量修饰符，例如 `.stop` 用于阻止事件冒泡。

``` vue
<div @click="shout(2)">
  <button @click.stop="shout(1)">ok</button>
</div>
```

### 动态绑定数组

如果包含多个方法都需要通过同一事件监听执行，那么也可以使用数组来包含这些函数。

### 参数传递

如果希望在执行函数时，还能传递事件参数`event`给函数，那么默认传递的 `event` 参数需要显式写为 `$event` ，如果不需要也可以不写，并不会影响到参数传递。

``` vue
<input type="text" @keyup.enter="print($event, 'hello')" />
```

```vue
<button @click="addBook($event, index)">+</button>
addBook(event, index) {
    console.log(event);
    this.books[index].num++;
},
```

## watch 侦听器

如果想要监测一个数据，根据这个数据的动态变化而使用相应函数，那么可以使用`watch`。

`watch`只能侦听普通变量，对于变量的属于变化是无法侦听到的，如果想要侦听，那么就需要使用`deep`。

```vue
watch: {
  obj: {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    deep: true
  }
} 

```

