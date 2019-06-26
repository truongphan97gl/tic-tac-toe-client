'use strict'
const store = require('../config.js')
const ui = require('./ui')
const onMove = event => {
  const target = $(event.target)
  console.log(target.text())
  if (target.text() === 'X' || target.text() === 'O') {
    console.log('Unavaible Move')
  } else {
    if (store['currentPlayer'] === 'X') {
      ui.drawMove(target, 'X')
      store['currentPlayer'] = 'O'
    } else {
      ui.drawMove(target, 'O')
      store['currentPlayer'] = 'X'
    }
  }
}

module.exports = {
  onMove
}
