# 高级程序设计笔记

## BOM

### window 对象

BOM 的核心对象是`window`，它表示浏览器的实例。`window`在浏览器内既是通过 JS 访问浏览器窗口的一个接口，又是 ES 规定的`Global`对象。因此在网页中定义的任何一个对象、变量和函数都以`window`作为`Global`对象，因此有权访问`parseInt()`方法。

#### 全局作用域

所有在全局作用域中声明的变量、函数都会成为`window`对象的属性和方法。

但是需要注意的是：全局变量不能通过`delete`操作符删除，而直接在`window`对象上定义的属性可以删除。

```js
var age = 29;
window.color = "red";
delete window.age; //返回false

delete window.color; // 返回 true
```

通过`var`语句添加的`window`属性有一个名为`[[Configurable]]`的特性，这个特性的值被设置为`false`，因此无法通过`delete`操作符被删除。

尝试访问未声明的变量会抛出错误，但是通过查询`window`对象，可以知道某个可能未声明的变量是否存在。

```js
var newValue = oldValue; // oldValue未定义， 这里抛错

var newValue = window.oldValue; //这里不会抛错，这是一次属性查询
```

#### 窗口关系及框架

如果页面中包含框架，则每个框架都拥有自己的`window`对象，并且保存在`frames`集合中。

在`frames`集合中，可以通过数值索引（从 0 开始，从左至右，从上到下）或者框架名称来访问相应的`window`对象。每个`window`对象都有一个`name`属性，其中包含框架的名称。

```js
window.frames[0];
window.frames["topFrames"]; // 这里直接通过 name 属性来访问
top.frames[0]; // 可以使用 top 替代 windows
```

```html
<frameset rows="160, *">
  <frame src="frame.html" name="topFrame" />
</frameset>
```

#### 窗口位置

用来确定和修改`window`对象位置的属性和方法有很多，可以通过以下代码跨浏览器来取得窗口左边和上边的位置。

```js
var leftPos =
  typeof window.screenLeft == "number" ? window.screenLeft : window.screenX;
var topPos =
  typeof window.screenTop == "number" ? window.screenTop : window.screenY;
```

#### 窗口大小

跨浏览器确定窗口大小：

```js
var pageWidth = window.innnerWidth;
var pageHeight = window.innerHeight;

if (typeof pageWidth != "number") {
  if (document.compatMode == "CSS1Compat") {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}
```

#### 弹出窗口

```js
var page = window.open("http://www.baidu.com", "baidu");
```

以上代码相当于点了一个`<a href="http://www.baidu.com" target="baidu" />`的链接，`window.open()`原本有第三个参数用于控制弹出的窗口大小、位置等，然而浏览器默认不允许改变有可以改变浏览器大小位置的操作。

像一下那种可以改变浏览器的操作也是默认不被允许的。

```js
// 调整大小
page.resizeTo(500, 500);

//移动位置
page.moveTo(100, 100);
```

#### 间歇调用和超时调用

超时调用使用的是 JS 的`setTimeout()`方法，接受两个参数，一个参数是要执行的代码，另一个是以毫秒表示的时间（在执行第一个参数所表示的代码前要等待的时间）。

一个参数可以是字符串，但最好是一个函数。

```js
setTimeout(function () {
  console.log;
}, 1000);
```

但等待的时间可能要超过第二个参数所表示的时间（任务队列机制）。

在调用`setTimeout()`后，该方法会返回一个数值 ID ，表示超时调用。这个超时调用 ID 是计划执行代码的唯一标识，可以通过它来取消超时调用。要取消尚未执行的超时调用计划，可以调用`clearTimeout()`方法并将相应的超时调用 ID 作为参数传递给它。

```js
//设置超时调用
var timeoutId = setTimeout(function () {
  console.log("hello world");
}, 1000);

//取消调用
clearTimeout(timeoutId);
```

在指定时间尚未过去前调用`clearTimeout()`，就可以完全取消超时调用。

间歇调用使用`setInterval()`，它接受的参数与`setTimeout()`相同，不过它会按照指定时间重复执行代码。

```js
setInterval(function () {
  console.log("Hello World", 1000);
});
```

调用`setInterval()`方法后同样也会返回一个间歇调用 ID，该 ID 可用于在将来某个时刻取消间歇调用。

取消未执行的间歇调用，可以使用`clearInterval()`方法并传入相应的间歇调用 ID。

```js
var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber() {
  num++;

  if (num == max) {
    clearInterval(intervalId);
    console.log("Done");
  }
}

intervalId = setInterval(incrementNumber, 500);
```

#### 系统对话框

```js
var isOk = confirm("Are you Ok?");
if (isOk) {
  alert("Yes, it's Ok");
} else {
  alert("No");
}
```

`alert`弹出警示框，`confirm`弹出确认框，点击不同的按钮返回不同的布尔值。

`prompt`会弹出一个允许我们进行输入值的输入框。

```js
var text = prompt("请输入内容");
alert(text);
```

### location 对象

`location`对象保存着当前文档的信息，能将 URL 解析为独立的片段。

#### 查询字符串


