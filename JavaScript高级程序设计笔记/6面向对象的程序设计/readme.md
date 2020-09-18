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

##### 访问器属性

访问器属性不包含属性值，它们包含一对儿 `getter` 和 `setter` 函数（这两个属性非必须）。在读取访问器属性时，会调用 `getter` 函数，这个函数负责返回有效的值，在写入访问器属性时，会调用 `setter` 函数并传入新值，这个函数负责决定如何处理数据。

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

``` js
function Person(name, age, job) {

    this.name = name
    this.age = age
    this.job = job
    this.sayName = function() {
        console.log(this.name)
    }

}

var person1 = new Person("Nicholas", 29, "Software Engineer")
var person2 = new Person("Greg", 27, "Doctor")
```

`Person()` 函数与 `createPerson()` 函数的不同之处：

* 没有显示地创建对象；
* 直接将属性和方法赋给了 `this`
* 没有 `return` 语句。

按照惯例构造函数开头始终都应该是一个大写字母开头，而非构造函数都应该以一个小写字母开头，主要是区分构造函数与其它函数。

`person1` 与 `person2` 分别保存着 `Person` 的一个不同实例，这两个对象都有一个 `constructor` 属性，该属性指向 `Person` 。

``` js
person1.constructor == Person // true
person2.coustructor == Person //true
```

依然可以使用 `instanceof` 操作符来验证对象的类型。

``` js
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
```

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型。如果是之前的工厂模式 `person1 instanceof createPerson` 显然为 `false` 。

1. 将构造函数当作函数

构造函数与其它函数的区别在于调用它们的方式不同，任何函数，只要使用 `new` 操作符来调用，那么它就可以作为构造函数，否则它就只是一个普通的函数。

前面定义的 `Person()` 函数可以通过下列任何方式来调用。

``` js
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

如果不使用 `new` 操作符调用 `Person()` 时，属性和方法都被添加给了 `window` 对象。也可以使用 `call()` 在某个对象的作用域中调用 `Person()` 函数，例如 `o` 对象作用域中调用了 `Person()` 函数，所以 `o` 就拥有了所有属性和 `sayName()` 方法。

##### 构造函数的问题

构造函数模式的问题在于每个方法都要在每个实例上重新创建一遍，也即是说每个实例上生成的函数实际上是不相等的，即使它们的执行过程并无二致。

``` js
person1.sayName == person2.sayName // false
```

我们完全可以在构造函数外部来定义函数，再将它赋值给指向不同对象的 `this` 。

``` js
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = sayName
}

function sayName() {
    console.log(this.name)
}

var person1 = new Person("Nicholas", 29, "Software Engineer")
var person2 = new Person("Greg", 27, "Doctor")

