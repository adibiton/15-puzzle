'use strict'
const Game = require('./Game')
const { MOVE_TILE_DOWN, MOVE_TILE_UP, ERROR_NOT_VALID_MOVE } = require('../constants')

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

test('should throw new Error as this is not a valid move', () => {
  expect(() => game.moveTile(MOVE_TILE_DOWN)).toThrowError(ERROR_NOT_VALID_MOVE)
})

test('should not throw new Error as this is valid move', () => {
  expect(() => game.moveTile(MOVE_TILE_UP)).not.toThrow()
})
