'use strict'
const Game = require('./Game')
const { MOVE_TILE_DOWN, MOVE_TILE_UP, MOVE_TILE_RIGHT,
  MOVE_TILE_LEFT, ERROR_NOT_VALID_MOVE, GAME_STATUS_DONE } = require('../constants')

let game
const seed = 'my-seed'

beforeEach(() => {
  game = new Game({ seed })
})

test(`new game has been created with seed ${seed}`, () => {
  const expected = [5, 3, 6, ' ', 12, 11, 7, 1, 4, 13, 8, 9, 14, 15, 10, 2]
  const actual = game.printBoard().reduce((acc, row) => {
    return acc.concat(row)
  }, [])
  expect(actual).toEqual(
    expect.arrayContaining(expected)
  )
})

test('should throw an Error as move tile down is not a valid move', () => {
  expect(() => game.moveTile(MOVE_TILE_DOWN)).toThrowError(ERROR_NOT_VALID_MOVE)
})

test('should throw an Error as move tile up is not a valid move', () => {
  for (let i = 0; i < 3; i++) {
    game.moveTile(MOVE_TILE_UP)
  }
  expect(() => game.moveTile(MOVE_TILE_UP)).toThrowError(ERROR_NOT_VALID_MOVE)
})

test('should throw an Error as move tile left is not a valid move', () => {
  expect(() => game.moveTile(MOVE_TILE_LEFT)).toThrowError(ERROR_NOT_VALID_MOVE)
})

test('should throw an Error as move tile right is not a valid move', () => {
  for (let i = 0; i < 3; i++) {
    game.moveTile(MOVE_TILE_RIGHT)
  }
  expect(() => game.moveTile(MOVE_TILE_RIGHT)).toThrowError(ERROR_NOT_VALID_MOVE)
})

test('should not throw new Error as this is valid move', () => {
  expect(() => game.moveTile(MOVE_TILE_UP)).not.toThrow()
})

test('should move tile right', () => {
  game.moveTile(MOVE_TILE_RIGHT)
  expect(game.printBoard()[0][2]).toEqual(' ')
})

test('should move tile left', () => {
  game.moveTile(MOVE_TILE_RIGHT)
  game.moveTile(MOVE_TILE_RIGHT)
  game.moveTile(MOVE_TILE_LEFT)
  expect(game.printBoard()[0][2]).toEqual(' ')
})

test('should return game is done', () => {
  let newGame = new Game({ inOrder: true })
  newGame.moveTile(MOVE_TILE_DOWN)
  expect(newGame.moveTile(MOVE_TILE_UP)).toEqual(GAME_STATUS_DONE)
})
