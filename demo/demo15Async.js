const http = require('http')
const path = require('path')
const fs =  require('fs')
const fsPromises = fs.promises
const conf = require('../config/config')
const chalk = require('chalk')
const compress = require('../utils/compress')
const isFresh = require('../utils/cache')

const handlebars = require('handlebars')

const template = path.join(__dirname, './template.html')
const source = fs.readFileSync(template)
const tpl = handlebars.compile(source.toString())

const mimeMap = new Map([
  ['.css', 'text/css;charset=utf-8'],
  ['.html', 'text/html;charset=utf-8'],
  ['.js', 'application/javascript;charset=utf-8'],
  ['.json', 'application/json;charset=utf-8'],
  ['default', 'text/plain;charset=utf-8']
])

async function doStat({req, res, filePath}) {
  try {
    const stat = await fsPromises.stat(filePath)
    if (stat.isFile()) {
      doFile({req, res, filePath, stat})
    } else if (stat.isDirectory()) {
      doDirectory({res, filePath})
    }
  } catch (err) {
    res.statusCode = 404
    res.setHeader('Content-Type', mimeMap.get('default'))
    res.end(`${filePath} is not a directory or file`)
  }
}

async function doFile({req, res, filePath, stat}) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', mimeMap.get(path.extname(filePath)) || mimeMap.get('default'))

    if (isFresh(stat, req, res)) {
      res.statusCode = 304
      res.end()
      return
    }

    const rs = fs.createReadStream(filePath)
    compress(rs, req, res)
  } catch (err) {
    res.statusCode = 503
    res.setHeader('Content-Type', mimeMap.get('default'))
    res.end(`read file ${filePath} failure`)
  }
}

async function doDirectory({res, filePath}) {
  try {
    const files = await fsPromises.readdir(filePath)
    res.statusCode = 200
    res.setHeader('Content-Type', mimeMap.get('.html'))
    const url = path.relative(conf.root, filePath)
    const data = {
      files,
      dir: url ? `/${url}` : ''
    }
    res.end(tpl(data))
  } catch (error) {
    res.statusCode = 503
    res.setHeader('Content-Type', mimeMap.get('default'))
    res.end(`read directory ${filePath} failure`)
  }
}

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  doStat({req, res, filePath})
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server running at ${chalk.green(addr)}`)
})