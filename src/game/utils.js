'use strict'
const seedrandom = require('seedrandom')

module.exports = {
  shuffleArray ({ size, inOrder, seed }) {
    const rng = seedrandom(seed)
    let arr = Array.from({ length: size }, (e, i) => i + 1)
    if (!inOrder) {
      let length = arr.length
      let temp
      let i
      // While there remain elements to shuffle…
      while (length) {
        // Pick a remaining element…
        i = Math.floor(rng() * length--)
        // And swap it with the current element.
        temp = arr[length]
        arr[length] = arr[i]
        arr[i] = temp
      }
    }
    return arr
  }
}
