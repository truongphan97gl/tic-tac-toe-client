'use strict'
const store = require('../config.js')
const ui = require('./ui')


const checkWinner = (first, second, third) => {
  const firstCheck = $('#box' + first).text()
  const secondCheck = $('#box' + second).text()
  const thirdCheck = $('#box' + third).text()
  if (firstCheck === 'X' && secondCheck === 'X' && thirdCheck === 'X') {
    console.log('True')
    return true
  }
  if (firstCheck === 'O' && secondCheck === 'O' && thirdCheck === 'O') {
    console.log('True')
    return true
  }
  return false
}
const onMove = event => {
  const target = $(event.target)
  const id = target.data('id')
  console.log('Current ID is ', id)
  // Logic to check the move is avaiable or not
  if (target.text() === 'X' || target.text() === 'O') {
    console.log('Unavaible Move')
  } else {
    // if yes switch player and addClass into it
    console.log('Test the total current player : ', store.play)
    if (store['currentPlayer'] === 'X') {
      ui.drawMove(target, 'X')
      store['previousPlayer'] = 'X'
      store['currentPlayer'] = 'O'
    } else {
      ui.drawMove(target, 'O')
      store['previousPlayer'] = 'O'
      store['currentPlayer'] = 'X'
    }
    // Check in column
    if (checkWinner(1, 4, 7) || checkWinner(0, 3, 6) || checkWinner(2, 5, 8)) {
      console.log(store.previousPlayer, ' column is the winner ')
    }
    // check in row
    if (checkWinner(0, 1, 2) || checkWinner(3, 4, 5) || checkWinner(6, 7, 8)) {
      console.log(store.previousPlayer, 'row is the winner ')
    }
    // check in diagno
    if (checkWinner(0, 4, 8) || checkWinner(2, 4, 6)) {
      console.log(store.previousPlayer, 'diagonos is the winner ')
    }
  } // end else statement

  console.log('Select box ID : ', $('#box' + id).text())
  console.log('Checking console checkwinner: ', checkWinner(1, 4, 7))
}

module.exports = {
  onMove
}
