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

