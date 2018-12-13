'use strict'
const { shuffleArray } = require('../utils')
const { BOARD_SIZE, EMPTY_TILE, BOARD_DIM } = require('../constants')

class Board {
  constructor () {
    this.tiles = Array.from({ length: BOARD_DIM }, _ => [])
  }
  shuffle ({ inOrder = false, seed } = {}) {
    shuffleArray({ size: BOARD_SIZE, inOrder, seed }).forEach((num, i) => {
      let row = Math.floor(i / BOARD_DIM)
      let column = i % BOARD_DIM
      if (num === BOARD_SIZE) {
        this.missingTilePlace = { row, column }
      }
      this.tiles[row][column] = num
    })
  }

  isInOrder () {
    let order = 1
    for (let row = 0; row < BOARD_DIM; row++) {
      for (let column = 0; column < BOARD_DIM; column++) {
        if (this.tiles[row][column] !== order) {
          return false
        }
        order++
      }
    }
    return true
  }

  swapTiles (tileA, tileB) {
    const temp = this.tiles[tileA.row][tileA.column]
    this.tiles[tileA.row][tileA.column] = this.tiles[tileB.row][tileB.column]
    this.tiles[tileB.row][tileB.column] = temp
  }

  printTiles ({ emptyTile = EMPTY_TILE } = {}) {
    return this.tiles.map(row => row.map(column => column === BOARD_SIZE ? emptyTile : column))
  }
}

module.exports = Board
