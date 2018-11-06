const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const bodyparser = require('body-parser')
const routes = require('./routes')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})
app.set('view engine', 'html')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended: false
}))

routes(app)

app.listen(3000, () => {
  console.log('app listening at http://localhost:3000')
})