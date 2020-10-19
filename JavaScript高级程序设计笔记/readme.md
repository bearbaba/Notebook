# JavaScript 高级程序设计（第三版）笔记

## 在 HTML 中使用 JavaScript

### script 元素

使用 `<script>` 元素是向 HTML 页面中插入 JavaScript 的主要方法， HTML 4.01 定义了下列 6 个属性：

- `async` ：可选，表示应该立即下载脚本，但不应妨碍页面中的其它操作，比如下载其它资源。只对外部脚本文件有效。
- `charset` ：可选，表示通过 `src` 属性指定的代码的字符集，浏览器大多会忽略它。
- `defer` ：可选，表示脚本可以延迟到文档完全解析和显示后才执行，只对外部脚本有效。（但是很有用，脚本可以直接放在 `<script>` 中，而不必在乎执行顺序）
- `language` ：已被废弃，表示编写代码所使用的脚本语言。
- `src` ：可选，表示要包含的外部文件。
- `type` ：可选，表示编写代码所使用的脚本语言的内容类型（也被称为 MIME 类型），可看成是 `language` 的替代属性， `text/javascript` 和 `text/ecmascript` 已不被推荐使用，但 `text/javascript` 一直都被使用。服务器传送 JavaScript 文件时使用的是 `application/x-javascript` ，但如果不要在 `type` 中设置这个值，可能会导致脚本被忽略。这个属性非必须，默认就是 `text/javascript` 。

包含在 `<script>` 中的 JavaScript 代码会从上往下顺序执行，在解释器对 `<script>` 元素内部的所有代码求值完毕以前，页面中的其余内容都不会被浏览器加载或显示。

使用 `<script>` 嵌入 JavaScript 代码时，不要在 JavaScript 代码中出现 `</script>` ，它会被浏览器误以为标签已经闭合，即使这个 `</script>·是个字符串也不行。可以使用转义字符` \/`解决这个问题。

```html
<script>
  function danger() {
    alert("<\ /script>");
    console.log("danger");
  }

  danger();
</script>
```

如果要使用外部的 JS 文件， 那么 `src` 属性则是必须要使用的。

```html
<script src="example.js"></script>
```

实际上只是把原本放在 `<script>` `</script>` 之间的代码放到了外部文件中了。如果是在 XHTML 文档中，完全可以把双标签改写成单标签的模式，

```html
<script src="example.js" />
```

但这种语法不符合 HTML 规范，而且不会得到 IE 等浏览器的支持。

如果已经决定要使用外部 JS 文件了，就不要再在 `<script>` `</script>` 之间放置嵌入的 JS 代码了，这样只会执行外部的 JS 文件，而不会去执行嵌入的 JS 代码。

`<script>` 的 `src` 属性可以包含来自外部域的 JavaScript 文件，这一点使得它与 `<img>` 标签变得相似了，来自页面所在域的外部域的 JS 代码也会被执行，但要确保外部域的 JS 代码的安全性。

### 标签位置

惯例上 `<script>` 元素都应该放在页面的 `<head>` 元素中，但是这样却意味着先要加载、解析完 JS 代码的内容才会去呈现页面的内容（页面内容在 `<body>` `</body>` 内，显然先执行 `<head></head>` ），这样无疑会使浏览器在呈现内容时出现延迟，所以为了解决这个问题，一般会把 JS 内容放在 `<body>` 元素中页面内容的后面。

### 延迟脚本

`defer` 这个属性能表明脚本在执行时不会影响页面构造，即把脚本延迟到整个页面都解析后再运行。

`defer` 在 XHTML 中需要设置为 `defer="defer"`

```html
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

```html
<body>
  <noscript>
    <p>本页面需要浏览器支持（启用）JavaScript。</p>
  </noscript>
</body>
```

## 基本概念

### 语法

JavaScript 的标准是 ECMAScript ，它的语法大量借鉴了 C 及其它类 C 语言的语法。

#### 区分大小写

ECMAScript 中的一切（变量、函数和操作符）都区分大小写。

#### 标识符

所谓标识符就是指变量、函数、属性的名字，或者函数的参数，它需要符合下列格式规则组合起来的一个或多个字符：

- 第一个字符必须是一个字母、下划线（\_）或者一个美元符号（\$）；
- 其它字符可以是一个字母、下划线、美元符号或数字。

ECMAScript 标识符采用驼峰大小写格式，也就是一个字母小写，剩下的每个有意义的单词的首字母大写，例：

firstSecond
myCar

#### 注释

ECMAScript 使用 C 风格的注释，包括单行注释和块级注释。单行注释以两个斜杠开头，

```js
// 单行注释
```

块级注释以一个斜杠和一个星号（/_）开头，以一个星号和一个斜杠（_/）结尾，

```js
/*
这是
块级
注释
*/
```

#### 严格模式

ECMAScript 5 (以后均简称 ES5) 引入了严格模式（strict mode）的概念，严格模式是为 JavaScript 定义了一种不同的解析与执行模型。在严格模式中，某些不安全的操作会抛出错误。为启用严格模式可以在顶部添加如下代码：

```js
"use strict";

```

这一行是编译指示，用于告诉支持的 JavaScript 引擎切换到严格模式。

在函数内部上方包含这条编译指示，也可以指定函数在严格模式下执行：

```js
function doSomething() {
  "use strict";
  // 函数体
}
```

#### 语句结尾

只有在下一行开头是方括号、括号、正则表达式开头的斜杠、加号、减号的情况下才需要在这一行使用`;`作为结尾。

虽然语句结尾加分号并不是必须的，但是为了可读性，以及便于开发者通过删除空行来压缩代码。

#### 变量

##### var 声明变量

ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。

定义变量使用`var`标识符，后跟变量名。

在函数中使用`var`声明的变量成为定义该变量作用域中的局部变量，它会在函数退出后被销毁。

```js
function test() {
  var message = 10;
  console.log(message);
}

test();
console.log(message); // 这里会报错
```

但是如果在函数作用域内不使用`var`声明该变量，而直接为它赋值，那么它将成为全局作用域内的变量。

```js
function test() {
  message = "hi";
  console.log(message);
}

test(); // 这里就正常了
```

可以使用一条语句定义多个变量，只要把各个变量用逗号分隔开即可。

```js
var message = "hi",
  found = false,
  age = 29;
```

代码里的换行与变量的缩进并不是必须的，但是为了增进代码可读性可以这么做。

`var`声明提升，使用下述代码不会报错，

```js
function func() {
  console.log(age);
  var age = 12;
}

func();
```

输出结果是`undefined`，虽然并没有报错，但也好像与报错区别不大，关键在于`var`会提升变量，在这里，`age`被提升到了函数顶部，尽管此时`age`并没有初始值。

##### （第四版内容）let 声明变量

`let`与`var`的作用区别并不大，但有着非常重要的区别，`let`声明的范围是块作用域，而`var`声明的范围是函数作用域。

```js
var i = 1;
if (i) {
  let a = 13;
}
console.log(a);
```

上述代码会报错：Uncaught ReferenceError: a is not defined ，原因在于`if`条件语句是个块作用域，使用`let a = 12`生成的变量`a`仅限于这个块内。

`let`也不允许在一个块内重复声明一个变量，这样会导致报错`SyntaxError`。

即使使用`var`与`let`混用来重复声明一个变量也会导致错误，它们在作用域内的是重复的，并不因为它们使用了不同的声明格式而变成了两个变量。

`let`也不允许变量提升的存在，在`let`声明之前的执行瞬间被称为“暂时性死区”，在此阶段引用任何后面才声明的变量都会报`ReferenceError`的错误。

最后`let`在全局作用域内声明的变量并不会称为`window`对象的属性，事实上全局作用域对于`let`而言也只是大一点儿的块，因而依然不同重复声明一个变量。

始终要注意`let`声明的变量仅限于它所处的那个块，`for`循环，`while`循环，`if`，`try...catch`对它而言都是块，在块外不可访问块内`let`声明的变量。

##### （第四版新增） const 声明变量

`const`的行为与`let`基本相同，但用它声明变量时必须同时初始化变量，`const`声明的变量不可更改，尝试修改`const`声明的变量会导致运行时错误。

`const`声明的限制只适用于它指向的变量的引用，如果`const`变量引用的是一个对象，那么修改对象的内部属性并不违反`const`声明不可更改的限制。

```js
const person = {};
person.name = "Hallen";
console.log(person.name);
// 不会报错
```

##### 声明风格及最佳实践

