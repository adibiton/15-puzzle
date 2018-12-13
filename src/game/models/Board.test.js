'use strict'
const Board = require('./Board')
let board

beforeEach(() => {
  board = new Board()
})

test('board has been initialized', () => {
  expect(board.tiles.length).toBe(4)
})

test('board has a random tiles order', () => {
  const expected = Array.from({ length: 16 }, (v, k) => k + 1)
  board.shuffle()
  const actual = board.printTiles({ emptyTile: 16 }).reduce((acc, row) => {
    return acc.concat(row)
  }, [])
  expect(actual).toEqual(
    expect.arrayContaining(expected)
  )
})

test('board is in order', () => {
  board.shuffle({ inOrder: true })
  expect(board.isInOrder()).toBe(true)
})

test('board is not in order', () => {
  board.shuffle()
  expect(board.isInOrder()).toBe(false)
})
