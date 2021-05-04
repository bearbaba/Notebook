# JS apply、call 与 bind

## apply

**`apply()`** 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。例：

```js
let arr1 = [1,2,3];
let arr2 = [4,5,6];
Array.prototype.push.apply(arr1,arr2);
console.log(arr1);
```

输出值为：[1,2,3,4,5,6] 。

再例：

```js
function Per(name, age){
  this.name=name;
  this.age = age;
}

function Stu(name, age, sex){
  Per.apply(this, arguments);
  this.sex=sex;
}

let stu = new Stu("aaa", 23, "男");
console.log(stu);
```

在`Stu`内部使用`Per.apply`,相当于调用`Per`函数，并且将`Stu`的`this`与形参传入了`Per`内部。

## call

`call`与`apply`的区别在于`apply`的第二参数为数组或类数组，对于`call`则需要把数组拆分为若干元素传入。

```js
let arr1=[1,2,3];
let arr2=[4,5,6];
Array.prototype.push.call(arr1, arr2[0],arr2[1]);
console.log(arr1);
```

## bind

`bind`与`apply`类似，也需要两个参数，不过`bind`创建了一个新的函数，新函数在执行时`this`指向第一个参数，其余参数则作为这个新函数的参数，`bind`所创建的新函数依据与被`bind`绑定的函数。

```js
function sub(a,b){
  return a-b;
}

console.log(sub.bind(null, 2, 3)());
```



