function addLoadEvent(func) {

  oldload = window.onload
  if (typeof window.onload !== "function") {
    window.onload = func
  } else {
    window.onload = function () {
      oldload()
      func()
    }
  }
}

addLoadEvent(changeLineColor)
addLoadEvent(highlightRows)