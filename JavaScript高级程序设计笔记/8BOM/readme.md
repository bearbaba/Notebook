# 高级程序设计笔记

## BOM

### window 对象

BOM 的核心对象是`window`，它表示浏览器的实例。`window`在浏览器内既是通过 JS 访问浏览器窗口的一个接口，又是 ES 规定的`Global`对象。因此在网页中定义的任何一个对象、变量和函数都以`window`作为`Global`对象，因此有权访问`parseInt()`方法。

#### 全局作用域

所有在全局作用域中声明的变量、函数都会成为`window`对象的属性和方法。

但是需要注意的是：全局变量不能通过`delete`操作符删除，而直接在`window`对象上定义的属性可以删除。

```js
var age = 29
window.color = "red"
delete window.age //返回false

delete window.color // 返回 true
```

通过`var`语句添加的`window`属性有一个名为`[[Configurable]]`的特性，这个特性的值被设置为`false`，因此无法通过`delete`操作符被删除。

尝试访问未声明的变量会抛出错误，但是通过查询`window`对象，可以知道某个可能未声明的变量是否存在。

```js
var newValue = oldValue // oldValue未定义， 这里抛错

var newValue = window.oldValue //这里不会抛错，这是一次属性查询
```

#### 窗口关系及框架

如果页面中包含框架，则每个框架都拥有自己的`window`对象，并且保存在`frames`集合中。

在`frames`集合中，可以通过数值索引（从 0 开始，从左至右，从上到下）或者框架名称来访问相应的`window`对象。每个`window`对象都有一个`name`属性，其中包含框架的名称。

```js
window.frames[0]
window.frames["topFrames"] // 这里直接通过 name 属性来访问
top.frames[0] // 可以使用 top 替代 windows
```

```html
<frameset rows="160, *">
  <frame src="frame.html" name="topFrame" />
</frameset>
```

#### 窗口位置

用来确定和修改`window`对象位置的属性和方法有很多，可以通过一下代码跨浏览器来取得窗口左边和上边的位置。

```js
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY
```
