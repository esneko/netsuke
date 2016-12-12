const fs = require('fs')
const path = require('path')
const http = require('http')
const connect = require('connect')
const chokidar = require('chokidar')
const WebSocket = require('ws').Server
const PORT = process.env.PORT || 3000

const app = connect()

app.use((req, res, next) =>
  require('./webpack')(req, res, next)
)

app.use((req, res, next) =>
  require('./render')(req, res, next)
)

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

const wss = new WebSocket({server})
wss.on('connection', (ws) => {
  console.log('Client connected')
  ws.on('close', () => console.log('Client reload'))
})

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString())
  })
}, 1000)

if (process.env.NODE_ENV !== 'production') {
  const clearRequireCache = (path) => {
    Object.keys(require.cache).forEach((id) => {
      if (id.indexOf(path) !== -1) {
        delete require.cache[id]
      }
    })
  }

  const watchPath = path.join(__dirname, '..', '..', 'src')
  const watcher = chokidar.watch(watchPath)

  watcher.on('ready', () => {
    watcher.on('all', () => {
      clearRequireCache(watchPath)

      wss.clients.forEach((client) => {
        client.terminate()
      })
    })
  })
}