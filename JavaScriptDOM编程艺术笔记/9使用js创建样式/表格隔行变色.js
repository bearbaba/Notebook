function changeLineColor() {
  var tables = document.getElementsByTagName('table')
  for (var i = 0; i < tables.length; i++) {
    var odd = false
    var rows = tables[i].getElementsByTagName("tr")
    for (var j = 0; j < rows.length; j++) {
      if (odd == true) {
        rows[j].style.backgroundColor= "#ffc"
        odd = false
      } else {
        odd = true
      }
    }
  }

}

