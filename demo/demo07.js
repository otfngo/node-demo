const http = require('http')
const url = require('url')
const hostname = '127.0.0.1'
const port = 3000

function parsetime(date) {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
}

function unixtime(date) {
  return {
    unixtime: +date
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const date = new Date(parsedUrl.query.iso)
  let result = ''

  if (req.url === '/') {
    result = parsetime(new Date())
  } else if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(date)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(date)
  }

  if (result) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write(JSON.stringify(result))
    res.end()
  } else {
    res.writeHead(404)
    res.end()
  }
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}`)
})