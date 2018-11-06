const fs = require('fs')
const fsPromises = fs.promises

// fsPromises.readFile(__filename)
//   .then(data => console.log(data.toString()))
//   .catch(err => console.log(err))

async function test() {
  try {
    const data = await fsPromises.readFile(__filename)
    console.log(data.toString())
  } catch (err) {
    console.log(err)
  }
}

test()