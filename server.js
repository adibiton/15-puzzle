const express = require('express')
const app = express()
const router = require('./src/game/router')
const PORT = process.env.PORT || 8081

app.set('views', './public/views')
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use('/', router)

app.listen(PORT, () => {
  console.log(`15 Puzzle game is available at http://localhost:${PORT}`)
})
