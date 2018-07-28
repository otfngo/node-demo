let http = require('http')
let fs = require('fs')

http.createServer((req, res) => {
  fs.writeFile('writeFile.txt', `${+new Date()} `, err => {
    if (err) {
      throw err
    }
    res.end()
  })
}).listen(9999)