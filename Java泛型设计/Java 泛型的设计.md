# Java 泛型的设计

## 泛型初认识

原本我以为泛型就是类似于弱语言中变量声明般能够根据变量的值自动推断变量的类型，然后当我进行如下一个简单的需求实现时，发现事情并不简单：

> 实现一个泛型类，泛型中有一个求两数之“和”的方法，能够自动依据传入两个变量的类型（姑且认为这两个变量的类型是一样的），从而返回与这两个变量相同的两数之和。大概意思就是如果传入的是两个`double`类型的值，这个方法也能返回`double`类型的值，如果传入的是两个字符串，那么所谓的“和”应该是两个字符串拼接后的结果。

我原本通过如下代码进行实现：

```java
public class Main<T>{
    private T a;
    private T b;

    public Main(T a, T b){
        this.a = a;
        this.b = b;
    }

    public T sum(){
        return this.a+this.b
    }

    public static void main(String[] args) {
        double a=2;
        double b=3;


        Main<Double> c = new Main<Double>(a, b);
        System.out.println(c.sum());
    }
}
```

结果非常不出人意料地出错了。

然而，我在 C++ 中使用模板（泛型）却能实现：

```c++
#include<iostream>
#include<string>

using namespace std;

template <typename T>
T sum(T a, T b){
  return a + b;
}

int main(){
  cout << sum(2, 3) << endl;
  string a = "2";
  string b = "3";
  cout << sum(a, b) << endl;
  return 0;
}
```

这再次验证了不同语言的差异还是很大的（实际上 C++ 属于静态弱语言，这里不进行讨论，见下图）。

