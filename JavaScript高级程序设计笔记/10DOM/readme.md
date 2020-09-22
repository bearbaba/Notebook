# JavaScript 高级程序设计笔记

## DOM

DOM（文档对象模型）是针对 HTML 和 XML 文档的一个 API 。DOM 描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。

### 节点层次

DOM 可以将任何 HTML 或 XML 文档描述成一个有多层节点构成的结构。节点分为几种不同的类型，每种类型分别表示文档中不同的信息及标记。每个节点都拥有各自的特点、数据和方法，另外也与其它节点存在某种关系。节点之间的关系构成了层次，所有页面标记则表现为一个特定节点为根节点的属性结构。

文档节点是每个文档的根节点，对于 HTML 而言，它只有一个子节点，即`<html>`元素，称之为文档元素。

文档元素是文档的最外层节点，文档中其它元素都包含在文档元素中。

### Node类型

DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现，在 JS 中 Node 接口作为 Node 类型实现，除了 IE 之外的浏览器都可以访问到这个类型。JS 中所有节点类型都继承自 Node 类型， 因此所有节点类型都共享着相同的基本属性和方法。

每个节点都有一个`nodeType`属性，用于表明节点的类型。Node 类型由 12 个常量表示，可以通过比较`nodeType`属性值来确定节点的类型，在 IE 中无法通过属性值来确定 Node 类型，但却可以通过这些属性的索引值来确定。

节点元素对应`nodeType`属性值中的`Node.ELEMENT_NODE(1)`，在 IE 中为索引值 1。

确定`someNode`是否为一个节点元素：

```js
if(someNode.nodeType == 1){ // 适用于所有浏览器
  console.log("Node is an element")
}
```

#### nodeName 和 nodeValue

```js
if(someNode.nodeType == 1){
  value = someNode.nodeName // someNode 的值是元素的标签名
}
```

上述代码首先确认是否为一个元素，如果是，就会取得`nodeName`的值。对于元素节点，`nodeName`保存的始终是元素的标签名，而`nodeValue`始终是`null`。

#### 节点关系

每个节点都有一个`childNodes`属性，其中保存着一个`NodeList`对象。`NodeList`是一种类数组对象，用于保存一组有序节点，可以通过位置来访问这些节点。

可以通过方括号语法来访问`NodeList`的值，而且这个对象也有`length`属性，但它不是`Array`实例。DOM 的动态变化会反映到`NodeList`上。

