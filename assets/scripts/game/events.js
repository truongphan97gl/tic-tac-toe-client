'use strict'
const store = require('../config.js')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
store.play = ['', '', '', '', '', '', '', '', '']

const isWin = (first, second, third) => {
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

// check winner
const winner = () => {
  // Check in column

  const condition = isWin(1, 4, 7) || isWin(0, 3, 6) || isWin(2, 5, 8) ||
  isWin(0, 1, 2) || isWin(3, 4, 5) || isWin(6, 7, 8) || isWin(0, 4, 8) || isWin(2, 4, 6)

  if (condition) {
    $('#message').text(store.previousPlayer + ' is the winner ')
    store.disableClick = true
    store.Over = true
    return true
  }
  return false
}
// if (checkWinner(1, 4, 7) || checkWinner(0, 3, 6) || checkWinner(2, 5, 8)) {
//   $('#message').text(store.previousPlayer + ' is the winner ')
//   store.disableClick = true
//   store.Over = true
//   return true
// }
// // check in row
// if (checkWinner(0, 1, 2) || checkWinner(3, 4, 5) || checkWinner(6, 7, 8)) {
//   $('#message').text(store.previousPlayer + ' is the winner ')
//   store.disableClick = true
//   store.Over = true
//   return true
// }
// // check in diagno
// if (checkWinner(0, 4, 8) || checkWinner(2, 4, 6)) {
//   $('#message').text(store.previousPlayer + ' is the winner ')
//   store.disableClick = true
//   store.Over = true
//   return true
// }

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
  console.log(`check ${id} and ${store['previousPlayer']}`)
  console.log(id)
  console.log(store['previousPlayer'])
  api.updateGame(id, store.previousPlayer)
    .then(ui.updateSuccessful)
    .catch(console.log)
    // check if full
  const full = store.play.some(place => {
    return place === ''
  })
  // check winner
  if (!winner()) {
    if (!full) {
      $('#message').text('Draw')
      store.Over = true
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

const onGetGame = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  const id = formData.games.id
  console.log('id is', id)
  api.getGame(id)
    .then(ui.getGameSuccessful)
    .catch(ui.getGameFailure)
}

module.exports = {
  onMove,
  onCreateGame,
  onSignUp,
  onSignIn,
  onChangePassword,
  onGetGame
}
