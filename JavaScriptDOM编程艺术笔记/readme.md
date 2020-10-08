# 笔记

## 节点

### 元素节点

元素节点（ element node ），HTML 中的`<body>`、`<p>`之类的元素，`<html>`是节点树的根元素。

### 文本节点

像`<p>`标签内会包裹的文本就是文本节点（ text node ），文本节点总是会被包含在元素节点的内部。

### 属性节点

`<p title="reminder">Hello</p>`在 DOM 内，`title=reminder`就是一个属性节点（ attribute node ），属性节点总是被包含在元素节点内。

### CSS

可以分为`class`属性和`id`属性。

## 获取元素

`getElementById`它能依据指定的 id 属性值获取指定的元素，

```js
document.getElementById("root");
```

获取`id`值为`#root`的元素。

`getElementsByTagName`依据元素的标签名来获取元素，它返回的是一个数组；

`getElementsByClassName`依据元素的 class 属性值来获取元素，它返回的也是一个数组

## 获取与设置属性

我们可以使用`getAttribute`获取元素的属性值，它不属于`Document`对象，而只能通过元素节点对象调用。

以下代码返回`p`标签内`title`的属性值。

```html
<p title="reminder">Hello World</p>
<script>
  var node = document.getElementsByTagName("p");
  console.log(node[0].getAttribute("title"));
</script>
```

`setAttribute`能够改变属性值，同样它只能作用于元素节点。

```js
object.setAttribute(attribute, value);
```

如上第一个参数是要修改的属性值，而第二个值则是用来替换的值。

```html
<p title="reminder">Hello World</p>
<script>
  var node = document.getElementsByTagName("p");
  console.log(node[0].getAttribute("title"));

  node[0].setAttribute("title", "lorem");
  console.log(node[0].getAttribute("title"));
</script>
```

## JavaScript 图片库

现在我们希望使用 DOM 来创建一个图片库，一个页面上有若干链接，我们点击这些链接会在该页面上显示不同图片。

```html
<div>
  <a href="./img/1.jpg">图片1</a>
  <a href="./img/2.jpg">图片2</a>
  <a href="./img/3.jpg">图片3</a>
  <a href="./img/4.jpg">图片4</a>
  <a href="./img/5.jpg">图片5</a>
</div>

<img id="img" src="./img/占位符.png" alt="" />
```

以上是该图片库的一个基本框架，如果我们希望点击链接时发生图片的变化，显然需要设置链接标签的点击事件即`onclick`，为`onclick`设置回调函数，在点击时它就会执行回调函数。因为需要改变图片，显然回调函数中需要设置图片的`src`属性。

```html
<div>
  <a href="./img/1.jpg" onclick="showPic(this); return false;">图片1</a>
  <a href="./img/2.jpg" onclick="showPic(this); return false;">图片2</a>
  <a href="./img/3.jpg" onclick="showPic(this); return false">图片3</a>
  <a href="./img/4.jpg" onclick="showPic(this); return false">图片4</a>
  <a href="./img/5.jpg" onclick="showPic(this); return false">图片5</a>
</div>

<img id="img" src="./img/占位符.png" alt="" />
<script>
  function showPic(whichpic) {
    var img = document.getElementById("img");
    var source = whichpic.getAttribute("href");
    img.setAttribute("src", source);
  }
</script>
```

以上是图片库的一个最终形态，`showPic(this)`括号中的`this`指向了点击的`a`标签，通过获取`a`标签的`href`属性值，再将`img`的标签的`src`属性值设为`a`标签的`href`属性值，就能在点击时进行图片的切换。

之所以还在`onclick`中设置`return false`是为了阻止点击`a`标签后页面跳转的默认行为。

## nodeType 属性

可以使用下面的语法获取节点的`nodeType`属性：

```js
node.nodeType;
```

`nodeType`属性总共有 12 种可取值，但其中仅有三种有实用价值：

1. 元素节点的`nodeType`属性值是 1。
2. 属性节点的`nodeType`属性值是 2。
3. 文本节点的`nodeType`属性值是 3。

## childNodes 与 nodeValue

`childNodes`是包含一个元素的所有子节点的数组，被节点包含的文本内容实际也是一个节点的子节点内容。

`nodeValue`可以得到与设置一个节点的值。

例如修改`<p>`标签包含的文本内容：

```html
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui excepturi
  consequatur odit, natus debitis omnis fuga unde tenetur ipsa perspiciatis
  asperiores nesciunt ratione quos sed iste. Libero fugiat amet accusamus?
</p>

<script>
  var node = document.getElementsByTagName("p")[0];
  var text = node.childNodes[0];
  text.nodeValue = "Hello World";
</script>
```

### firstChild 和 lastChild

`firstChild`与`lastChild`分别表示`childNodes`数组中第一个元素与最后一个元素。

## 扩展图片库

我们现在通过`document.getElementsByTag("a")`来获取全部`<a>`标签，再依次为它们的`onclick`事件绑定上相关能够改变`<img>`标签`src`属性的函数。

不过在为`onclick`绑定函数前，需要检测下相关获取节点的方法是否存在，如果使用的是早期 IE 浏览器，相关方法就不一定存在，检测的方法很简单，如果相关方法存在则它一定为`true`。

```js
function prepareGallery(){
  if (!document.getElementsByTagName) {
    return false
  }

  if (!document.getElementById) {
    return false
  }

  if (!document.getElementById("img")) {
    return false
  }
```

检测之后就可以依次为`<a>`标签`onclick`事件绑定相关方法了。

```js
var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    showPic(this);
    return false;
  };
}
```

在 JS 中获取当前引用的元素，只需要在函数内使用`this`就行了。

