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

##### 基本用法

符号需要使用`Symbol()`函数初始化，因为符号本身是原始类型，所以`typeof`操作符对符号返回`symbol`。

可以为`Symbol()`传递一个参数作为对符号的描述，描述可以是相同的，但是这个描述与符号定义或标识完全无关。

```js
let a = Symbol("foo");
let b = Symbol("foo");
console.log(a == b); // false
```

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
let my = Object(mySymbol)
```

// Todo 例子准备差不多了，先看书后补笔记