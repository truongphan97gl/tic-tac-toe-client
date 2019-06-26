'use strict'
const store = require('../config.js')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
store.play = ['', '', '', '', '', '', '', '', '']

const checkWinner = (first, second, third) => {
  const firstCheck = $('#box' + first).text()
  const secondCheck = $('#box' + second).text()
  const thirdCheck = $('#box' + third).text()
  if (firstCheck === 'X' && secondCheck === 'X' && thirdCheck === 'X') {
    return true
  }
  if (firstCheck === 'O' && secondCheck === 'O' && thirdCheck === 'O') {
    return true
  }
  return false
}

const isFull = place => {
  return place === ''
}
const winner = () => {
  // Check in column
  if (checkWinner(1, 4, 7) || checkWinner(0, 3, 6) || checkWinner(2, 5, 8)) {
    $('#message').text(store.previousPlayer + ' is the winner ')
    store.disableClick = true
    return true
  }
  // check in row
  if (checkWinner(0, 1, 2) || checkWinner(3, 4, 5) || checkWinner(6, 7, 8)) {
    $('#message').text(store.previousPlayer + ' is the winner ')
    store.disableClick = true
    return true
  }
  // check in diagno
  if (checkWinner(0, 4, 8) || checkWinner(2, 4, 6)) {
    $('#message').text(store.previousPlayer + ' is the winner ')
    store.disableClick = true
    return true
  }
  return false
}

const onMove = event => {
  const target = $(event.target)
  const id = target.data('id')
  console.log('Current ID is ', id)
  // Logic to check the move is avaiable or not
  if (!store.disableClick) {
    if (target.text() === 'X' || target.text() === 'O') {
      ui.alertInvalid()
      console.log('Unavaible Move')
    } else {
      if (typeof store['currentPlayer'] === 'undefined') {
        ui.drawMove(target, 'X', 'O')
        store['previousPlayer'] = 'X'
        store['currentPlayer'] = 'O'
        store.play[id] = store['X']
        // if the current player is X
      } else
      if (store['currentPlayer'] === 'X') {
        ui.drawMove(target, 'X', 'O')
        store['previousPlayer'] = 'X'
        store['currentPlayer'] = 'O'
      // if the current player is O
      } else {
        ui.drawMove(target, 'O', 'X')
        store['previousPlayer'] = 'O'
        store['currentPlayer'] = 'X'
      }
      store.play[id] = store['previousPlayer']
    } // end else statement
  }
  const full = store.play.some(isFull)
  if (!winner()) {
    if (!full) {
      $('#message').text('Draw')
      console.log('The game board is full')
    }
  }
  // console.log('Select box ID : ', $('#box' + id).text())
  // console.log('Checking console checkwinner: ', checkWinner(1, 4, 7))
}

const onCreateGame = event => {
  event.preventDefault()

  store.play = ['', '', '', '', '', '', '', '', '']
  store.disableClick = false
  api.createGame()
    .then(ui.createSuccessful)
    .catch(ui.createFailure)
  ui.emptyBoard()
}

const onSignUp = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)

  api.signUp(formData)
    .then(ui.signUpSuccessful)
    .catch(ui.signUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)

  api.signIn(formData)
    .then(ui.signInSuccessful)
    .catch(ui.signInFailure)
}
const onChangePassword = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData)
    .then(ui.changeSuccessful)
    .catch(ui.changeFailure)
}
module.exports = {
  onMove,
  onCreateGame,
  onSignUp,
  onSignIn,
  onChangePassword
}
