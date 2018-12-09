const http = require('http')
const path = require('path')
const fs =  require('fs')
const conf = require('../config/config')
const chalk = require('chalk')

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)

  fs.stat(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      if (path.extname(filePath) === '.css') {
        res.setHeader('Content-Type', 'text/css')
      }
      res.end(`${filePath} is not a directory or file`)
      return
    }

    if (data.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(filePath).pipe(res)

    } else if (data.isDirectory()) {
      fs.readdir(filePath, (err, data) => {
        if (err) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'text/plain')
          res.end(`read directory ${filePath} failure`)
          return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        let htmlFlag = ''
        data.forEach(item => {
          htmlFlag += `
            <li class=" padding-x-n padding-y-lg w-25">${item}</li>
          `
        })

        res.end(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>static file server</title>
              <link rel="stylesheet" href="/node_modules/xuanhuan/dist/xuanhuan.min.css">
            </head>
            <body>
              <ul class=" display-flex flex-wrap list-style-none padding-0 margin-0 line-height-xs">
                ${htmlFlag}
              </ul>
            </body>
          </html>
        `)
      })
    }
  })
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server running at ${chalk.green(addr)}`)
})