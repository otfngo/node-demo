const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  fs.appendFile('demo01.txt', `${+new Date()}\n`, err => {
    if (err) {
      throw err
    }
    res.end()
  })
}).listen(3000)