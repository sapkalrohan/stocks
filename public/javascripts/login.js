function login() {
  var body = {}
  var errSpan = $('#err')
  body.username = $("[name='username']").val()
  if (!body.username) {
    errSpan.html('enter username')
    return false
  }
  body.password = $("[name='password']").val()
  if (!body.password) {
    errSpan.html('enter password')
    return false
  }
  $.ajax({
    url: '/login',
    type: 'POST',
    data: body,
    success: function(data, text, xhr) {
      errSpan.html('')
      console.log(data.token)
      $.cookie('token', data.token, { expires: 2147483647 })
      location.href = '/portfolio'
    },
    error: function(xhr, text, err) {
      errSpan.html(xhr.responseJSON.err)
    }
  })
}
