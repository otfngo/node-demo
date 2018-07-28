const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')

  let ws = fs.createWriteStream('./demo06.txt')
  ws.write(`${new Date().toString()}\n`)
  ws.write(`请求方法：${req.method}\n`)
  ws.write(`请求url：${req.url}\n`)
  ws.write(`请求头对象：${JSON.stringify(req.headers, null, 2)}\n`)
  ws.write(`请求http版本：${req.httpVersion}\n`)

  res.write('hello world')
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}`)
})