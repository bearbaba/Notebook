function changeBgColor(){
  let div = document.getElementsByTagName("div")[0]
  setInterval(function (){
    div.style.backgroundColor = "blue"
  }, 1000)
  setInterval(function (){
    div.style.backgroundColor = "red"
  }, 2000)
}


/* function color(func){
  setInterval(func, 1000)
}

color(changeBgColor) */