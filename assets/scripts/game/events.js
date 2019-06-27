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

const onMove = event => {
  const target = $(event.target)
  const id = target.data('id')
  // Logic to check the move is avaiable or not
  if (!store.disableClick) {
    if (target.text() === 'X' || target.text() === 'O') {
      ui.alertInvalid()
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
  } // -- End of if statement

  // everymove will update the game to the API
  api.updateGame(id, store.previousPlayer)
  // check if full
  const full = store.play.some(place => {
    return place === ''
  })

  // if it is not win and full then message is Draw
  if (!winner() && !full) {
    $('#message').text('Draw')
  }
}

const onCreateGame = event => {
  event.preventDefault()

  store.play = ['', '', '', '', '', '', '', '', '']
  store.disableClick = false
  api.createGame()
    .then(ui.createSuccessful)
    .catch(ui.createFailure)
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

// -------------User PART--------------------
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

const onSignOut = event => {
  event.preventDefault()

  api.signOut()
    .then(ui.signOutSuccessful)
    .cartch(ui.signOutFailure)
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
  onChangePassword,
  onGetGame,
  onSignUp,
  onSignIn,
  onSignOut
}
