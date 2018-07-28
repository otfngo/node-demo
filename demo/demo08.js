const http = require('http')
const options = {
  hostname: 'www.baidu.com',
  port: 80,
  path: '/',
  method: 'GET'
}

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`)
  res.setEncoding('utf8')
  res.on('data', chunk => {
    console.log(`BODY: ${chunk}`)
  })
})