person1.sayName()
console.log(person1.sayName == person2.sayName)
```

这个时候不同对象的 `sayName` 实际上是相同的了，因为它们实际上是同一个全局作用域内的 `sayName()` 方法。

但是这样依然是有问题的，这个全局作用域内的函数实际上只能被对象使用，并不能指望它独自运行。而且如果对象需要定义很多方法，那么就需要定义很多全局函数，这个时候它的封装性也就荡然无存了。

#### 原型模式

我们创建的每个函数都有一个 `prototype` （原型）属性，这个属性是一个指针，指向一个对象，而这个对象的作用是包含可以由特定类型的所有实例共享的属性和方法。实际上 `prototype` 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象可以让所有对象实例共享它所包含的属性和方法。

``` js
function Person() {}
Person.prototype._name = "Nicholas"
Person.prototype.age = 27
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
    console.log(this._name)
}
var person1 = new Person()
var person2 = new Person()
person1.sayName()
console.log(person1.sayName == person2.sayName) // 这里是 true
```

`prototype` 是存在这个函数内，不能绑定到 `this` 上。

我们把所有属性和方法都添加到了 `Person` 和 `prototype` 属性上，构造函数变成了空函数。但仍然可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。但与构造函数不同的是，新对象的属性与方法是有所有实例共享的。因而 `person1` 和 `person2` 访问的都是同一属性和同一个 `sayName()` 函数。

1. 理解原型对象

只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 `prototype` 属性，这个属性指向函数的原型对象。默认情况下，所有原型对象都会自动获得一个 `constructor` （构造函数）属性，这个属性包含一个指向 `prototype` 属性所在函数的指针。 `Person.prototype.constructor` 指向 `Person` ，而通过这个构造函数，还可以继续为原型对象添加其它属性和方法。

在创建了自定义的构造函数之后，其原型对象默认会取得 `constructor` 属性，其它方法则都是从 `Object` 继承而来的。当调用构造函数创建一个新实例之后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象，这个指针可以叫做 `[[Prototype]]` ， `[[Prototype]]` 这个属性无法被访问，但在 Firefox 、 Safari 和 Chrome 在每个对象上都支持一个属性 `__proto__` ，但需要注意的是这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。

虽然所有实现中都无法访问 `[[Prototype]]` ，但可以通过 `isPrototypeOf()` 方法来确定对象之间是否存在这个关系，如果 `[[Prototype]]` 指向调用 `isPrototypeOf()` 方法的对象（ `Person.prototype` ），那么这个方法就返回 `true` 。

``` js
Person.prototype.isPrototypeOf(person1) // true
Person.prototype.isPrototypeOf(person2) //true
```

`person1` 与 `person2` 都指向了 `Person.prototype` 的指针，因此都返回了 `true` 。

ES5 增加了一个新方法，叫 `Object.getPrototypeOf()` ，在所有支持的实现中，这个方法返回 `[[Prototype]]` 的值。

``` js
Object.getPrototypeOf(person1) == Person.prototype // true
console.log(Object.getPrototypeOf(person1).name) // "Nicholas
```

第一行表示 `Object.getPrototypeOf()` 返回的对象实际上就是这个对象的原型。使用 `Object.getPrototypeOf()` 可以方便地取得一个对象的原型。

在代码读取某个对象的某个属性时，都会执行一次搜索，搜索目标是具有给定名字的属性，搜索首先从对象实例开始，如果在实例中找到了具有给定名字的属性，则返回该属性的值，如果没有找到则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。

虽然可以通过对象实例访问保存在原型中的值，但不能通过对象实例重写原型中的值，如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那么该属性会屏蔽原型中的属性。

``` js
function Person() {}
Person.prototype.name = "Nicholas"
Person.prototype.age = 20
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
    console.log(this.name)
}
var person1 = new Person()
var person2 = new Person()
person1.name = "Greg"
console.log(person1.name) // Greg
console.log(person2.name) // Nicholas
```

这个例子中的 `person1` 的 `name` 被一个新值给屏蔽了，因而返回的是实例属性上的值，而 `person2` 的值返回的是对象原型上的值。

使用 `hasOwnProperty()` 方法可以检测一个属性是存在于实例中，还是存在于原型中，这个方法只在给定属性存在于对象实例中时，才会返回 `true` 。

``` js
function Person() {}
Person.prototype.name = "Nicholas"
Person.prototype.age = 29
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
    console.log(this.name)
}

var person1 = new Person()
var person2 = new Person()

console.log(person1.hasOwnProperty("name")) // false 原型属性返回false

person1.name = "Greg"
console.log(person1.hasOwnProperty("name")) //true 来自实例

console.log(person2.hasOwnProperty("name")) // false 来自原型
```

##### 原型与 in 操作符

单独使用时 `in` 操作符会在通过对象能够访问给定属性时返回 `true` ，无论这个属性存在于实例中还是原型中。

``` js
function Person() {}

Person.prototype.name = "Nicholas"
Person.prototype.age = 29
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
    console.log(this.name)
}

var person1 = new Person()
var person2 = new Person()

console.log(person1.hasOwnProperty("name")) //false
console.log("name" in person1) // true
```

在使用 `for-in` 循环时，返回的是所有能够通过对象访问的、可枚举（ enumerated )属性，无论这个属性是属于实例中的，还是属于原型对象中的，都可以返回。如果原型是不可枚举的，但是却又被实例所覆盖的，也是可以通过 `for-in` 返回的，但是在早期 IE8 及更早版本中却不能实现。

要取得实例内所有可枚举的属性，可以使用 ES5 中的 `Object.keys()` 方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

``` js
function Person() {}

Person.prototype.name = "Nicholas"
Person.prototype.age = 29
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
    console.log(this.name)
}

var keys = Object.keys(Person.prototype)
console.log(keys) // "name, age, job, sayName"

