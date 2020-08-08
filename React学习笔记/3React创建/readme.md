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

但是上述内容存在一个错误，这个错误在渲染出的页面的控制台上可以看到，`class`是不符合`React`的，在`React`内，需要把`class`写为`className`，因为 JS 当中`class`表示类，是一个保留字。并且 React 还不允许像 CSS 属性中使用的`margin-left`中的`-`连接符，它使用的是 JS 的驼峰语法，因为 React 实际上使用的是 JSX 语法——一种类 XML 的语法。

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

## 使用 JSX 语法

上一节中我们使用`  const myDiv = React.createElement('div',null,"这是myh1的父节点",myh1)`，创建了`myDiv`虚拟 DOM ， 但是这么写终究是太过繁琐了。

我们可以直接用 HTML 标记语言来描述虚拟 DOM 吗？答案是不可以但又可以，不可以是因为直接在这里使用 HTML 描述虚拟 DOM 只会报错，但是如果使用 `babel`插件后，是可以把 HTML 的元素转换成 React 下`React.createElement`方法创建的虚拟 DOM。像这样直接可以配合插件后可以使用 HTML 创建元素的语法叫`JSX`语法。

同样的，首先需要安装`babel`相关插件，依然使用`yarn`去安装：

```shell
yarn add babel-core babel-loader babel-plugin-transform-runtime
yarn add babel-preset-env babel-preset-stage-0 babel-preset-react
```

这里总共安装了六个插件，上面一行的三个插件的作用是安装`babel`的环境依赖，而下面一行的三个插件的作用更像是安装`babel`的语法依赖，由于`webpack`原生是不支持对`js`文件以外的其它文件进行打包的。

在有了这三个插件后，同样需要在`webpack.config.js`文件中进行配置。

在`module.exports={}`内配置`module: {}`键值对，然后再在`module:{}`内配置`rules`，`rules`也就是第三方的匹配规则，

```js
module: {
    rules: [
        {
            test:/\.js|jsx$/, //匹配js或者jsx文件
            use: 'babel-loader', // 这是之前安装的 babel-loader 插件
            exclude: /node_modules/ //将node_modules排除在外，并不需要对它进行打包处理
        }
    ]
}
```

配置完`webpack.config.js`后，还需要在根目录中增加`.babelrc`文件，这个文件配置的是`babel`的语法规则，

```json
{
    "presets":["env", "stage-0", "react"],
    "plugins": ["transform-runtime"]
}
```

在按照上述操作后，我们就可以愉快地在 React 中使用 HTML 语法创建元素了。

## JSX 中使用变量与表达式

我们之前提到过在使用 HTML 语法的 React 区域被称为 `JSX`语法，这个区域可以使用 JS 中的变量或者简单的表达式，只需要将变量写入`{}`中即可。例：

```react
import React from 'react';
import ReactDOM from 'react-dom';

const a =13;
const myDiv = <div>
                <p>{a}</p>
                <h2>{a+12}</h2>
                <h3>{true.toString()}</h3>
                <p>{ a>0 ? "a大于0" : "a小于0" }</p>
              </div>
ReactDOM.render(myDiv, document.getElementById('app'));

```

对于函数的使用，也需要将其添加进 JSX 语法区域的`{}`内。

我们可以使用数组让它渲染出多个 JSX 内容，例：

```react
const list = [<h1>hello</h1>, <h1>world</h1>];
const myDiv = <div>{list}</div>

ReactDOM.render(myDiv, document.getElementById('app'));
```

直接将内容放进数组中，然后再放进 JSX 的`{}`内时，存在一个`warning`，这个`warning`可以打开浏览器控制台进行查看，大意是在遍历的内容上缺少`key`，这个`key`一般指定为可遍历内容的索引。

况且在这个数组内，实际上存在着重复内容，我们应该考虑如何把内容放到`<h1></h1>`标签内。

我们可以使用`for`循环的方法，把数组的内容指定到标签内，

```js
const list1 = ["hello", "wor", "ld"];
const list = [];
for(var i=0;i<list1.length;i++){
  const temp = <h1 key={i}>{list1[i]}</h1>;
  list.push(temp);
}

const myDiv = <div>{list}</div>

ReactDOM.render(myDiv, document.getElementById('app'));
```

除了使用`for`循环外，使用`map`方法来遍历数组元素是一种比较简洁的做法。