限制自己只使用`let`与`const`有助于提升代码质量，因为变量有了明确的作用域、声明位置，以及不变的值。

使用`const`声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不合法的赋值操作。优先使用`const`能使开发者比较容易发现因赋值不当而导致的非预期行为。

### 数据类型

ECMAScript 中有 5 种简单数据类型（也称为基本数据类型）： Undefined 、 Null 、 Boolean 、 Number 和 String 。

还有一种复杂数据类型 Object 对象，实际上 JS 中的大部分数据类型都是 Object 类型。

Undefined 类型实际上只有一个值——`undefined`。

#### typeof 操作符

`typeof`用于检测给定变量的数据类型——`typeof`就是负责提供这方面信息的操作符，对一个值使用`typeof`操作符可能会返回下面某个字符串：

- `"undefined"`——如果这个值未定义；
- `"boolean"`——如果这个值是布尔值；
- `"string"`——如果这个值是字符串；
- `"number"`——如果这个值是数值；
- `"object"`——如果这个值是对象或`null`;
- `"function"`——如果这个值是函数。

下面是使用`typeof`操作符的例子：

```js
var message = "some string";
console.log(typeof message);
console.log(typeof message);
console.log(typeof 95);
```

`typeof`是一个操作符，而不是一个函数，所以可以不必使用括号。

`typeof null`会返回`object`，因为`null`被当作了一个空的对象引用。

对未初始化的变量执行`typeof`操作符会返回`undefined`，而对未声明的变量执行`typeof`操作符也会返回`undefined`。

```js
var message;

console.log(typeof message); // 这毋庸置疑返回的是 undefined
console.log(typeof age); // 也返回 Undefined , 这就很奇怪了，不是吗？
```

#### Null 类型

Null 类型也是只含有一个值的数据类型，这个值是`null`。`null`值表示一个空对象指针，这也是使用`typeof`
会返回`"object"`的原因。

如果定义的变量准备保存对象，那么将对象初始化为`null`而不是其他值，这样只要检查`null`值就能知道对应的变量是否保存了一个对象的引用。

ECMA-262 规定`undefined == null`返回`true`。

#### Boolean 类型

Boolean 类型含有两个字面值：`true`和`false`，`true`不一定等于 1，`false`不一定等于 0。

可以使用转型函数`Boolean()`将一个值转换为对应的 Boolean 值。

```js
var message = "hello";
console.log(Boolean(message)); // 输出 true
```

`Boolean()`转型的结果取决于这个值的数据类型和其实际值。

| 数据类型  |       转换为 true 的值       | 转换为 false 的值 |
| :-------: | :--------------------------: | :---------------: |
|  Boolean  |             true             |       false       |
|  String   |        任何非空字符串        |  ""（空字符串）   |
|  Number   | 任何非零数字值（包括无穷大） |     0 和 NaN      |
|  Object   |           任何对象           |       null        |
| Undefined |        n/a（不适用）         |     undefined     |

#### Number 类型

Number 类型可表示整数或浮点数（也可称为双精度数值），为支持各种数值类型，ECMA-262 定义了不同数值字面量格式。

最基本的数值字面量格式是十进制整数，直接使用相关数值即可，无需使用其它符号表示十进制。

```js
var num = 21;
```

八进制数值以开头第一位为 0 来表示，数值序列为 0~7。如果超过数值范围会忽略前置的 0 ，而被当成是十进制处理。

```js
var num1 = 070; //八进制的56
var num2 = 009; // 无效的八进制数，超过了八进制数能表示的范围，但是会被当成十进制9处理
```

八进制字面量在严格模式下会抛出错误。

十六进制数以开头两位为 0x 来表示，数字序列为 0~9 A~F，A~F 表示 10~15 ，A~F 可大写可小写。

```js
var hexNum1 = 0xa; // 十进制的10
```

在进行数值运算时，八进制与十六进制数会被转换成十进制数。

##### 浮点数值

浮点数值就是该数值中必须包含一个小数点，小数点后面必须至少要有一位数字，小数点前面可以没有整数。

```js
var floatNum1 = 1.1;
var floatNum2 = 0.9;
```

保存浮点数的内存空间是保存整数值的两倍，ECMAScript 总会想着将浮点数转换为整数值。如果小数点后面没有跟任何数字，那么这个数值会作为整数值被保存。如果浮点数值本身表示的是一个整数（如 1.0），那么该数值会被转换为整数。

```js
var floatNum1 = 1; // 解析为1
var floatNum2 = 10.0; //解析为10
```

可以使用 e 表示法（即科学计数法）表示极大的数或极小的数，但使用 e 表示法的数值是浮点数。

```js
var floatNum = 3.13e7; // 等于31300000
var floatNum1 = 3.13e7; // 等于0.000000313
```

默认情况下， ECMAScript 会将小数点后面带有 6 个零以上的数值转换为以 e 表示法表示的数值。

浮点数值最高精度是 17 位小数，进行数值计算时的精度却不如整数。例如，0.1 加 0.2 的结果是 0.30000000000000004 。

##### 数值范围

由于内存的限制，ECMAScript 并不能保存所有的数值，ECMAScript 能表示的最小数值保存在`Number.MIN_VALUE`中，在大多数浏览器中，这个值是 5e-324；能表示的最大数值保存在`Number.MAX_VALUE`中，在大多数浏览器中这个数值是 1.79769...e+308 。如果超出了能表示的最大值，那么这个值被转换成 Infinity 值。如果超出了能表示的最小值，则会被转换成 -Infinity（负无穷）。

想要确定一个数是否为有穷的，可以使用 isFinite() 函数，如果是有穷的，那么返回值为`true`。

```js
var result = Number.MAX_VALUE + Number.MIN_VALUE;
console.log(isFinite(result));
```

##### NaN 数值

`NaN`，即非数值（Not a number）是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况（这样不会抛出错误）。

在 ECMAScript 中，任何数值除以 0 会返回`NaN`，而不会报错。

`NaN`与任何值都不相等，包括`NaN`本身。

```js
console.log(NaN == NaN); //输出false
```

`isNaN()`函数用来判断一个参数是否为`NaN`,如果是，则返回`true`；如果不是，则返回`false`。

##### 数值转换

`Number()`、`parseInt()`和`parseFloat()`可以将非数值转换为数值。

`Number()`可用于任何类型，另外两个函数专门用于把字符串转换为数值。

`Number()`转换规则为：

- 如果是`Boolean`值，`true`和`false`分别转换为 1 和 0。
- 如果是数字值，不变。
- 如果是`null`值，返回 0。
- 如果是`undefined`值，返回`NaN`。
- 如果是字符串遵循以下规则：
  - 字符串中只含数字（包括带正号和负号的情况），将其转换为对应的十进制数值，前置 0 会被忽略；
  - 如果字符串中包含浮点格式，将其转换为对应的浮点数值。
  - 如果是空字符串，则转换为 0；
  - 如果字符串中包含上述格式外的字符，将其转换为 NaN。
- 如果是对象，则调用对象的`valueOf()`方法，依照前面的规则转换返回的值。如果转换的结果是 NaN，则调用对象的`toString()`方法，再按照前面的规则转换返回的字符串值。

`parseInt()`可以依据不同的整数格式将字符串转换为相应进制的数值。

```js
let string1 = "hello";
console.log(parseInt(string1)); // NaN

string1 = "1234bleu";
console.log(parseInt(string1)); // 1234

string1 = "0xAF";
console.log(parseInt(string1)); //解释成16进制的数值，不过输出依然是十进制

string1 = "hell23ff";
console.log(parseInt(string1)); // NaN
```

除此之外，`parseInt()`允许传入第二个参数用于指定底数（进制数）。

```js
string1 = "AF";
console.log(parseInt(string1, 16)); //解析成十六进制数 AF 对应的十进制数

string1 = "0101";
console.log(parseInt(string1, 2)); // 解析成二进制数 0101 对应的十进制数
```

`parseFloat()`函数的工作方式跟`parseInt()`函数类似，它会从位置 0 开始检测每个字符，解析到字符串末尾或者解析到一个无效的浮点数值字符为止。但是这个函数只解析十进制数值，也不能传递底数，对于十六进制数值始终会返回 0。

#### String 类型

String （字符串） 数据类型表示零或多个 16 位 Unicode 字符序列。字符串可以使用双引号（"）、单引号（'）、反引号（`）（第四版新增）标示。

以某种引号作为字符串开头则必须要以该种引号作为字符串结尾。

