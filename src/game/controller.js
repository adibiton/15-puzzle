'use strict'
const { WELCOME_MESSAGE, GAME_DESCRIPTION, GAME_STATUS_DONE, GAME_OVER_MESSAGE } = require('./constants')

class GameController {
  constructor (game) {
    this.game = game
  }
  move (direction) {
    let error
    let message = WELCOME_MESSAGE
    if (direction) {
      try {
        let gameStatus = this.game.moveTile(parseInt(direction))
        if (gameStatus === GAME_STATUS_DONE) {
          message = GAME_OVER_MESSAGE
        }
      } catch (e) {
        error = e.message
      }
    }
    return { message, error, game: this.game, gameDescription: GAME_DESCRIPTION }
  }
}

module.exports = GameController
