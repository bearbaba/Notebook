function showPic(whpic){
  var img = document.getElementById("img")
  var source = whpic.getAttribute("href")
  img.setAttribute("src", source)
}

function prepareGallery(){
  if (!document.getElementsByTagName) {
    return false
  }

  if (!document.getElementById) {
    return false
  }

  if (!document.getElementById("img")) {
    return false
  }

  var links = document.getElementsByTagName("a")
  for(var i=0;i<links.length;i++){
    links[i].onclick = function(){
      showPic(this)
      return false
    }
  }
}