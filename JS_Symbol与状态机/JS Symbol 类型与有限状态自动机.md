# JS Symbol 类型与有限状态自动机

## Symbol 类型

ES6 新增了一种数据类型`Symbol`，它的用途是确保对象属性使用唯一标识符，不会发生属性的冲突的危险。

### Symbol 基本用法

```js
const sym = Symbol();
console.log(typeof(sym)); //symbol
```

由于`Symbol`本身就是原始类型，所以`typeof`的结果为`symbol`，使用`Symbol()`函数初始化可以传入一个字符串参数作为对符号的描述，这个字符串参数与符号定义或标识完全无关。例：

```js
const fooSymbol = Symbol('foo');
const otherFooSymbol = Symbol('foo');
console.log(fooSymbol===otherFooSymbool); // false
```

如上所示，即使使用`Symbol()`函数时传入相同字符串参数时，`fooSymbol`与`otherFooSymbol`也被认为是不相等的，也就是说每次使用`Symbol()`初始化变量时都会创建一个新的变量，而这个变量与传入的字符串参数是无关的。

`Symbol()`的这个特性恰好可以用来做不同状态的区分。

## Symbol() 的实际使用

我们使用一个例子来说明`Symbol()`的使用。软件有不同用户，针对不同的用户，我们要给予不同对待方式，一般来说软件可能会有三类用户：游客、普通用户与 VIP 用户，为了区分这三类用户，我们可以使用一个变量进行标识。

```js
const userId = {
  normalUser: 0,
  touristUser: 1,
  vipUser:2,
}

function forUser(type){
  if(type===userId.normalUser){
    // 针对普通用户的操作
  }else if(type==userId.touristUser){
    // 针对游客的操作
  }else if(type==userId.vipUser){
    // 针对 VIP 用户的操作
  }
}
```

如上所示，我们使用`userId`中的不同属性来区分不同用户的身份，但是对于属性的值实际上我们并不关心，所以我们只需要一个独一无二的值用于区分就足够了，这时`Symbol()`就能发挥作用了。

```js
const userId = {
  normalUser: Symbol(),
  touristUser: Symbol(),
  vipUser:Symbol(),
}

function forUser(type){
  if(type===userId.normalUser){
    // 针对普通用户的操作
  }else if(type==userId.touristUser){
    // 针对游客的操作
  }else if(type==userId.vipUser){
    // 针对 VIP 用户的操作
  }
}
```

有了这个`Symbol()`函数我们就不必担心使用的一种状态值会与另一种状态值发生冲突的情况。

## 有限状态自动机

有限状态自动机（FSA），简称状态机，是表示有限状态以及在这些状态之间的转移和动作等行为的数学计算模型。

![简单的状态机模型](https://gitee.com/peng_zhi_hung/img-res/raw/master/20170105225404.png)

上图所示模型简单来说就是存在 1 与 2 两种状态，1 状态输入 a 后变成状态 2 ，2状态输入 a 变成状态 1。

仍然拿软件的三类用户举例，游客用户在注册、登录后变成普通用户，普通用户充值后变成 VIP 用户，这不正是状态的变换吗？因而这也是一种状态机。

我们区分上图所示的不同状态使用了数字 1、2 ，实际上我们也可以使用`Symbol()`加以区分，这样我们就不必担心多个状态重复使用一个值表示的冲突情况。

在相关状态机的程序中我们就可以使用`Symbol()`来辨别各个状态，这样就可以舍弃使用意义并不明确的值了。

## 例题 leetcode376

>leetcode 
>
>#### [376. 摆动序列](https://leetcode-cn.com/problems/wiggle-subsequence/)
>
>如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为**摆动序列。**第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
>
>例如， `[1,7,4,9,2,5]` 是一个摆动序列，因为差值 `(6,-3,5,-7,3)` 是正负交替出现的。相反，`[1,4,7,2,5]` 和 `[1,7,4,5,5]` 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
>
>给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。
>
>**示例 1:**
>
>```reStructuredText
>输入: [1,7,4,9,2,5]
>输出: 6 
>解释: 整个序列均为摆动序列。
>```

使用下图进行说明：

![随手画的](https://gitee.com/peng_zhi_hung/img-res/raw/master/%E9%9A%8F%E6%89%8B%E7%94%BB%E7%9A%84.png)

例如：对于序列 [1,3,2,5,6,7,4] 它的最长摇摆序列可以是 [1,3,2,7,4]，可以看到摇摆序列的特点是不能存在连续上升或者连续下降的值（或者相等的值），那么实际上我们可以使用`Symbol("up")`表示上升的状态，`Symbol("down")`表示下降的状态，`Symbol("begin")`,表示该开始的状态或者相等的状态（对于 [1] 这种序列摇摆序列也为[1])。

状态变化的条件即为：当前数比前一个数大或者小，并且前一个状态与当前状态不等（例如，状态已经是`up`了，结果当前的数字还比前一个数字要大时，这时已经连续上升了，状态不能变换）或者不为`begin`状态时状态发生变化，变化发生就可以记录摇摆序列长度了(摇摆序列长度=状态变化次数+1）。

整个状态变换过程就可以以下图表示：

![随手画的-1](https://gitee.com/peng_zhi_hung/img-res/raw/master/%E9%9A%8F%E6%89%8B%E7%94%BB%E7%9A%84-1.png)

那么使用 JS 中的`Symbol`的题解就可以写成：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
    if(nums.length===0){
          return 0;
      }
      let state;
      const begin = Symbol("begin");
      const down = Symbol("down");
      const up = Symbol("up");
      state = begin;
      let sum = 1;
      for (let i = 1; i < nums.length; i++)
      {
        if(nums[i]==nums[i-1]){
          continue;
        }
        else if (nums[i] > nums[i - 1] && state != up)
        {
          state = up;
          sum++;
        }
        else if (nums[i] < nums[i - 1] && state != down)
        {
          state = down;
          sum++;
        }
      }
    return sum;
}
```