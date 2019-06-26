'use strict'
const store = require('../config.js')
const onMove = event => {
  const target = $(event.target)
  console.log(target.text())
  if (target.text() === 'X' || target.text() === 'O') {
    console.log('Unavaible Move')
  } else {
    if (store['currentPlayer'] === 'X') {
      $(event.target).text('X')
      store['currentPlayer'] = 'O'
    } else {
      $(event.target).text('O')
      store['currentPlayer'] = 'X'
    }
  }
}

module.exports = {
  onMove
}
