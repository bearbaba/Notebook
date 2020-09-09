# JavaScript 高级程序设计（第三版）笔记

## 在 HTML 中使用 JavaScript

### script 元素

使用 `<script>` 元素是向 HTML 页面中插入 JavaScript 的主要方法， HTML 4.01 定义了下列 6 个属性：

* `async` ：可选，表示应该立即下载脚本，但不应妨碍页面中的其它操作，比如下载其它资源。只对外部脚本文件有效。
* `charset` ：可选，表示通过 `src` 属性指定的代码的字符集，浏览器大多会忽略它。
* `defer` ：可选，表示脚本可以延迟到文档完全解析和显示后才执行，只对外部脚本有效。（但是很有用，脚本可以直接放在 `<script>` 中，而不必在乎执行顺序）
* `language` ：已被废弃，表示编写代码所使用的脚本语言。
* `src` ：可选，表示要包含的外部文件。
* `type` ：可选，表示编写代码所使用的脚本语言的内容类型（也被称为 MIME 类型），可看成是 `language` 的替代属性， `text/javascript` 和 `text/ecmascript` 已不被推荐使用，但 `text/javascript` 一直都被使用。服务器传送 JavaScript 文件时使用的是 `application/x-javascript` ，但如果不要在 `type` 中设置这个值，可能会导致脚本被忽略。这个属性非必须，默认就是 `text/javascript` 。

包含在 `<script>` 中的 JavaScript 代码会从上往下顺序执行，在解释器对 `<script>` 元素内部的所有代码求值完毕以前，页面中的其余内容都不会被浏览器加载或显示。

使用 `<script>` 嵌入 JavaScript 代码时，不要在 JavaScript 代码中出现 `</script>` ，它会被浏览器误以为标签已经闭合，即使这个 `</script>·是个字符串也不行。可以使用转义字符` \/`解决这个问题。

``` html
<script>
    function danger() {
        alert("<\ /script>")
        console.log("danger")
    }

    danger()
</script>
```

如果要使用外部的 JS 文件， 那么 `src` 属性则是必须要使用的。

``` html
<script src="example.js"></script>
```

实际上只是把原本放在 `<script>`  `</script>` 之间的代码放到了外部文件中了。如果是在 XHTML 文档中，完全可以把双标签改写成单标签的模式，

``` html
<script src="example.js" />
```

但这种语法不符合 HTML 规范，而且不会得到 IE 等浏览器的支持。

如果已经决定要使用外部 JS 文件了，就不要再在 `<script>`  `</script>` 之间放置嵌入的 JS 代码了，这样只会执行外部的 JS 文件，而不会去执行嵌入的 JS 代码。

`<script>` 的 `src` 属性可以包含来自外部域的 JavaScript 文件，这一点使得它与 `<img>` 标签变得相似了，来自页面所在域的外部域的 JS 代码也会被执行，但要确保外部域的 JS 代码的安全性。

### 标签位置

惯例上 `<script>` 元素都应该放在页面的 `<head>` 元素中，但是这样却意味着先要加载、解析完 JS 代码的内容才会去呈现页面的内容（页面内容在 `<body>`  `</body>` 内，显然先执行 `<head></head>` ），这样无疑会使浏览器在呈现内容时出现延迟，所以为了解决这个问题，一般会把 JS 内容放在 `<body>` 元素中页面内容的后面。

### 延迟脚本

`defer` 这个属性能表明脚本在执行时不会影响页面构造，即把脚本延迟到整个页面都解析后再运行。

`defer` 在 XHTML 中需要设置为 `defer="defer"`

``` html
<head>
    <script defer="defer" src="example1.js"></script>
    <script defer="defer" src="example2.js"></script>
</head>

<body>
    <!--这里是 body 的内容-->
</body>
```

虽然脚本会延迟到 `body` 执行之后才执行（先于 `DOMContentLoaded` 事件之前），但是依据 HTML5 的规范 `example1.js` 会先于 `example2.js` 执行，可是在实际运行中并一定完全按照执行顺序执行，所以延迟脚本最好只存在一个，另外 `defer` 只适用于外部脚本。

### 异步脚本

`async` 与 `defer` 类似，也用于改变脚本的行为，同样只适用于外部脚本，它的作用在于不让页面等待脚本的下载和执行，而去异步加载页面的其它内容。

如果把这个属性用于多个 `<script>` 无法确保多个 `<script>` 的执行顺序（不然怎么叫异步脚本呢）。

异步脚本一定会在页面的 `load` 事件之前执行，但可能在 `DOMContentLoaded` 事件触发之前或之后执行。

### 嵌入代码与外部文件

使用外部文件相比于嵌入代码有以下好处：

1. 可维护性，把所有 JS 文件放进文件夹中维护起来就比较容易了。
2. 可缓存，可以根据实际情况去选择性地加载外部 JS 文件。
3. 适应未来，XHTML 和 HTML 使用外部 JS 文件的方式是一致的。

### noscript 元素

当浏览器不支持 JavaScript 或者支持但禁用了 JavaScript 时，可以使用 `<noscript>` 来显示出这个标签内的内容，除了这两个条件外都不会显示 `<noscript>` 内容。

``` html
<body>
    <noscript>
        <p>本页面需要浏览器支持（启用）JavaScript。</p>
    </noscript>
</body>
```

## 基本概念

 