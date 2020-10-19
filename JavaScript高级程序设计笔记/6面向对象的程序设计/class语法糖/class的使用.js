class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayName(){
    console.log(this.name)
  }
}

let per1 = new Person("John", 23);
console.log(per1)


// 静态方法

class Per{
  constructor(name, color){
    this.name = name
    this.color = color
  }

  static age = 26
  static sayHi = function(){
    console.log("Hi")
  }
}

console.log(Per.age)
Per.sayHi()


// 继承

class Plant{
  constructor(){
    this.hasLeaves = true
  }
  getHasLeaves(){
    console.log(this.hasLeaves)
  }
}

class Flower extends Plant{
  constructor(color){
    super ()
    this.hasFlowers = this.hasLeaves
    this.colorFlower = color
  }
}

let flower1 = new Flower("red")
flower1.getHasLeaves()

class Animal{
  static saySound(sound){
    console.log(sound)
  }
}

class Cat extends Animal{
  static saySound(sound){
    super.saySound(sound)
  }
}

Cat.saySound("喵")

class Per2 {
  constructor(name){
    this.name = name
  }
  sayName(){
    console.log(this.name)
  }
}

class Stu extends Per2{
  constructor(name, age){
    super(name)
    this.age = age
  }
  sayName(){
    super.sayName(this.name)
  }
  sayAge(){
    console.log(this.age)
  }
}

let stu1 = new Stu("green", 26)
stu1.sayName()
stu1.sayAge()