const http = require('http')
const querystring = require("querystring")
const nodemailer = require('nodemailer')

http.createServer((req, res) => {
  if (req.url === '/send-email') {
    req.addListener('data', (data) => {
      let info = decodeURIComponent(data)
      info = querystring.parse(info)

      const index = info.emailfrom.indexOf('@')
      const indexTo = info.emailfrom.indexOf('.')

      if (index === -1 || indexTo === -1) {
        res.write('email from address error')
        res.end()
        return
      }

      const service = info.emailfrom.slice(index + 1, indexTo)
      const transporter = nodemailer.createTransport({
        service,
        auth: {
          user: info.emailfrom,
          pass: info.password
        }
      })

      const mailOptions = {
        from: info.emailfrom,
        to: info.emailto,
        subject: 'sending email using node.js',
        // text: 'that was easy'
        html: `
          <h1>welcome</h1>
          <p>that was easy!</p>
        `
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw err
        }
        res.write(info.response)
        res.end()
      })
    })
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(`
      <form action="send-email" method="post">
        <label for="emailfrom">email from address</label>
        <input type="text" name="emailfrom">
        <br>
        <label for="emailfrom">email from password</label>
        <input type="password" name="password">
        <br>
        <label for="emailto">email to address</label>
        <input type="text" name="emailto">
        <br>
        <input type="submit">
      </form>
    `)
    res.end()
  }
}).listen(3000)