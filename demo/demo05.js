const http = require('http')
const fs = require('fs')
const formidable = require('formidable')

http.createServer((req, res) => {
  if (req.url === '/fileUpload') {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      const oldPath = files.fileUpload.path
      const newPath = `./${files.fileUpload.name}`
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          throw err
        }
        res.write('file uploaded and moved')
        res.end()
      })
    })
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(`
      <form action="fileUpload" method="post" enctype="multipart/form-data">
        <input type="file" name="fileUpload">
        <br>
        <input type="submit">
      </form>
    `)
    res.end()
  }
}).listen(3000)