### 网页加载后执行函数

我们必须执行`prepareGallery`函数后才能对`onclick`进行绑定。

如果马上执行这个函数，它是无法工作的，它必须要等到 HTML 文档加载完成后才能执行`prepareGallery`函数。

网页加载完毕时会触发一个`onload`事件，这个事件与`window`相关联，我们需要将`prepareGallery`函数绑定到这个事件上。

```js
window.onload = prepareGallery;
```

然而这个事件有一个缺陷，它不同绑定多个函数，如果它绑定多个函数，它只会执行顺序排列的最后一个函数。

```js
window.onload = fun1;
window.onload = fun2;
```

如上，`onload`事件触发时只会执行`fun2`。

如果需要为`onload`绑定多个事件，那么需要使用`addLoadEvent`函数，它只有一个参数，在`onload`触发时执行的函数名字。

`addLoadEvent`函数并不是由系统所提供的，而是由我们手动添加的，它的内容是：

```js
function addLoadEvent(func){
  var oldLoadEvent = window.onload
  if(typeof window.onload !== "function"){
    window.onload = func
  }
  else{
    window.onload = function(){
      oldLoadEvent()
      func()
    }
  }
```

关键在于在我们未加载 DOM 之前，`window.onload`是`"object"`类型的，在它已经加载之后，`window.onload`是`"function"`类型的。

```js
addLoadEvent(fun1);
addLoadEvent(fun2);
```

如上，`addLoadEvent`为`onload`事件添加了两个函数，而这两个函数则都会被执行。

但实际上我们可以使用一个匿名函数中包含两个函数的方式，为`window.onload`添加两个函数。

```js
window.onload = function () {
  func1();
  func2();
};
```

## 动态创建标记

### document.write 方法

`document.write()`方法可以快捷地把字符串插入到文档内。

```html
<body>
  <script>
    document.write("<p>This is inserted.</p>");
  </script>
</body>
```

然而`document.write()`方法违背了“行为应该与表现分离”的原则，即使把`document.write`语句挪到外部函数中，它仍然需要在标记的`<body>`部分使用`<script>`标签才能调用那个函数。

另外，这样的文档很容易导致验证错误。比如说，字符串中的`"<p>"`很容易被当成真正的 HTML 标签，在`<script>`内使用`<p>`是错误的。

MIME 类型的`application/xhtml+xml`与`document.write`不兼容，浏览器在呈现这种 XHTML 文档时根本不会执行`document.write`方法。

### innerHTML 属性

大部分浏览器都能支持`innerHTML`属性，使用这个属性可以读写某给定的 HTML 内容。

比如对于以下这段内容使用`innerHTML`进行读取操作：

```html
<div id="testdiv">
  <p>Hello World</p>
</div>
```

```js
var div = document.getElementById("testdiv");
console.log(div.innerHTML);
```

这将输出`<p>Hello World</p>`，对于`innerHTML`而言，它并不能得到更加细节的内容，而是需要我们手动使用 DOM 方法和属性才能得到我们想要的内容。

除了读，它还能写入内容到 HTML 中。例：

```js
div.innerHTML = "<em>Hello World</em>";
```

但是它写入的内容会覆盖原有的内容，并且我们写入的 HTML 会自动被页面渲染为相应的 HTML 标记。

写入的内容会该属性使用时绑定的元素的子元素（子节点）。

### createElement 方法

`createElement`方法能够创建一个指定名称的 HTML 元素，例如下述代码能够创建一个 p 元素，

```js
document.createElement("p");
```

但是光创建它还不够，还需要能够插入到页面中。

### appendChild

`appendChild`方法能把新创建的节点插入到文档中的某个节点后，并作为它的子节点。语法：

```js
parent.appendChild(child);
```

那么现在我们就可以把用`createElement`所创建的节点，插入到现有文档树内了。

```js
var root = document.getElementById("root");
var p = document.createElement("p");
root.appendChild(p);
```

上述代码中手动创建的 p 元素就会在`root.appendChild(p)`使用后作为`id`值为`root`元素的子节点渲染到页面上了。

### createTextNode 方法

我们可以使用`createTextNode`方法创建文本节点。

需要注意的是，一般我们的文本节点实际上是另一个 HTML 元素的子节点，而不是它的兄弟节点。例：

```html
<p>Hello World</p>
```

这里的文本内容`"Hello World"`就是 p 标签的子节点，并非 p 标签的兄弟节点。

`createTextNode`方法的用法与`createElement`方法类似。

```js
document.createTextNode(text);
```

可以使用`appendChild`方法将文本节点插入到某个现有元素的子节点。例：

```js
var p = document.getElementById("testp");
var text = document.createTextNode("Hello World");
p.appendChild(text);
```

### 在已有元素前插入一个新元素

DOM 提供了名为`insertBefore()`方法，这个方法将把一个新元素插入到一个现有元素的前面，语法：

```js
parentElement.insertBefore(newElement, targetElement);
```

我们需要提供目标元素的父元素（`parentElement`），新元素（`newElement`），目标元素（`targetElement`）。目标元素的父元素实际上可以写成`targetElement.parentNode`。

例，在现有的 p 元素前插入一个文本子节点为"Hello"的 p 元素节点：

```html
<div id="root">
  <p>World</p>
</div>
```

```js
var root = document.getElementById("root");
var testp = root.getElementsByTagName("p")[0];
var newElement = document.createElement("p");
newElement.appendChild(document.createTextNode("Hello"));
testp.parentNode.insertBefore(newElement, testp);
```

实际上这里的`testp.parentNode`就是`root`，换成`root`也是也可以运行的。