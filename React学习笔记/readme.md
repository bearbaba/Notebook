（本内容是使用`webpack`手动进行配置的，并且它是需要`html-webpack-plugin`保持服务器能够一直开启的状态，以方便它的实时渲染更新）

# React创建

同样的，使用``yarn add react react-dom --save`安装`react`、`react-dom`插件。

在安装完这两个插件后，在`src\index.js`中进行`React`代码的书写。

首先需要导入`React`与`ReactDOM`对象，即

```js
import React from 'react';
import ReactDOM from 'react-dom';
```

然后使用`React.createElement`方法创建虚拟 DOM ，`React.createElement()`几个需要进行配置的参数：

* 参数1：创建的元素类型，使用字符串表示，也即是元素的名称；
* 参数2：一个对象或`null`，表示当前这个虚拟 DOM 元素属性；
* 参数3：子节点内容（可以是当前节点的文本内容，也包括其它节点）
* 参数n：其它子节点

例如，要创建`<h1 id="main-title" class="title">Hello World</h1> `这个元素的虚拟 DOM ，可以写成：

```js
const myh1 = React.createElement(
  'h1', 
  {
    id: 'main-title',
    class: 'title',
  }, 
  "Hello World");
```

在这里我们创建了这个虚拟 DOM 并且为它命名为`myh1`,然而这里存在一个错误，我们之后会提到。

在创建完这个虚拟 DOM 后，我们要把它渲染到页面上，这里使用`ReactDOM.render`方法，

```js
ReactDOM.render(myh1, document.getElementById('app'));
```

但是需要注意的是这个渲染实际上是把它作为一个 JS 文件导入到`index.html`内，`document.getElementById('app')`就是在寻找`html`内一个能把虚拟 DOM 内容渲染进去的标签，那么我们就需要`src\index.html`的辅助，在`index.html`内放入一个`<div id="app"></div>`的标签。

但是上述内容存在一个错误，这个错误在渲染出的页面的控制台上可以看到，`class`是不符合`React`的，在`React`内，需要把`class`写为`className`，并且它还不允许像 CSS 属性中使用的`margin-left`中的`-`连接符，它使用的是 JS 的驼峰语法。

上述内容完整代码为：

```react
//index.js
import React from 'react';
import ReactDOM from 'react-dom';

const Node = React.createElement(
  'h1', 
  {
    id: 'main-title',
    className: 'title',
  }, 
  "Hello World");

  ReactDOM.render(Node, document.getElementById('app'));
```

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```



## 多个元素进行嵌套

在介绍`React.createElement`方法我们明确表示它的参数中可以表示出当前节点的子节点。

```react
import React from 'react';
import ReactDOM from 'react-dom';

const myh1 = React.createElement(
  'h1', 
  {
    id: 'main-title',
    className: 'title',
  }, 
  "Hello World");

  const myDiv = React.createElement(
    'div',
    null,
    "这是myh1的父节点",
    myh1
  )

  ReactDOM.render(myDiv, document.getElementById('app'));
```

这里的

```react
  const myDiv = React.createElement(
    'div',
    null,
    "这是myh1的父节点",
    myh1
  )
```

第三个参数是当前节点的文本内容，而第四个参数表示子节点是`myh1`，`myh1`有了父节点就不再使用它作为渲染对象，而是渲染`myDiv`，`myDiv`包裹着`myh1`，`myh1`自然会被渲染出来。