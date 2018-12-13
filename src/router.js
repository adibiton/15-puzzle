'use strict'
const express = require('express')
const router = express.Router()
const GameController = require('./game/controller')
const Game = require('./game/models/Game')
const { WELCOME_MESSAGE, GAME_DESCRIPTION } = require('./game/constants')
let game
let gameController

router.get('/ping', (req, res) => {
  res.send('pong')
})
router.get('/', (req, res) => {
  res.render('index', { message: WELCOME_MESSAGE, gameDescription: GAME_DESCRIPTION })
})
router.get('/game', (req, res) => {
  const seed = req.query.seed
  game = new Game(seed)
  gameController = new GameController(game)
  res.render('board', { message: WELCOME_MESSAGE, game, gameDescription: GAME_DESCRIPTION })
})
router.get('/game/move', (req, res) => {
  const direction = req.query.direction
  const { message, error, game, gameDescription } = gameController.move(direction)
  res.render('board', { message, game, error, gameDescription })
})

module.exports = router
