const connect = require('connect')

const app = connect()

app.use((req, res, next) => {
  if (req.url === '/') {
    res.statusCode = 200
    res.setHeader('content-type', 'text/html')
    res.end(`<!doctype html><html lang=en><head><meta charset=utf-8><title>plastik</title></head><body><p id="server-time">${new Date().toTimeString()}</p><script src="http://localhost:3000/dist/bundle.js"></script>`)
  }
  else if (req.url === '/token') {
    const token = Math.random().toString()
    res.end(token)
  }
  else {
    res.end('Not found\n')
  }
  next()
})

module.exports = app