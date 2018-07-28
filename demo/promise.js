let fs = require('fs')

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, {
      encoding: 'utf8'
    }, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

let promise = readFile('appendFile.txt')

promise.then(res => {
  console.log(res)
}, err => {
  console.error(err)
})