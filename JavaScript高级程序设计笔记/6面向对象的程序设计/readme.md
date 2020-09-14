# JavaScript 高级程序设计笔记

## 面向对象的程序设计

面向对象（ OBject-Oriented，OO）的语言有一个标志，它们都有类的概念，通过类可以创建任意多个具有相同属性和方法的对象。 ECMAScript 中没有类的概念，它的对象也就与其它面向对象语言有所不同。

ECMA-262 把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”可以把 ECMAScript 的对象想象成散列表。

### 理解对象

创建自定义对象的最简单方式就是创建一个 `Object` 的实例，然后再为他添加属性和方法。

``` js
var person = new Object()
person.name = "Nicholas"
person.age = 29
person.job = "Software Engineer"

person.sayName = functon() {
    alert(this.name)
}
```

这里的 `alert(this.name)` 会被解析成 `person.name` 的值。 `person` 对象含有 `name` 、 `age` 、 `job` 三个属性以及 `sayName()` 一个方法。可以改写成：

``` js
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

* `[[Configurable]]` ：表示能否通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。这个属性值默认为 `true` 。
* `[[Enumerable]]` ：表示能够通过 `for-in` 循环返回属性。这个属性值默认为 `true` 。
* `[[Writable]]` ：表示能否修改属性的值。默认为 `true` 。
* `[[Value]]` ：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。默认值为 `undefined` 。

``` js
var person = {
    name: "Nicholas",
};
```

这里创建了一个名为 `true` 的属性， `[[Value]]` 特性将被设置 `"Nicholas"` ，而这个值的任何修改将反映在这个位置。

要修改属性默认的特性，必须使用 ES5 的 `Object.defineProperty()` 方法，这个方法接收三个参数：属性所在的对象、属性的名字和一个描述对象。描述符（ descriptor ）对象的属性必须是： `configurable` 、 `enumerable` 、 `writable` 和 `value` 。设置其中的一个或多个值可以修改对应的特性值。

``` js
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

2. 访问器属性，访问器属性不包含属性值，它们包含一对儿 `getter` 和 `setter` 函数（这两个属性非必须）。在读取访问器属性时，会调用 `getter` 函数，这个函数负责返回有效的值，在写入访问器属性时，会调用 `setter` 函数并传入新值，这个函数负责决定如何处理数据。

访问器属性有如下 4 个特性：

1. `[[Configurable]]` ：表示能否通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。这个属性默认值为 `true` 。
2. `[[Enumerable]]` ：表示能否通过 `for-in` 循环返回属性。这个属性的默认值为 `true` 。
3. `[[Get]]` ：在读取属性时调用的函数。默认为 `undefined` 。
4. `[[Set]]` ：在写入属性时调用的函数。默认为 `undefined` 。

访问器属性不能直接定义，必须使用 `Object.defineProperty()` 来定义。

``` js
var book = {
    _year: 2004,
    edition: 1,
};

Object.defineProperty(book, "year", {
    get: function() {
        return this._year;
    },
    set: function() {
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

``` js
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004,
    },
    edition: {
        value: 1,
    },
    year: {
        get: function() {
            return this._year;
        },
        set: function() {
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

``` js
var book = {}
Object.defineProperties(book, {

    _year: {
        value: 2004
    },

    edition: {
        value: 1
    },

    year: {
        get: function() {
            return this._year
        },

        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue
                this.edition += newValue - 2004
            }
        }
    }
})

var descriptor = Object.getOwnPropertyDescriptor(book, "_year")
console.log(descriptor.value) // 2004
console.log(descriptor.configurable) // false

var descriptor = Object.getOwnpropertyDescriptor(book, "year")
console.log(descriptor.value) //undefined
console.log(descriptor.enumerable) //false
console.log(typeof descriptor.get) //function
```

在 JS 中，可以针对任何对象——包括 DOM 和 BOM 对象使用 `Object.getOwnPerportyDescriptor()` 方法。

### 创建对象

虽然 `Object` 构造函数或对象字面量都可以用来创建单个对象，但这些方式都有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。

#### 工厂模式

这种模式抽象了创建具体对象的过程，开发人员用函数来封装以特定接口创建对象的细节。

``` js
function createPerson(name, age, job) {
    var o = new Object()
    o.name = name
    o.age = age
    o.job = job
    o.sayName = function() {
        console.log(this.name)
    }
    return o
}

var person1 = createPerson("Nicholas", 29, "Software Engineer")
var person2 = createPerson("Greg", 27, "Doctor")

console.log(person1)
console.log(person2)
```

这个模式解决了创建多个相似对象的问题，但却没有解决如何识别一个对象类型的问题。

#### 构造函数模式

```js
function Person(name, age, job){

    this.name = name
    this.age = age
    this.job = job
    this.sayName = function(){
        console.log(this.name)
    }

}

var person1 = new Person("Nicholas", 29, "Software Engineer")
var person2 = new Person("Greg", 27, "Doctor")
```

`Person()`函数与`createPerson()`函数的不同之处：

* 没有显示地创建对象；
* 直接将属性和方法赋给了`this`
* 没有`return`语句。

按照惯例构造函数开头始终都应该是一个大写字母开头，而非构造函数都应该以一个小写字母开头，主要是区分构造函数与其它函数。

`person1`与`person2`分别保存着`Person`的一个不同实例，这两个对象都有一个`constructor`属性，该属性指向`Person`。

```js
person1.constructor == Person // true
person2.coustructor == Person //true
```

依然可以使用`instanceof`操作符来验证对象的类型。

```js
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
```

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型。如果是之前的工厂模式`person1 instanceof createPerson`显然为`false`。

1.将构造函数当作函数

构造函数与其它函数的区别在于调用它们的方式不同，任何函数，只要使用`new`操作符来调用，那么它就可以作为构造函数，否则它就只是一个普通的函数。

前面定义的`Person()`函数可以通过下列任何方式来调用。

```js
//当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer")
person.sayName() // "Nicholas"

//当作普通函数来使用
Person("Greg", 27, "Doctor")
window.sayName() // "Greg"

var o = new Object();
Person.call(o, "kriSten", 25, "Nurse")
o.sayName() // "kriSten"
```

如果不使用`new`操作符调用`Person()`时，属性和方法都被添加给了`window`对象。也可以使用`call()`在某个对象的作用域中调用`Person()`函数，例如`o`对象作用域中调用了`Person()`函数，所以`o`就拥有了所有属性和`sayName()`方法。

