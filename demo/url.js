let http = require('http')
let url = require('url')
let fs = require('fs')

http.createServer((req, res) => {
  let query = url.parse(req.url, true)
  let fileName = `.${query.pathname}`
  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
      res.write('404 not found')
      res.end()
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}).listen(9999)