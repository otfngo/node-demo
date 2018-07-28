const http = require('http')
const url = require('url')
const fs = require('fs')
const dt = require('./myFirstModule')

http.createServer((req, res) => {
  const query = url.parse(req.url, true).query
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write(`date: ${dt.myDateTime().toString()}<br/>`)
  res.write(`url: ${req.url}<br/>`)
  res.write(`query: ${query.year}, ${query.month}<br/>`)
  res.write('msg: hello world!')
  res.end()
}).listen(9999)