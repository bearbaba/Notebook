function addLoadEvent(func){
  let oldLoad = window.onload
  if(typeof window.onload !== "function"){
    window.onload = func 
  }else {
    window.onload = function(){
      oldLoad()
      func()
    }
  }
}

addLoadEvent(changeBgColor)