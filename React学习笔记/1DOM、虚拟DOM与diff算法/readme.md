# DOM、虚拟 DOM 与 diff 算法

## DOM与虚拟DOM

`DOM`是由浏览器提供的，用 JS 对象模拟页面`DOM`树，并且提供了可以操作`DOM`的`API`。

然而浏览器没有提供获取 DOM 树的`API`，如果我们想要更新`DOM`树，我们是无法获取新旧`DOM`树的，所以我们需要手动模拟出新旧`DOM`树，手动模拟出的`DOM`便是虚拟`DOM`。

我们可以使用 JS 对象模拟出`DOM`元素以及元素之间的嵌套关系。

例，对于如下页面，

```html
<div>
    <h1 id='title'>
        Document
    </h1>
    <h2>
        标题二
    </h2>
</div>
```

我们可以这样去模拟：

```js
var element = {
    tagName: 'div',
    children:[
        {
            tagment: 'h1',
            attrs:{
                id:'title',
            },
   			content: 'Document'
        },
        {
            tagment: 'h2'
            content: '标题二'
        }
    ]
}
```

虚拟`DOM`是 JS 框架中的一个常见的概念。

## diff 算法

`diff`算法用于按需更新`DOM`树中的局部内容，它主要是在对新旧两棵`DOM`树进行对比，它使用三种算法来进行具体表现，

###  Tree Diff

新旧两棵`DOM`树逐层对比的过程就是`Tree Diff`，当整棵`DOM`树逐层对比完毕后，所有需要更新的元素必然查找完毕。（它对比的是两棵树层的级别）

### component diff

在进行新旧两棵`DOM`树对比时，在逐层对比的过程中，去进行组件级别的对比叫做`component diff`，对比前后类型一致，则暂时不需要进行更新；对比前后如果类型不一致，则创建新的组件，并追加到页面上。（它对比的是层中的组件）

### element diff

对比时，组件类型不相同相同则进行元素级别对比，这叫做`element diff`。（它对比的组件内的元素）