字符串数据包含一些字符字面量，它们使用反义符号开头`\`。

字符字面量可以出现在字符串任意位置，且可以作为单个字符被解释。

字符串的长度可以通过`length`属性获取。

##### 字符串特点

字符串是不可变的，在创建之后就不可更改，修改字符串的方式只能通过销毁原始值之后在原始值的基础上增添新值的方式。

##### 转换字符串

几乎任何类型的值都含有`toString()`方法，它能返回当前值相应的字符串值。

`null`和`undefined`值没有`toString()`方法。

数值类型使用`toString()`方法时，允许为`toString()`传递一个作为底数的参数，能把数值转换成相应底数进制的字符串值。

```js
const num = 23;
document.writeln(num.toString(2)); // 10111
document.writeln(num.toString(8)); // 27
```

##### （第四版新增）模板字面量

ES6 新增了使用模板字面量定义字符串的能力，也即使用反引号的字符串。模板字面量保留换行字符，可以跨行字符串。

模板字面量会保持反引号内部的空格。

模板字面量在 React 框架中比较常用。

##### 字符串插值

模板字面量的一个特性是字符串插值，允许在一个连续的字符串中插入一个或多个变量，非字符串变量会被转换成相应字符串实例的值。

字符串插值语法通过`${}`来实现。

```js
const age = 23;
const name = "Lance";
const sentence = `Name is ${name}, age is ${age}`;
alert(sentence);
```

##### 模板字面量标签函数

模板字面量也支持定义标签函数，标签函数通过前缀到模板字面量来应用自定义行为。

```js
function func(e1, e2, e3) {
  console.log(e1);
  console.log(e2);
  console.log(e3);
}
const name = "Lance";
const age = 23;

func`Name is ${name}, age is ${age}`; // 与下述语句在输出内容上相同

func('["Name is ", ", age is ", "", raw: Array(3)]', name, age);
```

对于有 n 个插值的模板字面量，传给标签函数的表达式参数的个数始终是 n，而传给标签函数的第一个参数所包含的字符串个数始终是 n+1，第一个参数实际上是模板字面量中并不包含变量的字符串分隔开的字符串所组成的数组。

#### Symbol 类型

Symbol(符号) 是 ES6 新增的数据类型，符号是原始值，且符号实例是唯一不可变的，符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

##### Symbol 类型的创建

符号需要使用`Symbol()`函数初始化，因为符号本身是原始类型，所以`typeof`操作符对符号返回`symbol`。

可以为`Symbol()`传递一个参数作为对符号的描述，描述可以是相同的，但是这个描述与符号定义或标识完全无关。

```js
let a = Symbol("foo");
let b = Symbol("foo");
console.log(a == b); // false
```

可以把`Symbol()`函数括号内的描述信息当成是一段注释。

只需要创建出`Symbol()`实例并将其用作对象的新属性，就可以保证它不会覆盖已有的对象属性，无论是符号属性还是字符串属性。

```js
console.log(a); // Symbol(foo)

let c = Symbol();
console.log(c); // Symbol()
```

`Symbol()`函数不能与`new`关键字一起作为构造函数使用，这样是为了避免创建符号包装对象。

但是我们可以借用`Object()`函数创建符号包装对象。

```js
let mySymbol = Symbol();
let my = Object(mySymbol);
```

##### 使用全局符号注册表

在之前的`Symbol`类型变量创建时，我们即使创建了两个描述信息完全相同的变量，它们依然是不等的，但我们可以创建一个全局符号注册表，它允许我们对一个符号实例进行共享与重用。

```js
let symbolDemo = Symbol.for("foo");
console.log(symbolDemo); //Symbol(foo)

let symbolDemo1 = Symbol("foo");
console.log(symbolDemo == symbolDemo1); // false

let symbolDemo2 = Symbol.for("foo");
console.log(symbolDemo == symbolDemo2); // true

let symbolDemo3 = Symbol.for();
console.log(symbolDemo3); // Symbol(undefined)
```

如上述代码所示，`console.log(symbolDemo == symbolDemo2);`输出为`true`表示这两个变量都使用的是`Symbol.for("foo")`。

全局符号与普通符号是不同的，即使它们有着一样的描述信息，对于全局符号，那段描述信息相当于它的键，但需要注意的是作为参数传给`Symbol.for()`的任何值都会被转换成字符串。

我们可以使用`Symbol.keyFor()`来查询全局注册表，这个方法接收符号，返回该全局符号对应的字符串键（也就是传给`Symbol.for()`的参数）。如果查询的不是全局符号，返回值为`undefined`。

```js
console.log(Symbol.keyFor(symbolDemo2)); // foo

console.log(Symbol.keyFor(symbolDemo1)); // undefined

console.log(Symbol.keyFor(symbolDemo3)); // undefined

console.log(Symbol.keyFor(123)); // Uncaught TypeError: 123 is not a symbol
```

##### 符号作为属性

可以使用符号作为对象的属性，

```js
let s1 = Symbol("foo");

let o = {
  [s1]: "foo val",
};

console.log(o); //{Symbol(foo): "foo val"}
```

除了上述的常规写法，也可以使用`Object.defineProperty()`方法或者`Object.defineProperties()`方法定义对象属性，它们增添或者修改对象的属性，不过增添或者修改的属性都不可修改。

```js
let s1 = Symbol("foo"),
  s2 = Symbol(),
  s3 = Symbol("s3"),
  s4 = Symbol("s4");
let o = {
  [s1]: "foo val",
};

console.log(o); //{Symbol(foo): "foo val"}

Object.defineProperty(o, s2, { value: "fooz" });

console.log(o); // {Symbol(foo): "foo val", Symbol(): "fooz"}

Object.defineProperties(o, {
  [s3]: { value: "s3 val" },
  [s4]: { value: "s4 val" },
});

console.log(o); // {Symbol(foo): "foo val", Symbol(): "fooz", Symbol(s3): "s3 val", Symbol(s4): "s4 val"}

// Object.defineProperty 能增添或是修改对象的属性，Object.defineProperties 能增添或者修改多个对象的属性。
```

使用`Object.getOwnPropertyNames()`可以返回对象实例的常规属性数组，`Object.getOwnPropertySymbols()`返回对象实例的符号属性数组。`Object.getOwnPropertyDescriptors()`会返回同时包含常规和符号属性描述符的对象。`Reflect.ownKeys()`会返回两种类型的键：

```js
let s11 = Symbol("foo");
let s12 = Symbol("fuz");

let o1 = {
  [s11]: "foo val",
  [s12]: "fuz val",
  t1: "t1",
  t2: "t2",
};

console.log(Object.getOwnPropertyNames(o1)); // (2) ["t1", "t2"]
console.log(Object.getOwnPropertySymbols(o1)); // (2) [Symbol(foo), Symbol(fuz)

console.log(Object.getOwnPropertyDescriptors(o1)); // {t1: {…}, t2: {…}, Symbol(foo): {…}, Symbol(fuz): {…}}
console.log(Reflect.ownKeys(o1)); // (4) ["t1", "t2", Symbol(foo), Symbol(fuz)]
```

### 操作符

#### 逻辑非

逻辑非使用一个感叹号`!`。

如果使用连续使用两个感叹号`!!`，相当于使用了`Boolean()`转型函数，第一个感叹号总会返回布尔值，第二个感叹号执行取反操作。

```js
const color = "blue";
console.log(!!color); // true

const num = 0;
console.log(!!num); // false
```

#### 指数操作符

这是 ES7 新增的操作符，可以用`**`替代`Math.pow()`的功能。

```js
console.log(2 ** 3); // 8

console.log(4 ** 0.5); // 2
```

### 变量、作用域与内存

#### 原始值与引用值

原始值是简单的数据，而引用值则是多个数据组成的对象。引用值可以添加、修改、删除属性。

原始值与引用值在复制及函数值传递上的表现有所不同。

##### 原始值与引用值的创建

```js
let name = "Mir";
let name1 = new Object();
name.age = 13;
name1.age = 24;
console.log(name.age); // undefined
console.log(name1); // {age: 24}
console.log(name1.age); // 24
```

`Object`想当于所有对象的祖先，我们可以使用它来创建一个对象。如上述代码所示，原始值不能再增添属性，虽然不会报错，但会显示值未定义。

##### 原始值与引用值的复制

原始值与引用值在复制的表现上各不相同，对于原始值，把它赋值给另一个变量，赋值的是它的一个副本，不会影响原先的值。而引用值赋值给另一个变量时，赋值的是它的引用或者指针，如果修改另一个变量也会影响到原先的引用值。

```js
let name = "Mir";
let name1 = new Object();
name.age = 13;
name1.age = 24;

