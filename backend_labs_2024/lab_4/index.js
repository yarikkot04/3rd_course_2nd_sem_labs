import express from 'express'
import { create } from 'express-handlebars'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bodyParser from 'body-parser'

import mainRoute from './routes/main.js'
import weatherRoute from './routes/weather.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000
const app = express()
const hbs = create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.json())

app.use('/main', mainRoute)
app.use('/weather', weatherRoute)

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
}

start()
