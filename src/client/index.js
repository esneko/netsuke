fetch('/token')
  .then((res) => {
    return res.text()
  })
  .then((token) => {
    var elem = document.getElementById('server-time')
    var HOST = location.origin.replace(/^http/, 'ws') + '/api/' + token
    var ws = new WebSocket(HOST)
    ws.onmessage = (event) => {
      elem.innerHTML = event.data
    }
    ws.onclose = (event) => {
      window.location.reload()
    }
  })