// name 把值复制了一份传递给了 name2
let name2 = name;
name2 = "3";
console.log(name); // Mir

// name1 把指针复制了一份传递给了 name3
let name3 = name1;
name3.age = 20;
console.log(name1.age); // 20 name1.age被修改了，因为现在 name3 与 name1指向的是同一个对象
```

##### 函数中的值传递

EScript 中的所有函数的参数都是按值传递的，值传递时会把参数复制给一个局部函数，对于原始值复制的依然是它的副本，而对于引用值虽然依然会复制它，但是在函数内对引用值的副本进行修改依然会影响到原本身处函数外部的引用值的。

```js
let person = new Object();
person.name = "Mir";

function func(obj) {
  obj.name = "Lance";
  obj.age = 23;
}

func(person);

console.log(person.name); // Lance
```

需要注意的是函数是按值传递的，即复制的是引用值变量而并未非传递的是引用值的指针，

```js
let a = new Object();

function func(obj) {
  obj.name = "Mir";

  obj = new Object();
  obj.name = "Lance";
  console.log(obj.name); // Lance
}

func(a);

console.log(a.name); // Mir
```

如上所示，如果传递进函数内部的是指向变量`a`的指针，那么在函数内部覆盖`obj`的行为（相当于让原先指向`a`的指针重新指向别的位置）也会改变原先的引用值，然而并没有，只不过引用值的副本依然可以指向原引用值的内存位置。

#### 执行上下文与作用域

当 JS 引擎解析到可执行代码片段（通常是函数调用阶段）的时候，就会先做一些执行前的准备工作，这个 “准备工作”，就叫做 "执行上下文(execution context 简称 EC)" 或者也可以叫做执行环境。

上下文的代码在执行时，会创建变量对象的一个作用域链（ scope chain ），这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。

代码正在执行的上下文的变量对象始终位于作用域链的最前端。而全局上下文则始终位于作用域链的最后端。

代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的。搜索过程始终从作用域链最前端开始，逐级向后，直到找到标识符。

执行上下文分为三种：

1. 全局执行上下文，这是整个程序默认的上下文，它在整个执行过程中位于执行堆栈的最底部，并且不会被栈弹出。全局上下文生成一个全局对象，（在浏览器中是 window 对象）
2. 函数执行上下文，函数被调用时就会创建一个新的函数执行上下文，即使这个函数是重复调用的，也会创建执行上下文。
3. `eval`函数执行上下文，这个`eval`函数并不安全，不去讨论。

函数被执行时，它会被激活为活动对象，它的函数内的属性与方法才能被访问。当它被执行完毕时，它的函数执行上下文也会被销毁。

我们可以使用`try...catch...`语句或者`with`语句增强作用域链。这两个语句都会在作用域链最前端增加一个变量对象，对`catch`而言是要抛出的错误。

#### 垃圾回收

JS 是使用垃圾回收的语言，由执行环境负责代码执行后的内存管理。

比较常用的两种垃圾回收方式为：标记清理和引用清理。

##### 标记清理

标记清理是最常用的垃圾回收策略。

变量进入上下文是，就会被加上存在于上下文的标记，当它离开这个上下文时会被加上离开上下文的标记。

如果一个变量在任何上下文中都访问不到，显然它应该被清理掉。

垃圾回收程序运行时会为所有内存中的变量打上标记，然后将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉，在这之后还被加上标记的变量就是待删除的。显然这种回收机制是周期性。

##### 引用计数

引用计数的思路是记录每个值被引用的次数，每次这个值被引用一次，这个值的引用数加 1，如果保存该值的变量使用了其它值，这个值的引用次数减一，引用数为 0 时，表示它可以被清除了。

##### 内存管理

如果一个数据不再必要时，我们应当手动把它设为`null`，手动解除它的引用，这适合于全局变量和全局对象的属性。

尽量使用`let`与`const`，声明变量，这样存在于局部作用域内的变量离开后即能被清理清理掉。

## 引用类型

### Boolean 引用值类型

Boolean 是对应布尔值的引用类型，要创建一个`Boolean`对象，就使用`Boolean`构造函数并传入`true`或`false`。

```js
let booleanObject = new Boolean(false);
```

但是布尔引用类型与原始值存在很大区别。例：

```js
let booleanObject = new Boolean(false);
console.log(booleanObject);
let booleanValue = false;
console.log(booleanObject && true); // true
console.log(booleanValue && true); // false
```

布尔类型的对象无论构造函数传入的参数是什么在参与函数表达式时，是转换为`true`的，等于`false`多包装了一层，直接参与比较的不再是`false`，而是包装后的对象。

原始值`false`就是`false`。

`typeof`对布尔对象的返回值是`object`，对原始值返回`boolean`。同样的，布尔对象是布尔类型的实例。

```js
console.log(booleanObject instanceof Boolean); // true
console.log(booleanValue instanceof Boolean); // false
```

### Number 引用值类型

Number 类型对象创建与 Boolean 类型对象创建一致，使用`new`来创建。

```js
let numObject = new Number(0);
```

以下方法比较常用，

#### toFixed

`toFixed()`方法返回指定小数点位数的数值字符串。

```js
let num = 10.12345;
console.log(num.toFixed(2)); // 10.12
console.log(num.toFixed(1)); // 10.1
```

#### toExponential

`toExponential()`方法与`toFixed()`类似，但是它返回的科学计数法表示的数值字符串。

```js
let n = 99;
console.log(n.toExponential(1)); //9.9e+1
```

#### toPrecision

`toPrecision()`方法会根据情况返回最合理的输出结果，可能是固定长度，可能是科学计数法的形式，同样接受一个指定位数的参数。

```js
let n = 99;
console.log(n.toPrecision(1)); // 1e+2
console.log(n.toPrecision(3)); // 99.0
console.log(n.toPrecision(4)); // 99.00
```

#### isInteger

`isInteger()`方法用于辨别一个数值是否保存为整数。

```js
let n1 = 99.0;
console.log(Number.isInteger(n1)); // true

let n2 = 99.1;
console.log(Number.isInteger(n2)); // false
```

### String 引用值类型

String 是对应字符串的引用类型。它的创建方式与 Number 和 Boolean 类型相似。

```js
let str1 = new String("Hello World");
```

它含有大量方法可以使用，以下方法比较常用：

#### charAt

`charAt()`方法返回给定索引位置的字符，由传入方法的整数参数指定。

```js
let str1 = new String("Hello World");
console.log(str1.charAt(4)); // o
```

#### concat

`concat()`方法用于将一个或多个字符串拼接成一个新字符串，并不会销毁原来的字符串。

```js
let oldString = "hello";
let newString = oldString.concat("world");
console.log(newString); //helloworld

let newNewString = oldString.concat(" ", "World", "!");
console.log(newNewString); // hello World!
```

`concat()`方法还允许接受多个参数值，然后将多个参数值进行拼接。

#### 字符串截取 slice()、substr() 和 substring()

`slice()`、`substr()`和`substring()`这三个方法以同样的方式被调用。当它们只传入一个正整数参数时，这个正整数参数将被当作截取的起始索引，从这个索引截取到整个字符串。

```js
let str2 = "hello world";
console.log(str2.slice(2)); // llo world
console.log(str2.substr(2)); // llo world
console.log(str2.substring(2)); // llo world
```

如果传入的是两个正整数参数，对于`slice()`和`substring()`方法第一个参数仍是子字符串在字符串中的起始索引，而第二个参数则表示在字符串中的结束索引，即在第二个参数所表示的索引值前的字符都会被截取。对于`substr()`，第二个参数表示要截取的字符个数。

```js
console.log(str2.slice(2, 5)); // llo
console.log(str2.substring(2, 5)); //llo
console.log(str2.substr(2, 5)); //llo w
```

当某个参数是负值时，`slice()`方法会把所有的负值参数都当成字符串长度加上负参数值。

`substr()`方法将第一个参数值当成字符串长度加上该值，将第二个参数当成 0，而`substring()`方法会将所有的负参数值都转换为 0。

```js
console.log(str2.slice(-3)); // rld
console.log(str2.substring(-3)); // hello world
console.log(str2.substr(-3)); // rld