![d9f265d2c83139d3e1d55c96072d1b6](https://gitee.com/peng_zhi_hung/img-res/raw/master/d9f265d2c83139d3e1d55c96072d1b6.jpg)

如上 Java 的实现方法之所以是错误的，是因为泛型`T`它的类型并不确定，我们在`main()`函数中可以肆意地使用各种引用类型，然后调用`sum()`函数，可是在执行`main()`函数之前的编译环节，泛型`T`却依旧无法确定，也许它是可以相加的`Double`，但它也有可能会是`Object`，但是不管怎么样，Java 都会把它当作`Object`,这里就涉及了 Java 的类型擦除机制。

## 类型擦除

Java 的泛型是伪泛型， Java 在编译期间会将泛型的信息进行擦除，也就是会将类型尽可能向父类转换，例如：

```java
import java.util.ArrayList;

public class Node<T> {
    private ArrayList<T> list=new ArrayList<T>();
    Node(T node){
        this.list.add(node);
    }


    public static void main(String[] args) {
        Node<String> a= new Node<String>("ss");
    }
}
```

上述这段代码在编译时会被转成：

```java
import java.util.ArrayList;

public class Node {
    private ArrayList<Object> list=new ArrayList<Object>();
    Node(Object node){
        this.list.add(node);
    }


    public static void main(String[] args) {
        Node<String> a= new Node<String>("ss");
    }
}
```

## 泛型向上转型的问题

我们可能经常见到类似如下的代码：

```java
import java.util.HashMap;
import java.util.Map;

public class Demo{
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<Integer, String>();
    }
}
```

这里存在一个向上转型的过程，`HashMap`对象向上转型为了`Map`对象，但是泛型（注意是类型）不能进行向上转型，例：

```java
public class Node<T>{
    private T n;
    public void setNum(T n){
        this.n=n;
    }

    public static void main(String[] args) {
        Node<Number> node = new Node<Integer>();
    }
}
```

这里`Node`中的我们实现的`node`对象是`Node<Number>`，但是初始化使用的是`Node<Integer>`，尽管`Number`是`Integer`的父类，但依然是不被允许的，如果我们想要实现类似的向上转型效果，就需要使用泛型的通配符。例：

```java
public class Node<T>{
    private T n;
    public void setNum(T n){
        this.n=n;
    }

    public static void main(String[] args) {
        Node<? extends Number> node = new Node<Integer>();
    }
}
```

`<? extends Number>`表示这个泛型可以是`Number`类型及其所有子类，`<? extends Number>`表示的是上边界通配符，对应的还有下边界通配符`<? super Number>`。

对于一个容器，如果我们想要存放一个可以指向子类的父类对象时就很有用了，例如不同的子类对象可以继承公有的父类对象的方法，如果想要父类对象，又能保存子类的对父类重写的特有方法，这样一个指向子类对象的父类对象就很有用了，并且这个对象还能够被容器保存。例：

```java
// Male 是 Human 的子类
import java.util.ArrayList;

public class Demo<T>{

    public <T extends Human> boolean putElement(ArrayList<T> list, T obj){
        list.add(obj);
        return true;
    }

    public static void main(String[] args) {
        Demo<? extends Human> h = new Demo<Male>();
        ArrayList<Human> hs = new ArrayList<Human>();
        Human i = new Male();
        i.sleep();
        h.putElement(hs, i);
    }
}
```

我们这个时候虽然有了上边界也就是`Human`，但是`hs`却不能保存`Human`的子类`Male`，原因在于尽管上边界是`Human`，下边界却无法确定，它有可能是`Human`也有可能是`Male`，还有可能是其它继承`Human`的子类。

如果我们希望`hs`能够保存`Male`，那么应当使用下边界通配符。例：

```java
import java.util.ArrayList;

public class Demo{
    public static void main(String[] args) {
        ArrayList<? super Human> nums = new ArrayList<>();
        Male h = new Male();
        Human h1 = new Human();
        nums.add(h);
        nums.add(h1);
        System.out.println(nums);
    }
}
```

这里的`ArrayList<? super Human>`表示`Human`及其派生类都能存放进`ArrayList`，但是在取`ArrayList`里的元素时，并不能确定元素类型，因此只有`Object`类能够存放取出的元素。

所以我们使用泛型通配符时应牢记 PECS 原则——对于经常需要读取内容的，适合使用`extends`上边界通配符；经常需要存放内容的，适合使用`super`下边界通配符。

## 开头程序执行失败的原因

我们现在把`extends`上边界通配符用于开头的程序中：

```java
public class Main<T extends Double>{
    private T a;
    private T b;

    public Main(T a, T b){
        this.a = a;
        this.b = b;
    }

    public T sum(){
        return this.a+this.b;
    }

    public static void main(String[] args) {
        double a=2;
        double b=3;


        Main<Double> c = new Main<>(a, b);
        System.out.println(c.sum());
    }
}

```

然而这里还是会出现错误，错误在于`return this.a+this.b;`这一行，原因在于`this.a`与`this.b`已经被类型擦除为`Double`类型了，引用类型即使能够相加，它的返回值也该是基本类型`double`而非包装类型`Double`，所以报错显示会是`double`无法转换成`T`。

有人说可以使用`new`，但是切记`new`不能使用在泛型上。所以我们给出的返回值的类型应当是明确的。

## 结论

不能把泛型认为是与弱语言系统自动推断变量类型相同的机制，在《Java核心技术》一书已经给出泛型被设计出来的目的了：

![Snipaste_2021-03-15_23-03-00](https://gitee.com/peng_zhi_hung/img-res/raw/master/Snipaste_2021-03-15_23-03-00.png)

但是我们可以用 Dart 语言的泛型实现开头那个我们无法实现的需求（ Dart 语言是弱语言）：

```dart
class Demo<T extends String> {
  T a;
  T b;
  Demo(T a, T b) {
    this.a = a;
    this.b = b;
  }

  T sum() {
    return this.a + this.b;
  }
}

void main() {
  String a = "s";
  String b = "b";
  Demo<String> demo = new Demo(a, b);
  print(demo.sum());
}

```

但是还是应当谨记 Java 泛型被设计出来的目的之一是为了安全，切不可因为方便快捷而放弃安全性。