const http = require('http')
const fs = require('fs')
const mime = require('mime')
const url = require('url')
const path = require('path')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return
  }

  let pathname = path.join(__dirname, url.parse(req.url).pathname)
  pathname = decodeURIComponent(pathname)

  if (fs.statSync(pathname).isDirectory()) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    fs.readdir(pathname, (err, files) => {
      res.write('<ul>')
      files.forEach(file => {
        let link = path.join(pathname, file)
        res.write(`<li><a href="${link}">${file}</a></li>`)
      })
      res.end('</ul>')
    })
  } else {
    fs.readFile(pathname, 'binary', (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(err, null, 2))
        return false
      }
      res.writeHead(200, {
        'Content-Type': `${mime.getType(pathname)}; charset=utf-8`
      })
      res.write(data, 'binary')
      res.end()
    })
  }
})

server.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}`)
})