console.log(str2.slice(2, -3)); // llo wo
console.log(str2.substring(2, -3)); // he
console.log(str2.substr(2, -3)); // 空的字符串
```

#### 字符串位置方法 `indexOf()`与`lastIndexOf()`

`indexOf()`表示按照正常顺序，即从左到右查找传入的字符串参数，如果有第二个参数，表示从第二个参数所表示的索引位置开始查找。

`lastIndexOf()`方法则从右到左查找传入的字符串参数，第二个参数也会使它从这个索引位置开始从右至左查找。

```js
let str3 = "hello hello world";
console.log(str3.indexOf("hello")); // 0
console.log(str3.lastIndexOf("hello")); // 6

console.log(str3.indexOf("hello", 3)); // 6
console.log(str3.lastIndexOf("hello", str3.length - "world".length)); // 6
```

#### 字符串包含方法

ES6 新增的 3 个用于判断字符串中是否包含另一个字符串的方法：`startsWith()`、`endsWith()`和`includes()`。

这些方法都会从字符串中搜索传入的字符串，并返回一个是否包含的布尔值。

`startsWith()`方法只检查开始于索引 0 的匹配项，`endsWith()`检查开始于索引( string.length - substring.length )的匹配项，`includes()`会检查整个字符串。

```js
let str4 = "barbazfoo";
console.log(str4.startsWith("baz")); // false
console.log(str4.startsWith("bar")); // true

console.log(str4.endsWith("baz")); // false

console.log(str4.includes("baz")); // true
```

#### trim

将返回一个删除字符串前后所有空格的字符串副本。

```js
let str5 = "hello world   ";
console.log(str5.trim()); //hello world
```

#### padStart() 和 padEnd() 方法

`padStart()`和`padEnd()`会以指定长度填充字符串，如果小于指定长度，可以指定不同的填充符号或者使用字符串填充，如果不指定，默认以空格进行填充。

```js
let str6 = "hello";
console.log(str6.padStart(10)); // "     hello"
console.log(str6.padStart(10, "!")); // !!!!!hello
console.log(str6.padEnd(13, "world")); // helloworldwor
```

#### 字符串迭代与解构

字符串原型上暴露了一个`@@iterator`方法，表示可以迭代字符串上的每个字符。

```js
let str8 = str7[Symbol.iterator]();
console.log(str8.next()); // {value: "h", done: false}done: falsevalue: "h"__proto__: Object

console.log(str8.next()); // {value: "e", done: false}done: falsevalue: "e"__proto__: Object
```

### Math 对象

Math 对象提供了大量数学公式的方法和属性。

`Math.random()`返回一个 0~1 范围内的随机数，如果要返回一个 1~10 范围的随机数，可以这样：

```js
console.log(Math.random() * 10 + 1);
```

### Array 引用类型

#### 创建数组

我们依然可以使用构造函数创建数组类型：

```js
let arr1 = new Array(20); // 指定创建 length 为20的数组
let arr2 = new Array("hi", "hello", "OK"); // 指定创建内容为["hi", "hello", "OK"]的数组
```

如上，可以使用构造函数创建指定长度或者指定内容的数组。

我们还能使用数组字面量进行创建：

```js
let arr3 = [1, 3, 4];
let arr4 = ["hi", "hello", "OK"];
```

ES6 新增了两个创建数组的静态方法：`from()`和`of()`。

`Array.from()`的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个`length`属性和可索引元素的结构。

```js
const str1 = "Mattte";
console.log(Array.from(str1)); // ["M", "a", "t", "t", "t", "e"]

const map1 = new Map().set(1, 2).set(2, 3);
console.log(Array.from(map1));

const set1 = new Set().add(1).add(2).add(3);
console.log(Array.from(set1)); // [1, 2, 3]
```

`Array.of()`可以把一组参数转换为数组。

在使用`new Array()`创建数组时，存在一个弊端，如果我们给它传入的是一个数字，它会把数组作为数组的长度，但如果我们想要的只是单纯的含有一个数字的数组呢？对于`Array()`构造函数则无法分辨。

`Array.of()`就只会把参数转换为数组，而不会是数组的长度。

#### isArray()

`isArray()`方法用于检测变量是否为数组。

`isInstanceOf`检测变量是否为数组对象实例时可能会由于这个数组变量来源于其它页面，而不属于当前页面上下文而失效。

#### 迭代器方法

在 ES6 内，Array 的原型上暴露了 3 个用于检索数组内容的方法：`keys()`、`values()`、`entries()`。`keys()`返回数组索引迭代器，`entries()`返回索引/值对的迭代器。

由于这些方法返回的是迭代器，可以使用`Array.from()`方法将它们转换为数组。

```js
let arr4 = ["hi", "hello", "OK"];

console.log(Array.from(arr4.keys())); // [0, 1, 2]
```

#### 填充方法 fill()

`fill()`方法是 ES6 新增的方法，只有一个参数时，会把数组的每一项都替换成这个参数内容。第二、第三个参数替换部分的开始索引与结束索引，只有在索引顺序正确时才会起效。

```js
let arr5 = [2, 4, 7, 9, 8, 0];
console.log(arr5.fill(3)); // [3, 3, 3, 3, 3, 3]
console.log(arr5.fill(2, 2, 5)); // [3, 3, 2, 2, 2, 3]
console.log(arr5.fill(0, 4, 10)); // [3, 3, 2, 2, 0, 0]
```

#### 批量复制方法 copyWithin()

`copyWithin()`方法会按照指定范围浅复制数组中的部分内容，然后插入到指定索引开始的位置。

```js
let arr6 = [];

function getArray() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(i);
  }
  return arr;
}

arr6 = getArray();

arr6.copyWithin(0, 5);
console.log(arr6); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]

arr6 = getArray();
getArray(arr6);
arr6.copyWithin(3, 7, 9);
console.log(arr6); // [0, 1, 2, 7, 8, 5, 6, 7, 8, 9]
```

#### 搜索与位置方法

ES 提供两类搜索数组的方法：按严格相等搜索与按回调函数搜索。

`indexOf()`、`lastIndexOf()`和`includes()`是按严格相等的搜索方法。它们都接受两个参数，第一个参数是要搜索的值，第二参数是搜索的起始索引位置。

`indexOf()`和`lastIndexOf()`如果没有查找到返回-1，`includes()`返回布尔值。

`find()`和`findeIndex()`方法是按照定义的回调函数搜索数组。它们的回调函数都接收三个参数：元素、索引和数组本身。元素是数组中当前搜索的元素，索引是当前元素的索引，而数组是正在搜索的数组，回调函数返回真值

`find()`返回第一个匹配的元素，`findeIndex`返回第一个匹配元素的索引。它们还都接受第二个参数，表示回调函数内部`this`的值。

```js
let arr7 = getArray();
let arr8 = arr7.find((item, index, array) => {
  return item > 7;
});
console.log(arr8);
```

然而这两个方法只会找到匹配的一项，而不是全部匹配元素，并且不会改变原先的数组。

#### 归并方法

ES 提供两个归并方法：`reduce()`和`reduceRight()`，这两个方法都会从数组第一项遍历到数组最后一项。

这两个方法接收两个参数，对每一项都会使用的归并函数，可选的归并起点，第二个参数若未设置，则从数组的第二项开始迭代。

第一个参数归并函数接受四个参数，上一归并项，当前归并项，当前项的索引和数组本身。

```js
let arr9 = getArray();
let sum = arr9.reduce((prev, cur, index, array) => prev + cur);
console.log(sum); // 45
```

### Map 类型

Map 类型与对象类型相似，但是在内存管理上比对象类型更精细，更节省内存的使用。

Map 类型的创建：

```js
let map1 = new Map();
map1.set("firstName", "Lance");
map1.set("lastName", "HarPer");
console.log(map1); // {"firstName" => "Lance", "lastName" => "HarPer"}

let map2 = new Map();
map2.set("name", "flower").set("color", "red");
console.log(map2); // {"name" => "flower", "color" => "red"}
```

Map 类型使用`set()`方法增加一组键值对。

Map 类型含有`get()`方法可以通过指定键获得映射的值，`has()`则是通过键来进行查询，可以使用`delete()`和`clear()`删除值，还能通过`size`属性获取映射的键值对数量。

```js
let map3 = new Map();
map3.set("firstName", "Lance").set("lastName", "HarPer");

console.log(map3.has("color")); // false
console.log(map3.get("firstName")); // Lance
console.log(map3.size); // 2

map3.delete("lastName");
console.log(map3); //{"firstName" => "Lance"}

