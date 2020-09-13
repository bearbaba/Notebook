# css世界笔记

## 流

### 块级元素

块级元素常见的有 `<div>` 、 `<li>` 、和 `<table>` ，块级元素并不意味着 `display: block` ， `<table>` 的 `display` 是 `table` ， `<li>` 的 `display` 的值是 `list-item` 。块级元素的特征在于一个水平流上只能单独显示一个元素，多个块级元素则换行显示。

“块级元素”具有换行特性，因此理论上它们可以使用 `clear` 来清除浮动的影响。

``` css
.clear::after {
    content: '';
    display: block;
    clear: both;
}

.box {
    background: red;
    padding: 10px;
}

.box>img {
    float: left;
}
```

### list-item 的项目符号与 inline-block 与 inline-table

为了能让 CSS 实现更多功能而添加来的有别于 `block` 与 `inline` 两大基础 `display` 值，而添加进来的新 `display` 值。

同理， `inline-block` 也是这么被添加进来的，这个属性使得元素既能像 `inline` 属性与图文存在于同一行，又能像 `block` 属性可以改变宽高，也即是一个外部像 `inline` ，内部像 `block` 一样的容器。

`inline-table` 也即外部像 `inline` ，内部像 `table` 的容器，它可以生成一个与图文存在同一行的表格。

``` html
<div id="app">
    和文字平起平坐：
    <table>
        <tr>
            <td>hello</td>
            <td>world</td>
        </tr>
    </table>
</div>
```

``` css
#app>table {
    display: inline-table;
}
```

### width: auto; 的用途

