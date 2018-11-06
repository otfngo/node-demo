const fs = require('fs')

// const result = fs.readFile(__filename, (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data.toString())
// })

// console.log(result)

// const rs = fs.createReadStream(__filename)
// rs.pipe(process.stdout)

const ws = fs.createWriteStream('text.txt')

const timeoutId = setInterval(() => {
  const num = Number.parseInt(Math.random() * 10)
  if (num < 9) {
    ws.write(num.toString())
  } else {
    clearInterval(timeoutId)
    ws.end()
  }
}, 100)

ws.on('finish', () => {
  console.log('done')
})