map3.set("color", "blue");
map3.clear(); // 清空所有键值对
console.log(map3);
```

### Set 类型

Set 类型看起来像是加强版的 Map 类型。

Set 类型可以在生成实例的同时对实例初始化。

```js
let set1 = new Set(["val1", "val2", "val3"]);
console.log(set1); //{"val1", "val2", "val3"}
```

使用`add()`方法增加值，使用`has()`查询值，`size`属性返回值的数量，同样含有`delete()`方法和`clear()`方法可以清除值。

Set 可以保留值的顺序。

## 面向对象的程序设计

面向对象（ OBject-Oriented，OO）的语言有一个标志，它们都有类的概念，通过类可以创建任意多个具有相同属性和方法的对象。 ECMAScript 中没有类的概念，它的对象也就与其它面向对象语言有所不同。

ECMA-262 把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”可以把 ECMAScript 的对象想象成散列表。

### 理解对象

创建自定义对象的最简单方式就是创建一个 `Object` 的实例，然后再为他添加属性和方法。

```js
var person = new Object()
person.name = "Nicholas"
person.age = 29
person.job = "Software Engineer"

person.sayName = functon() {
    alert(this.name)
}
```

这里的 `alert(this.name)` 会被解析成 `person.name` 的值。 `person` 对象含有 `name` 、 `age` 、 `job` 三个属性以及 `sayName()` 一个方法。可以改写成：

```js
var person = {
    name: "Nicholas"
    age: 29
    job: "Software Engineer"

    sayName: function() {
        alert(this.name)
    }
}
```

#### 属性类型

ECMA-252 第五版在定义只有内部采用的特性（ attribute ）时，描述了属性（ property ）的各种特征，这些特性是为了实现 JavaScript 引擎用的，在 JS 中不能直接访问它们。为了表示特性时内部值，该规范把它们放在了两对儿括号中，例 `[[Enumerable]]` 。

ECMAScript 中有两种属性：数据属性和访问器属性。

1. 数据属性，数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性。

- `[[Configurable]]` ：表示能否通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。这个属性值默认为 `true` 。
- `[[Enumerable]]` ：表示能够通过 `for-in` 循环返回属性。这个属性值默认为 `true` 。
- `[[Writable]]` ：表示能否修改属性的值。默认为 `true` 。
- `[[Value]]` ：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。默认值为 `undefined` 。

```js
var person = {
  name: "Nicholas",
};
```

这里创建了一个名为 `true` 的属性， `[[Value]]` 特性将被设置 `"Nicholas"` ，而这个值的任何修改将反映在这个位置。

要修改属性默认的特性，必须使用 ES5 的 `Object.defineProperty()` 方法，这个方法接收三个参数：属性所在的对象、属性的名字和一个描述对象。描述符（ descriptor ）对象的属性必须是： `configurable` 、 `enumerable` 、 `writable` 和 `value` 。设置其中的一个或多个值可以修改对应的特性值。

```js
var person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas",
});

alert(person.name);
person.name = "Greg";
alert(person.name); // 输出"Nicholas"，并没有被修改
```

因为将 `name` 的 `writable` 设置成了 `false` 表明它是不可写的，故而它的值无法被更改。

##### 访问器属性

访问器属性不包含属性值，它们包含一对儿 `getter` 和 `setter` 函数（这两个属性非必须）。在读取访问器属性时，会调用 `getter` 函数，这个函数负责返回有效的值，在写入访问器属性时，会调用 `setter` 函数并传入新值，这个函数负责决定如何处理数据。

访问器属性有如下 4 个特性：

1. `[[Configurable]]` ：表示能否通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。这个属性默认值为 `true` 。
2. `[[Enumerable]]` ：表示能否通过 `for-in` 循环返回属性。这个属性的默认值为 `true` 。
3. `[[Get]]` ：在读取属性时调用的函数。默认为 `undefined` 。
4. `[[Set]]` ：在写入属性时调用的函数。默认为 `undefined` 。

访问器属性不能直接定义，必须使用 `Object.defineProperty()` 来定义。

```js
var book = {
  _year: 2004,
  edition: 1,
};

Object.defineProperty(book, "year", {
  get: function () {
    return this._year;
  },
  set: function () {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  },
});

book.year = 2005;
console.log(book.edition); //2
```

上述的 `book` 对象给它定义了两个默认的属性： `_year` 和 `edition` 。 `_year` 前面的下划线是一种常用的记号，用于表示只能通过对象方法访问的属性。而访问器属性 `year` 则包含一个 `getter` 函数和一个 `setter` 函数。 `getter` 函数返回 `_year` 的值， `setter` 函数通过计算来确定正确的版本。上述访问器的作用在于修改了 `year` 属性会导致 `_year` 与 `edition` 同时变化，这也是访问器常见的作用，设置一个属性的值会导致其它属性变化。

只指定 `getter` 意味着属性是不可写的，尝试写入会被忽略或者会报错。 `setter` 没有指定也会导致属性不能读。

在 ES5 之前要创建访问器属性，一般使用两个非标准方法： `__defineGetter__()` 和 `__defineSetter()__` 。

#### 定义多个属性

ES5 定义了一个 `Object.defineProperties()` 方法。利用这个方法可以一次性定义多个属性。这个方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。

```js
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004,
  },
  edition: {
    value: 1,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function () {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    },
  },
});
```

#### 读取属性的特性

使用 ES5 的 `Object.getOwnPropertyDescriptor()` 方法，可以取得给定属性的描述符，这个方法接收两个参数：属性所在对象和要读取其描述符的属性名称。返回值是一个对象，如果是访问器属性，这个对象的属性有 `configurable` 、 `enumerable` 、 `get` 和 `set` ；如果是数据属性，这个对象的属性有 `configurable` 、 `enumerable` 、 `writable` 和 `value` 。

```js
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004,
  },

  edition: {
    value: 1,
  },

  year: {
    get: function () {
      return this._year;
    },

    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    },
  },
});

var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor.value); // 2004
console.log(descriptor.configurable); // false

var descriptor = Object.getOwnpropertyDescriptor(book, "year");
console.log(descriptor.value); //undefined
console.log(descriptor.enumerable); //false
console.log(typeof descriptor.get); //function
```

在 JS 中，可以针对任何对象——包括 DOM 和 BOM 对象使用 `Object.getOwnPerportyDescriptor()` 方法。

#### ES6 中的一些对象语法

##### 可计算属性

在引入可计算属性前，我们无法在命名对象属性时，给对象属性一个动态的名称，即用变量作为属性名。在计算属性之前，所有的属性名都会以字符串的形式表示，如果属性名是数字，则会被转换为字符串。

可计算属性允许对变量使用方括号，然后将这个值作为属性名。

```js
let person = {
  name: "Lance",
};

person.color = "red";

person["hobby"] = "Code";

console.log(person);

// 以上三种添加的属性的方法，属性名都是字符串的形式。

person = null;

// 使用可计算属性
let name = "name";
let color = "color";

let person1 = {
  [name]: "Lance",
  [color]: "color",
};

name = "name1";

person1[name] = "Harper"; // 此时 会新增一个 name1: "Harper" 的键值对，name："Lance" 并没有从对象中删除

console.log(person1);
```

##### 对象解构语法

ES6 新增的对象结构语法允许使用嵌套数据实现一个或多个赋值操作。

只需要一对花括号就能将对象中的键值对解构成变量与变量所表示的值。

```js
let person1 = {
  name: "Lance",
  color: "Red",
};

let { name, color } = person1;

console.log(name);

let person = {
  name: "Lance",
  color: "Red",
};

let { name: name1, color: color1 } = person;
console.log(`name1: ${name1}, color1: ${color1}`);
```

上述的内容中有与对象本身属性同名的变量的解构法，也有另外声明的属性在解构时使用键值对的方式进行解构的方式。

需要注意的是，如果先声明了变量，那么在结构时需要使用括号表示法解构。

```js
let person2 = {
  name: "Lance",
  color: "Red",
};

let name2, color2;

({ name: name2, color: color2 } = person2);

console.log(name2);
```

### 创建对象

虽然 `Object` 构造函数或对象字面量都可以用来创建单个对象，但这些方式都有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。

#### 工厂模式

这种模式抽象了创建具体对象的过程，开发人员用函数来封装以特定接口创建对象的细节。

```js
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}

var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");

console.log(person1);
console.log(person2);
```

这个模式解决了创建多个相似对象的问题，但却没有解决如何识别一个对象类型的问题。

#### 构造函数模式

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```

