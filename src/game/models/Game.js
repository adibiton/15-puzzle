'use strict'
const Board = require('./Board')
const {
  MOVE_TILE_DOWN, MOVE_TILE_LEFT,
  MOVE_TILE_RIGHT, MOVE_TILE_UP, BOARD_DIM,
  GAME_STATUS_DONE, GAME_STATUS_NOT_DONE, ERROR_NOT_VALID_MOVE
} = require('../constants')

class Game {
  constructor ({ seed, inOrder } = {}) {
    this.board = new Board()
    this.board.shuffle({ seed, inOrder })
  }

  moveTile (direction) {
    if (!this._isValidMove(direction)) {
      throw new Error(ERROR_NOT_VALID_MOVE)
    }
    const missingTilePlace = this.board.missingTilePlace
    const newMissingTilePlace = this._getNewMissingTilePlace(direction, missingTilePlace)

    this.board.swapTiles(missingTilePlace, newMissingTilePlace)
    this.board.missingTilePlace = newMissingTilePlace
    if (this.board.isInOrder()) {
      return GAME_STATUS_DONE
    }
    return GAME_STATUS_NOT_DONE
  }

  _getNewMissingTilePlace (direction, missingTilePlace) {
    let newPlace
    switch (direction) {
      case MOVE_TILE_UP:
        newPlace = { row: missingTilePlace.row + 1, column: missingTilePlace.column }
        break
      case MOVE_TILE_DOWN:
        newPlace = { row: missingTilePlace.row - 1, column: missingTilePlace.column }
        break
      case MOVE_TILE_LEFT:
        newPlace = { row: missingTilePlace.row, column: missingTilePlace.column + 1 }
        break
      case MOVE_TILE_RIGHT:
        newPlace = { row: missingTilePlace.row, column: missingTilePlace.column - 1 }
        break
    }
    return newPlace
  }

  _isValidMove (direction) {
    switch (direction) {
      case MOVE_TILE_UP:
        if (this.board.missingTilePlace.row === (BOARD_DIM - 1)) {
          return false
        }
        break
      case MOVE_TILE_DOWN:
        if (this.board.missingTilePlace.row === 0) {
          return false
        }
        break
      case MOVE_TILE_LEFT:
        if (this.board.missingTilePlace.column === (BOARD_DIM - 1)) {
          return false
        }
        break
      case MOVE_TILE_RIGHT:
        if (this.board.missingTilePlace.column === 0) {
          return false
        }
        break
    }
    return true
  }

  printBoard () {
    return this.board.printTiles()
  }
}

module.exports = Game
