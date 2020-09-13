import React from 'react'; 

function Hello({ name, color, genter }) {
  return (
    <h1>
      名字：{name} 毛色：{color} 性别：{genter}
    </h1>
  );
}

export default Hello;