var p1 = new Person()
p1.name = "Rob"
p1.age = 31
var p1keys = Object.keys(p1)
console.log(p1keys) // "name, age"
```

如果需要得到所有实例属性，无论它是否可枚举，都可以使用 `Object.getOwnPropertyNames()` 方法。

``` js
var keys = Object.getOwnPropertyNames(Person.prototype)
console.log(keys) //"constructor, name, job, sayName"
```

这其中就包含了不可枚举的 `constructor` 。

##### 更简单的原型语法

为了减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象。

``` js
function Person() {}

Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function() {
        console.log(this.name)
    }
}
```

需要注意的是，这里的 `constructor` 不再指向 `Person` 对象，而是指向了 `Object` 构造函数，因为每创建一个函数，就同时会创建它的 `prototype` 对象，这个对象也会自动获得 `constructor` ，而这里则完全重写了默认的 `prototype` 对象。 `instanceof` 操作符还能返回正确的结果，但通过 `constructor` 已经不能确定对象的类型了。

``` js
var person1 = new Person();
console.log(person1.constructor == Person) // false
```

如果它非常重要，可以使用下面的方式，将 `constructor` 放回适当的位置：

``` js
function Person() {}

Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    sayName: function() {
        console.log(this.name)
    }
}
```

但是以这种方式重设 `constructor` 属性会导致它的 `[[Enumerable]]` 特性被设置为 `true` ，而原生的 `constructor` 属性却是不可枚举的，如果需要设置 `constructor` 为可枚举的，可以使用 ES5 语法中的 `Object.defineProperty()`

``` js
function Person() {}

Person.prototype = {
    name: "Nicholas",
    age: 27,
    sayName: function() {
        console.log(this.name)
    }
}

Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
})
```

##### 原型的动态性

由于在原型中查找值的过程是一次搜索，所以我们对原型对象所做的任何修改都能立即从实例上反映出来，即使是先创建了实例后修改原型也是如此。

``` js
var person1 = new Person()

Person.prototype.sayHi = function() {
    console.log("Hi")
}

person1.sayHi()
```

以上例子中，即使 `person` 实例是在添加新方法之前创建的，但它仍然可以访问这个新方法，其原因可以归结为实例与原型之间的松散连接关系。当我们调用 `person.sayHi()` 时，首先会在实例中搜索名为 `sayHi` 的属性，在没找到时，会继续原型。实例与原型之间的连接是一个指针，因而可以在原型中找到新的 `sayHi` 属性并返回保存在那里的函数。

尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来。调用函数时会为实例添加一个指向最初原型的 `[[Prototype]]` 指针，而把原型修改为另一个对象就等于切断了构造函数与最初原型之间的联系。因为实例中的指针仅指向原型，而不指向构造函数。

``` js
function Person() {}

var friend = new Person()
Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 25,
    job: "Software Engineer",
    sayName: function() {
        console.log(this.name)
    }
}

friend.sayName() // error
```

这里先创建了一个 `Person` 的实例 `friend` ，然后又重写了其对象原型。但是这里的 `friend.sayName()` 却会报错，是因为 `friend` 指向的原型中不包含以该名字命名的属性。这里的问题在于虽然 `friend.sayName()` 是需要 `friend` 实例去查找 `friend` 实例的原型是否具有该属性，然而 `Person` 指向的却是重写后的原型，并不包含创建 `friend` 实例时的原型了。

##### 原生对象的原型

原型模式的重要性不仅体现在创建自定义类型方面，就连原生的引用类型，也是采用这种模式创建的。

所有原生引用类型（ Object 、 Array 、 String ，等等）都在其构造函数的原型上定义了方法。例如，在 `Array.prototype` 中可以找到 `sort()` 方法，而在 `String.prototype` 中可以找到 `substring()` 方法。

``` js
console.log(typeof Array.prototype.sort) // "function"
console.log(typeof String.prototype.substring) // "function"
```

通过原生对象的原型，不仅可以取得所有默认方法的引用，而且可以定义新方法，像修改自定义对象的原型一样修改原生对象的原型。

``` js
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

``` js
function Person(){

}

Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    friends: ["Shelby", "Court"]
}

var person1 = new Person()
var person2 = new Person()

person1.friends.push("Van")

console.log(person1.friends) // "Shelby, Court, Van"
console.log(person2.friends) // "Shelby, Court, Van"
console.log(person1.friends == person2.friends) // true
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
function Person(name, age, job){
    this.name = name
    this.age = age
    this.job = job

    if(typeof this.sayName != "function"){

        Person.prototype.sayName = function(){
            console.log(this.name)
        }
    }
}

var friend = new Person("Nicholas", 29, "Software Engineer")
friend.sayName()
```