```js
const myDiv = (
  <div>
    {list1.map((value,id) => (
      <h1 key={id}>{value}</h1>
    ))}
  </div>
);

ReactDOM.render(myDiv, document.getElementById('app'));
```

## React 中的注释

在 React 的`JSX`部分的注释需要使用`{/* */}`包裹需要注释的地方，如果是单行注释不能直接用`{//}`，这会使得与`//`同一行的`}`失去结束注释的作用，只需要注意换行即可单行注释

```jsx
{
    // 这是 JSX 部分的单行注释
}
```

对于非`JSX`部分的其它 JS 部分使用原生 JS 注释即可。

## React 创建组件

可以使用函数的方式为`React`创建一个组件。

```jsx
function Hello(){
 //   return null;
    return <div>HELLO</div>;
}
```

作为组件的变量，它的开头字母需要大写，注意需要返回内容，即使返回的是`null`也不能什么也不返回。

组件创建完后需要使用时，只需要把它放入需要渲染的内容中即可。

```react
const myDiv = <Hello/>


ReactDOM.render(myDiv, document.getElementById('app'));
```

由于`JSX`使用的是类`XML`语法，所以即使是单标签也需要被闭合。

如果需要为组件传递参数，只需要在使用组件的 DOM 时以赋值号的方式进行传递。

```jsx
const dog={
  name: "大黄",
  genter: "雄",
  color: "black"
}

const myDiv = <Hello name={dog.name} genter={dog.genter} color={dog.color}/>
```

然后在描述这个 DOM 的组件函数中进行使用，

```jsx
function Hello(props){
  return <h1>名字：{props.name} 毛色：{props.color} 性别：{props.genter}</h1>
}
```

在`JSX`部分引入变量需要使用`{}`，这点需要时刻注意。组件函数显然将所有传递进来的参数都封装进了一个`props`对象内，由于`props`是形参也可以使用别名。

在`ES6`语法中，允许对对象进行结构赋值，例：

```js
const a = {
    color: "red",
    height: 20,
    width: 30
}

const {color1, height1,width1}=a;
```

传递形参时，可以直接使用解构赋值的方式，把解构的内容作为形参。

```jsx
function Hello({name, color, genter}){
  return <h1>名字：{name} 毛色：{color} 性别：{genter}</h1>
}
```

函数实际上也可以用`ES6`语法中的箭头函数代替。

### 抽离组件

为了方便管理，一般都需要将组件进行抽离，将相关代码另置一个文件中，然后再导入到`index.js`中，组件的文件一般放在`components/`下，文件的名称是组件名称首字母小写。

在组件的文件内，由于组件是`React`的组件，所以需要使用`import React from 'react'`，同时还需要使用`export`将组件导出，组件名称首字母需要进行大写。

```jsx
import React from 'react'; 

function Hello({ name, color, genter }) {
  return (
    <h1>
      名字：{name} 毛色：{color} 性别：{genter}
    </h1>
  );
}

export default Hello;
```

但是这个时候我们在`index.js`中导入组件时需要将组件的后缀名也要写进来，否则就会报错，例：

```js
import Hello from './components/hello.jsx'
```

原因在于我们还未对 React 进行相关的配置。

在`webpack.config.js`文件中的`module.export={}`内添加`resolve:{}`，在`resolve`值内增加`extensions`用于配置省略文件后缀名。例：

```js
//从最基本的 webpack 到目前为止所用到的全部配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})

module.exports={
  mode: 'development',
  plugins: [
    htmlPlugin,
  ],
  module: { 
    rules:[{
      test: /\.js|jsx$/,
      use: "babel-loader",
      exclude: /node_modules/
    }] 
  },
  resolve: { 
    extensions:['.js', '.jsx', '.json'] 
  }
}
```

## Webpack 配置文件根目录路径

我们一般导入自己写的组件或者其他文件时，都需要完整的指出这个文件的相对路径位置，这可能有一些不太方便，我们可以指定某一个文件夹作为根目录，例如指定`src/`文件夹为`@`路径，那么就可以使用`@`代替`src/`了。

同样需要在`webpack.config.js`中配置，这时我们需要在上一节内容的`resolve`键值对内配置。

```js
//... 省略
resolve:{
    //...省略
    alias:{
        '@': path.join(__dirname, '/src')
    }
}
```





