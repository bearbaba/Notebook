# CSS 浅谈公共样式

在开始本篇幅之前，先介绍两个非常有用的 CSS3 属性：`var`、`calc`与`@import`。

## var 变量属性

使用`var`属性，我们就可以将样式的属性值设置成一个变量，不过前提是这个变量需要提前声明好，现在来看一段代码：

```css
.box{
    --box-width: 100px;
    --box-bg-color: red;
    --box-height: 100px;
    height: var(--box-height);
    width: var(--box-width);
    background-color: var(--box-bg-color);
}
```

如上，很清楚了解`height`的值实际上就是`--box-height`的值，`var`使用的变量规范是`--*`，所以参照规范，我们使用`--`作为开头。

有人会问你这样不也需要在每个样式里挨个写变量嘛，但是`var`允许的变量是可以继承的，例：

```css
div{
    --box-width: 100px;
    --box-bg-color: red;
    --box-height: 100px;
}

.box{
    height: var(--box-height);
    width: var(--box-width);
    background-color: var(--box-bg-color);
}

<div class="box">这是个盒子</div>
```

![这是一个盒子](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210319081259698.png)

伪类也是被允许继承的，那么就可以使用`:root`提前将变量值写好了，然后通过`var`引用这些变量，`:root`伪类表示文档树的根元素。

使用`var`好处是一处声明，处处使用，并且一处修改，处处也能同时发生变化，这样就便于后期的修改。

以下是对一个普通输入框的样式修改：

```css
:root{
  --input-width : 100px;
  --input-height: 25px;
  --box-bgc: rgb(0, 190, 238);
}

.input {
  font-size     : 16px;
  padding       : 0 5px;
  outline       : none;
  width         : var(--input-width);
  height        : var(--input-height);
  border-radius : calc(var(--input-height)/2);
  border        : 1px solid var(--box-bgc);
  color         : red;
}

.input:focus,
.input:hover,
.input:active {
  -webkit-box-shadow: 0 0 5px var(--box-bgc);
  box-shadow        : 0 0 5px var(--box-bgc);
}

<input type="text" name="" id="" class="input">
```

![效果](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210319084259409.png)

看到了吧，`--box-bgc`在多处被`var`引入，如果后期想要对它们的颜色进行修改，就不需要一处一处地去寻找修改了。

以上样式中还有`calc`属性，这个属性的用处在于对值进行简单地运算，例如这里我们想要输入框变成胶囊状，就需要`border-radius`大于等于它的高度的一半（对`border-radius`用法不熟可以回去看文档了)，`calc(var(--input-height)/2)`就是在计算高度的一半。

## @import

`@import`用于引入外部 CSS 样式，与 HTML 中的`link:css`用法不同的是这个属性是直接写在 CSS 中的，这意味着我们可以通过`@import`来引入别的 CSS 文件中的样式。

```css
/* 比如说这是 a.css 的样式*/
div{
    width: 100px;
    height: 100px;
}

/* 这是 b.css 的样式*/
@import url("./a.css");
```

例如以上 b.css 通过`@import url("./a.css")`能导入 a.css 中的样式，那么引入`b.css`的 HTML 文件就能获得与`a.css`样式相同的效果。

这个很类似于“继承”的效果，一个样式的文件继承了另一个样式的文件。

## 公共样式

我为什么要谈论`var()`与`@import `呢，实际上公共样式的思路就是这样的：一处修改，处处修改，还要有可以继承的地方。我们通常需要在一个项目的文件根目录下放置一个公共样式的目录，这个目录里的样式能够被其它页面下的样式所引入，例：

```txt
├─pages
│  ├─cart
│  │  └─css
│  ├─index
│  │  └─css
│  └─news
│      └─css
└─static
    └─shareCss
```

这里的`static`与`pages`平级，`static`里就是公共的样式，而`pages`可以是软件的页面文件，在项目中，项目负责人可以将这些页面分工给不同的人，但是软件的界面样式是类似的，每一个界面都有可能用到相同的样式。

```css
/*假设 shareCSS/share.css 里的样式可能会被其它页面所引用 */
:root{
  --all-box-width : 10rem;
  --all-box-height: 2rem;
  --all-font-family: Arial, Helvetica, sans-serif;
  --button-background: rgb(31, 191, 231);
}

.box-size {

  width           : var(--all-box-width);
  height          : var(--all-box-height);
}

.box-style {
  border: 1px solid black;
}

.title-style {

  font-family      : var(--all-font-family);
}

.button {

  background         : var(--button-background);
  width              : 60px;
  height             : 30px;
  border-style       : none;
}

.button:hover {
  box-shadow: 0 0 5px var(--button-background);
}
```

例如华为的商标是红色，那么在界面内，红色就可能会多次被用上，与其让页面下的每个 CSS 文件每次写的时候都重复写一遍，不如提前写好直接在使用时引用（类似于工厂函数的设计模式）。

如果不提前把公共的部分抽离出来，那么在后期需要修改公共部分的时候，就需要依次到每个页面的文件下进行修改，这样就会大大增加工作量。

