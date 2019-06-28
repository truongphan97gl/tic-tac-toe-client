'use strict'
const store = require('../config.js')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
store.play = ['', '', '', '', '', '', '', '', '']

// function check win
const isWin = (first, second, third) => {
  const firstCheck = $('#box' + first).text()
  const secondCheck = $('#box' + second).text()
  const thirdCheck = $('#box' + third).text()

  if ((firstCheck === 'X' && secondCheck === 'X' && thirdCheck === 'X') ||
   (firstCheck === 'O' && secondCheck === 'O' && thirdCheck === 'O')) {
    return true
  }
  return false
}

// check the possibility wins
const winner = () => {
  const condition = isWin(1, 4, 7) || isWin(0, 3, 6) || isWin(2, 5, 8) ||
  isWin(0, 1, 2) || isWin(3, 4, 5) || isWin(6, 7, 8) || isWin(0, 4, 8) || isWin(2, 4, 6)

  // if true then dont let user click
  if (condition) {
    $('#message').text(store.previousPlayer + ' is the winner ')
    store.disableClick = true
    store.Over = true
    return true
  }

  return false
}

const onMove = event => {
  if (store.disableClick === true) {
    ui.alertGameOver()
  }
  const target = $(event.target)
  const id = target.data('id')
  // if the game is end or full dont let the user click
  if (!store.disableClick) {
    if (target.text() === 'X' || target.text() === 'O') {
      ui.alertInvalid()
    } else {
      if (store['currentPlayer'] === 'O') {
        ui.drawMove(target, 'O', 'X')
        store['previousPlayer'] = 'O'
        store['currentPlayer'] = 'X'
      } else {
        ui.drawMove(target, 'X', 'O')
        store['previousPlayer'] = 'X'
        store['currentPlayer'] = 'O'
      }
      // store the space of the game board
      store.play[id] = store['previousPlayer']
    } // end else statement
  } // -- End of if statement

  // check if full
  const full = store.play.some(place => {
    return place === ''
  })

  // if it is not win and full then message is Draw
  if (!winner() && !full) {
    $('#message').text('Draw')
  }
  // check if the game is over or not
  let over = false
  if (store.Over === true) {
    over = 4
  }

  // update the move
  api.updateGame(id, store.previousPlayer, over)
    .then(ui.updateSuccess)
}

const onCreateGame = event => {
  event.preventDefault()
  // reset the storage
  store.play = ['', '', '', '', '', '', '', '', '']
  // enable the gameBoard
  store.disableClick = false
  store.Over = false
  api.createGame()
    .then(ui.createSuccessful)
    .catch(ui.createFailure)
}

const onGetGame = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  const id = formData.games.id
  api.getGame(id)
    .then(ui.getGameSuccessful)
    .catch(ui.getGameFailure)
}

const onUserGame = event => {
  event.preventDefault()
  api.getAllGame()
    .then(ui.getAllGameSuccessful)
}
module.exports = {
  onMove,
  onUserGame,
  onGetGame,
  onCreateGame
}
