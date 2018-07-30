const bookRoute = require('./book')

module.exports = function (app) {
  app.use('/', bookRoute)
}