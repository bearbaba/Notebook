function getNextElement(element){
  if (element.nodeType == 1){
    return element
  }

  if(element.nextSibling){
    return getNextElement(element.nextSibling)
  }

  return null
}

var ps = document.getElementsByTagName("p")
for(var i = 0; i<ps.length; i++){
  var elem = getNextElement(ps[i])
  elem.className = "intro"
}