`Person()` 函数与 `createPerson()` 函数的不同之处：

- 没有显示地创建对象；
- 直接将属性和方法赋给了 `this`
- 没有 `return` 语句。

按照惯例构造函数开头始终都应该是一个大写字母开头，而非构造函数都应该以一个小写字母开头，主要是区分构造函数与其它函数。

`person1` 与 `person2` 分别保存着 `Person` 的一个不同实例，这两个对象都有一个 `constructor` 属性，该属性指向 `Person` 。

```js
person1.constructor == Person; // true
person2.coustructor == Person; //true
```

依然可以使用 `instanceof` 操作符来验证对象的类型。

```js
console.log(person1 instanceof Object); // true
console.log(person1 instanceof Person); // true
```

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型。如果是之前的工厂模式 `person1 instanceof createPerson` 显然为 `false` 。

1. 将构造函数当作函数

构造函数与其它函数的区别在于调用它们的方式不同，任何函数，只要使用 `new` 操作符来调用，那么它就可以作为构造函数，否则它就只是一个普通的函数。

前面定义的 `Person()` 函数可以通过下列任何方式来调用。

```js
//当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); // "Nicholas"

//当作普通函数来使用
Person("Greg", 27, "Doctor");
window.sayName(); // "Greg"

var o = new Object();
Person.call(o, "kriSten", 25, "Nurse");
o.sayName(); // "kriSten"
```

如果不使用 `new` 操作符调用 `Person()` 时，属性和方法都被添加给了 `window` 对象。也可以使用 `call()` 在某个对象的作用域中调用 `Person()` 函数，例如 `o` 对象作用域中调用了 `Person()` 函数，所以 `o` 就拥有了所有属性和 `sayName()` 方法。

##### 构造函数的问题

构造函数模式的问题在于每个方法都要在每个实例上重新创建一遍，也即是说每个实例上生成的函数实际上是不相等的，即使它们的执行过程并无二致。

```js
person1.sayName == person2.sayName; // false
```

我们完全可以在构造函数外部来定义函数，再将它赋值给指向不同对象的 `this` 。

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}

function sayName() {
  console.log(this.name);
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.sayName();
console.log(person1.sayName == person2.sayName);
```

这个时候不同对象的 `sayName` 实际上是相同的了，因为它们实际上是同一个全局作用域内的 `sayName()` 方法。

但是这样依然是有问题的，这个全局作用域内的函数实际上只能被对象使用，并不能指望它独自运行。而且如果对象需要定义很多方法，那么就需要定义很多全局函数，这个时候它的封装性也就荡然无存了。

#### 原型模式

我们创建的每个函数都有一个 `prototype` （原型）属性，这个属性是一个指针，指向一个对象，而这个对象的作用是包含可以由特定类型的所有实例共享的属性和方法。实际上 `prototype` 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象可以让所有对象实例共享它所包含的属性和方法。

```js
function Person() {}
Person.prototype._name = "Nicholas";
Person.prototype.age = 27;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  console.log(this._name);
};
var person1 = new Person();
var person2 = new Person();
person1.sayName();
console.log(person1.sayName == person2.sayName); // 这里是 true
```

`prototype` 是存在这个函数内，不能绑定到 `this` 上。

我们把所有属性和方法都添加到了 `Person` 和 `prototype` 属性上，构造函数变成了空函数。但仍然可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。但与构造函数不同的是，新对象的属性与方法是有所有实例共享的。因而 `person1` 和 `person2` 访问的都是同一属性和同一个 `sayName()` 函数。

1. 理解原型对象

只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 `prototype` 属性，这个属性指向函数的原型对象。默认情况下，所有原型对象都会自动获得一个 `constructor` （构造函数）属性，这个属性包含一个指向 `prototype` 属性所在函数的指针。 `Person.prototype.constructor` 指向 `Person` ，而通过这个构造函数，还可以继续为原型对象添加其它属性和方法。

在创建了自定义的构造函数之后，其原型对象默认会取得 `constructor` 属性，其它方法则都是从 `Object` 继承而来的。当调用构造函数创建一个新实例之后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象，这个指针可以叫做 `[[Prototype]]` ， `[[Prototype]]` 这个属性无法被访问，但在 Firefox 、 Safari 和 Chrome 在每个对象上都支持一个属性 `__proto__` ，但需要注意的是这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。

虽然所有实现中都无法访问 `[[Prototype]]` ，但可以通过 `isPrototypeOf()` 方法来确定对象之间是否存在这个关系，如果 `[[Prototype]]` 指向调用 `isPrototypeOf()` 方法的对象（ `Person.prototype` ），那么这个方法就返回 `true` 。

```js
Person.prototype.isPrototypeOf(person1); // true
Person.prototype.isPrototypeOf(person2); //true
```

`person1` 与 `person2` 都指向了 `Person.prototype` 的指针，因此都返回了 `true` 。

ES5 增加了一个新方法，叫 `Object.getPrototypeOf()` ，在所有支持的实现中，这个方法返回 `[[Prototype]]` 的值。

```js
Object.getPrototypeOf(person1) == Person.prototype; // true
console.log(Object.getPrototypeOf(person1).name); // "Nicholas
```

第一行表示 `Object.getPrototypeOf()` 返回的对象实际上就是这个对象的原型。使用 `Object.getPrototypeOf()` 可以方便地取得一个对象的原型。

在代码读取某个对象的某个属性时，都会执行一次搜索，搜索目标是具有给定名字的属性，搜索首先从对象实例开始，如果在实例中找到了具有给定名字的属性，则返回该属性的值，如果没有找到则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。

虽然可以通过对象实例访问保存在原型中的值，但不能通过对象实例重写原型中的值，如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那么该属性会屏蔽原型中的属性。

```js
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 20;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  console.log(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
console.log(person1.name); // Greg
console.log(person2.name); // Nicholas
```

这个例子中的 `person1` 的 `name` 被一个新值给屏蔽了，因而返回的是实例属性上的值，而 `person2` 的值返回的是对象原型上的值。

使用 `hasOwnProperty()` 方法可以检测一个属性是存在于实例中，还是存在于原型中，这个方法只在给定属性存在于对象实例中时，才会返回 `true` 。

```js
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  console.log(this.name);
};

var person1 = new Person();
var person2 = new Person();

console.log(person1.hasOwnProperty("name")); // false 原型属性返回false

person1.name = "Greg";
console.log(person1.hasOwnProperty("name")); //true 来自实例

console.log(person2.hasOwnProperty("name")); // false 来自原型
```

##### 原型与 in 操作符

单独使用时 `in` 操作符会在通过对象能够访问给定属性时返回 `true` ，无论这个属性存在于实例中还是原型中。

```js
function Person() {}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  console.log(this.name);
};

var person1 = new Person();
var person2 = new Person();

console.log(person1.hasOwnProperty("name")); //false
console.log("name" in person1); // true
```

在使用 `for-in` 循环时，返回的是所有能够通过对象访问的、可枚举（ enumerated )属性，无论这个属性是属于实例中的，还是属于原型对象中的，都可以返回。如果原型是不可枚举的，但是却又被实例所覆盖的，也是可以通过 `for-in` 返回的，但是在早期 IE8 及更早版本中却不能实现。

要取得实例内所有可枚举的属性，可以使用 ES5 中的 `Object.keys()` 方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

```js
function Person() {}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  console.log(this.name);
};

var keys = Object.keys(Person.prototype);
console.log(keys); // "name, age, job, sayName"

var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
console.log(p1keys); // "name, age"
```

如果需要得到所有实例属性，无论它是否可枚举，都可以使用 `Object.getOwnPropertyNames()` 方法。

```js
var keys = Object.getOwnPropertyNames(Person.prototype);
console.log(keys); //"constructor, name, job, sayName"
```

这其中就包含了不可枚举的 `constructor` 。

##### 更简单的原型语法

为了减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象。

```js
function Person() {}

