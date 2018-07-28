let http = require('http')
let fs = require('fs')
let formidable = require('formidable')

http.createServer((req, res) => {
  if (req.url === '/fileUpload') {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      let oldPath = files.fileToUpload.path
      let newPath = `./${files.fileToUpload.name}`
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
        <input type="file" name="fileToUpload">
        <br>
        <input type="submit">
      </form>
    `)
    res.end()
  }
}).listen(9999)