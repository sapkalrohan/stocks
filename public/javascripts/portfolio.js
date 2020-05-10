ready(() => {
  window.token = $.cookie('token')
  setCookieSelfDestruct()
  var socket = io()
  socket.emit('register', userid)
  socket.on('asset', function(asset) {
    console.log(asset)
    var maindiv = $('#' + asset.symbol)
    maindiv.find('span.value').html(asset.newvalue)
    maindiv.find('span.tvalue').html(asset.totalvalue)
    highlight(maindiv)
    extendcookie()
  })
})

function highlight(ele) {
  ele.addClass('highlight')
  setTimeout(function() {
    ele.removeClass('highlight')
  }, 1000)
}

function setCookieSelfDestruct() {
  window.onbeforeunload = function() {
    var date = new Date()
    date.setTime(date.getTime() + 60 * 1000)
    $.cookie('token', window.token, { expires: date })
  }
}
function extendcookie() {
  $.cookie('token', window.token, { expires: 2147483647 })
}

function logout() {
  $.cookie('token', null, { path: '/' })
  location.href = '/'
}
