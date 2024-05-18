import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import { create } from 'express-handlebars'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

import mainRoute from './routes/main.js'
import addCardRoute from './routes/addCard.js'
import showCardsRoute from './routes/cards.js'
import editCardRoute from './routes/editCard.js'
import deleteCardRoute from './routes/deleteCard.js'
import jsonCardRoute from './routes/cardJson.js'

const url = 'mongodb+srv://yarikkotenkoim13:LUGD3nhtc1ZpvEST@cluster0.qbd8tfw.mongodb.net/technological_cards'
const PORT = process.env.PORT || 5000

const app = express()

const hbs = create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', mainRoute)
app.use('/cards', showCardsRoute)
app.use('/add', addCardRoute)
app.use('/edit', editCardRoute)
app.use('/delete', deleteCardRoute)
app.use('/json', jsonCardRoute)

const start = async () => {
  await mongoose.connect(url)
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
}

start()
