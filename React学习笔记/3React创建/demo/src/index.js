// console.log("loading");
import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello';

/* const myh1 = React.createElement(
  'h1', 
  {
    id: 'main-title',
    className: 'title',
  }, 
  "Hello World");

  const myDiv = React.createElement(
    'div',
    null,
    "这是myh1的父节点",
    myh1
  ) */
/* const a =13;
const fun = () => {
  return alert("hello");
}
const myDiv = <div>
                <p>{a}</p>
                <h2>{a+12}</h2>
                <h3>{true.toString()}</h3>
                <p>{ a>0 ? "a大于0" : "a小于0" }</p>
                <p>{fun()}</p>
              </div> */

// const list = [<h1>hello</h1>, <h1>world</h1>];

// const list1 = ["hello", "wor", "ld"];
// const list = [];
/* for(var i=0;i<list1.length;i++){
  const temp = <h1 key={i}>{list1[i]}</h1>;
  list.push(temp);
} */


/* 
const myDiv = (
  <div>
    {list1.map((value,id) => (
      <h1 key={id}>{value}</h1>
    ))}
    </div>
    ); */



const dog={
  name: "大黄",
  genter: "雄",
  color: "black"
}

/* function Hello({ name, color, genter }) {
  return (
    <h1>
      名字：{name} 毛色：{color} 性别：{genter}
    </h1>
  );
} */


const myDiv = <Hello name={dog.name} genter={dog.genter} color={dog.color}/>


ReactDOM.render(myDiv, document.getElementById('app'));