const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const compression = require('compression')
const damageController = require('./lib/controllers/damage')

// Set up Mustache as the view engine
app.engine('mustache', require('./lib/mustache'))
app.set('views', './views')
app.set('view engine', 'mustache')
app.set('layout', 'layout')

app.use(bodyParser.urlencoded({ extended: false }))

app.locals.postbox_url = process.env.POSTBOX_URL || 'http://localhost:9000'
app.locals.roca_url = process.env.ROCA_URL || 'http://localhost:9400'

app.use(require('./lib/render_without_layout'))

app.use(compression())

// Mount the assets
app.use('/assets', express.static('public'))

app.get('/', damageController.index)
app.get('/damage/new', damageController.new)
app.post('/damage', damageController.create)

module.exports = app

// Only run the application if it was invoked directly (e.g. not required by a test)
if (module.parent === null) {
  const backend = require('crimson-backend')

  Promise.all([
   // backend.listen(5100),
    app.listen(process.env.PORT || 9200)
  ]).then(() => console.log('Listening on port 9200 !'))
}