这里只在`sayName()`方法不存在的情况下，才会将它添加到原型中。这段代码只会在初次调用构造函数时才会执行。在此之后，原型已经完成初始化，不需要再做任何修改。这里对原型上的修改会立即在实例中得到反映。

`if`语句检查的可以是初始化后存在的任何方法或属性，不必依次对每个属性和方法都使用`if`检查一遍，只要检查其中一个即可。对于这种模式创建的对象，还可以使用`instanceof`操作符确定它的类型。

#### 寄生构造函数模式

在前几种模式都不适用时，可以使用寄生（ parasitic ）构造函数模式。这种模式基本思想是创建一个函数，该函数作用仅仅封装创建对象的代码，然后返回新创建的对象，这个函数很像是典型的构造函数。

```js
function Person(name, age, job){
    var o = name
    o.name = name
    o.age = age
    o.job = job
    o.sayName = function(){
        console.log(this.name)
    }
    return o
}

var friend = new Person("Nicholas", 29, "Software Engineer")
friend.sayName()
```

除了使用`new`操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而在构造函数的末尾添加一个`return`语句，可以重写调用构造函数返回的值。

这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们需要一个具有额外方法的特殊数组，由于不能直接修改`Array`构造函数，因此可以使用这个模式。

```js
function SpecialArray(){

    //创建数组
    var values = new Array()

    //添加值
    values.push.apply(values, arguments)

    //添加方法
    values.toPipedString = function(){
        return this.join("|")
    }

    return values
}

var colors = new SpecialArray("red", "blue", "green")
console.log(colors.toPipedString()) // "red|blue|green"
```

在这个例子中，创建了一个名叫`SpecialArray`的构造函数。首先创建了一个数组，然后`push()`方法初始化了数组的值。随后又给数组实例添加了一个`toPipedString()`方法，最后将数组以函数值返回。

这种模式的问题在于返回的对象与构造函数或者与构造函数的原型属性之间没有关系，构造函数返回的对象与在构造函数外部创建的对象没有什么不同，因此不能通过`instanceof`来确定对象类型。

#### 稳妥构造函数模式

道格拉斯·克罗克福德发明了稳妥对象模式，这个模式没有公共属性，并且其方法也不引用`this`对象。稳妥对象适合用于一些安全环境中（这些环境会禁用`this`和`new`），或者在防止数据被其它应用程序改动时使用。

```js
function Person(name, age, job){

    var o = new Object()

    //可以在这里定义私有变量和函数

    //添加方法
    o.sayName = function(){
        console.log(name)
    }

    return o
}
```

在这个例子中，除了使用`sayName()方法外，没有其它方法能够访问`name`的值。

在稳妥模式下，即使有其它代码给这个对象添加方法或数据成员，但也不可能会有其它方法访问到传入构造函数中的原始数据。

### 继承

#### 组合继承

组合继承将原型链和借用构造函数的技术组合到一起，它的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

```js
function SuperType(name){
    this.name = name
    this.colors = ["red", "blue", "green"]
}

SuperType.prototype.sayName = function(){
    console.log(this.name)
}

function SubType(name, job){

    // 继承属性
    SuperType.call(this, name)

    this.age = age
}

// 继承方法
SubType.prototype = new SuperType()

SubType.prototype.sayAge = function(){
    console.log(this.age)
}

var instance1 = new SubType("Nicholas", 29)
instance1.colors.push("black")
console.log(instance1.colors) // "red, blue, green, black"
instance1.sayName() // "Nicholas"
instance1.sayAge() //29

var instance2 = new SubType("Greg", 27)
console.log(instance2.colors) //"red, blue, green"
instance2.sayName() //"Greg"
instance2.sayAge() // 27
```

在这里，`SuperType`构造函数定义了两个属性：`name`和`colors`。`SuperType`的原型定义了一个方法`sayName()`。`SubType`构造函数在调用`SuperType`构造函数时传入了`name`参数，然后又定义了它自己的属性`age`。将`SuperType`的实例赋值给了`SubType`的原型，然后又在该新原型上定义了方法`sayAge()`。

`instanceof`和`isPrototypeOf()`能够用于识别基于组合继承创建的对象。