Person.prototype = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function () {
    console.log(this.name);
  },
};
```

需要注意的是，这里的 `constructor` 不再指向 `Person` 对象，而是指向了 `Object` 构造函数，因为每创建一个函数，就同时会创建它的 `prototype` 对象，这个对象也会自动获得 `constructor` ，而这里则完全重写了默认的 `prototype` 对象。 `instanceof` 操作符还能返回正确的结果，但通过 `constructor` 已经不能确定对象的类型了。

```js
var person1 = new Person();
console.log(person1.constructor == Person); // false
```

如果它非常重要，可以使用下面的方式，将 `constructor` 放回适当的位置：

```js
function Person() {}

Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  sayName: function () {
    console.log(this.name);
  },
};
```

但是以这种方式重设 `constructor` 属性会导致它的 `[[Enumerable]]` 特性被设置为 `true` ，而原生的 `constructor` 属性却是不可枚举的，如果需要设置 `constructor` 为可枚举的，可以使用 ES5 语法中的 `Object.defineProperty()`

```js
function Person() {}

Person.prototype = {
  name: "Nicholas",
  age: 27,
  sayName: function () {
    console.log(this.name);
  },
};

Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person,
});
```

##### 原型的动态性

由于在原型中查找值的过程是一次搜索，所以我们对原型对象所做的任何修改都能立即从实例上反映出来，即使是先创建了实例后修改原型也是如此。

```js
var person1 = new Person();

Person.prototype.sayHi = function () {
  console.log("Hi");
};

person1.sayHi();
```

以上例子中，即使 `person` 实例是在添加新方法之前创建的，但它仍然可以访问这个新方法，其原因可以归结为实例与原型之间的松散连接关系。当我们调用 `person.sayHi()` 时，首先会在实例中搜索名为 `sayHi` 的属性，在没找到时，会继续原型。实例与原型之间的连接是一个指针，因而可以在原型中找到新的 `sayHi` 属性并返回保存在那里的函数。

尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来。调用函数时会为实例添加一个指向最初原型的 `[[Prototype]]` 指针，而把原型修改为另一个对象就等于切断了构造函数与最初原型之间的联系。因为实例中的指针仅指向原型，而不指向构造函数。

```js
function Person() {}

var friend = new Person();
Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 25,
  job: "Software Engineer",
  sayName: function () {
    console.log(this.name);
  },
};

friend.sayName(); // error
```

这里先创建了一个 `Person` 的实例 `friend` ，然后又重写了其对象原型。但是这里的 `friend.sayName()` 却会报错，是因为 `friend` 指向的原型中不包含以该名字命名的属性。这里的问题在于虽然 `friend.sayName()` 是需要 `friend` 实例去查找 `friend` 实例的原型是否具有该属性，然而 `Person` 指向的却是重写后的原型，并不包含创建 `friend` 实例时的原型了。

##### 原生对象的原型

原型模式的重要性不仅体现在创建自定义类型方面，就连原生的引用类型，也是采用这种模式创建的。

所有原生引用类型（ Object 、 Array 、 String ，等等）都在其构造函数的原型上定义了方法。例如，在 `Array.prototype` 中可以找到 `sort()` 方法，而在 `String.prototype` 中可以找到 `substring()` 方法。

```js
console.log(typeof Array.prototype.sort); // "function"
console.log(typeof String.prototype.substring); // "function"
```

通过原生对象的原型，不仅可以取得所有默认方法的引用，而且可以定义新方法，像修改自定义对象的原型一样修改原生对象的原型。

```js
String.prototype.startsWith = function(text) {
    return this.indexOf(text) == 0)
}

var msg = "Hello world!"
console.log(msg.startsWith("Hello")) // true
```

这里的 `startsWith` 就是新定义的方法。

##### 原型模式的问题

原型模式使得所有实例在默认情况下都将取得相同的属性值。

另外对于引用类型值的属性采用了原型模式来添加，就会使得一个实例中新修改的值，在另一个实例上也会体现出来。

```js
function Person() {}

Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");

console.log(person1.friends); // "Shelby, Court, Van"
console.log(person2.friends); // "Shelby, Court, Van"
console.log(person1.friends == person2.friends); // true
```

这里的`person1`往`friends`数组属性上使用`push`新添加了一个新值，但是有趣的是`person2`的`friends`属性上也出现的值，这就在于引用类型的值存在于堆区内，我们修改的只是它存于栈区的指针。显然我们并不希望我们新生成的多个实例会共享它们属性的数据。

#### 组合使用构造函数模式和原型模式

创建自定义类型最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。因而每个实例会拥有自己实例属性的副本，但同时又能共享对方法的引用。这种混合模式还支持向构造函数传递参数。

```js
function Person(name, age, job){
    this.name = name
    this.age = age
    this.job = job
    this.friends = ["Shelby", "Court"]
}

Person.prototype = {
    constructor: Person
    sayName: function(){
        console.log(this.name)
    }
}

var person1 = new Person("Nicholas", 20, "Software Engineer")
var person2 = new Person("Greg", 27, "Doctor")

person1.friend.push("Van")
console.log(person1.friends) // "Shelby, Count, Van"
console.log(person2.friends) // "Shelby, Count"
console.log(person1.friends === person2.friends) //false
console.log(person1.sayName === person2.sayName) //true
```

在这里修改了`person1`中的实例属性并不会影响到`person2`的实例属性。

这种构造函数与原型混成的模式，是目前在 ES 中使用最广泛、认同度最高的一种创建自定义类型的方法。

#### 动态原型模式

动态原型模式把所有信息封装到了构造函数中，通过在构造函数中初始化原型保持同时使用构造函数和原型的优点。

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function () {
      console.log(this.name);
    };
  }
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```

这里只在`sayName()`方法不存在的情况下，才会将它添加到原型中。这段代码只会在初次调用构造函数时才会执行。在此之后，原型已经完成初始化，不需要再做任何修改。这里对原型上的修改会立即在实例中得到反映。

`if`语句检查的可以是初始化后存在的任何方法或属性，不必依次对每个属性和方法都使用`if`检查一遍，只要检查其中一个即可。对于这种模式创建的对象，还可以使用`instanceof`操作符确定它的类型。

#### 寄生构造函数模式

在前几种模式都不适用时，可以使用寄生（ parasitic ）构造函数模式。这种模式基本思想是创建一个函数，该函数作用仅仅封装创建对象的代码，然后返回新创建的对象，这个函数很像是典型的构造函数。

```js
function Person(name, age, job) {
  var o = name;
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```

除了使用`new`操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而在构造函数的末尾添加一个`return`语句，可以重写调用构造函数返回的值。

这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们需要一个具有额外方法的特殊数组，由于不能直接修改`Array`构造函数，因此可以使用这个模式。

```js
function SpecialArray() {
  //创建数组
  var values = new Array();

  //添加值
  values.push.apply(values, arguments);

  //添加方法
  values.toPipedString = function () {
    return this.join("|");
  };

  return values;
}

var colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPipedString()); // "red|blue|green"
```

在这个例子中，创建了一个名叫`SpecialArray`的构造函数。首先创建了一个数组，然后`push()`方法初始化了数组的值。随后又给数组实例添加了一个`toPipedString()`方法，最后将数组以函数值返回。

这种模式的问题在于返回的对象与构造函数或者与构造函数的原型属性之间没有关系，构造函数返回的对象与在构造函数外部创建的对象没有什么不同，因此不能通过`instanceof`来确定对象类型。

#### 稳妥构造函数模式

道格拉斯·克罗克福德发明了稳妥对象模式，这个模式没有公共属性，并且其方法也不引用`this`对象。稳妥对象适合用于一些安全环境中（这些环境会禁用`this`和`new`），或者在防止数据被其它应用程序改动时使用。

```js
function Person(name, age, job) {
  var o = new Object();

  //可以在这里定义私有变量和函数

  //添加方法
  o.sayName = function () {
    console.log(name);
  };

  return o;
}
```

在这个例子中，除了使用`sayName()方法外，没有其它方法能够访问`name`的值。

在稳妥模式下，即使有其它代码给这个对象添加方法或数据成员，但也不可能会有其它方法访问到传入构造函数中的原始数据。

### 继承

#### 组合继承

组合继承将原型链和借用构造函数的技术组合到一起，它的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, job) {
  // 继承属性
  SuperType.call(this, name);

  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red, blue, green, black"
instance1.sayName(); // "Nicholas"
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red, blue, green"
instance2.sayName(); //"Greg"
instance2.sayAge(); // 27
```

在这里，`SuperType`构造函数定义了两个属性：`name`和`colors`。`SuperType`的原型定义了一个方法`sayName()`。`SubType`构造函数在调用`SuperType`构造函数时传入了`name`参数，然后又定义了它自己的属性`age`。将`SuperType`的实例赋值给了`SubType`的原型，然后又在该新原型上定义了方法`sayAge()`。

`instanceof`和`isPrototypeOf()`能够用于识别基于组合继承创建的对象。
