ready(() => {
  window.token = $.cookie('token')
  setCookieSelfDestruct()
  var socket = io()
  socket.emit('register', window.token)
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
  window.onunload = window.onbeforeunload = function() {
    window.stopextendingcookie = true
    var date = new Date()
    date.setTime(date.getTime() + 60 * 1000)
    $.cookie('token', window.token, { expires: date })
  }
}
function extendcookie() {
  if (window.stopextendingcookie != true)
    $.cookie('token', window.token, { expires: 2147483647 })
}

function logout() {
  $.cookie('token', null, { path: '/' })
  window.token = null
  location.href = '/'
}
