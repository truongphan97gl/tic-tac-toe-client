'use strict'
const store = require('../store.js')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
store.play = [1, 2, 3, 4, 5, 6, 7, 8, 9]
store.winner = []
// function check win

const isWin = (first, second, third) => {
  if (store.play[first] === store.play[second] && store.play[second] === store.play[third]) {
    store.winner = [first, second, third]
    ui.highlight()
    return true
  }
  return false
}

const isFull = () => {
  const full = store.play.every(place => {
    return (typeof place !== 'number')
  })

  // if it is not win and full then message is Draw
  if (!winner() && full) {
    $('#message').text('Draw')
    store.Over = true
    $('.box').addClass('red-background')
  }
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

const checkMove = (target, id) => {
  if (store.disableClick === true) {
    ui.alertGameOver()
  }
  if (!store.disableClick) {
    if (typeof store.play[id] !== 'number') {
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
      store.valid = 1
      store.play[id] = store['previousPlayer']
    } // end else statement
  } // -- End of if statement
  // check if the game is over or not
  isFull()
  let over = false
  if (store.Over === true) {
    over = 4
  }

  // update the move
  api.updateGame(id, store.previousPlayer, over)
    .then(ui.updateSuccess)
}

const onMove = event => {
  const target = $(event.target)
  const id = target.data('id')
  checkMove(target, id)
  if (store.Over !== true && store.botMode === true && store.valid === 1) {
    botTurn()
  }
  // check if full
}

const onCreateGame = event => {
  event.preventDefault()
  // reset the storage
  store.play = [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
// AI player

const onPlaybot = event => {
  event.preventDefault()
  store.disableClick = true
  if (store.botMode === true) {
    store.botMode = false
  } else {
    store.botMode = true
  }
  ui.playBot()
}

const emptySpot = () => {
  const available = []
  for (let i = 0; i < store.play.length; i++) {
    if (typeof store.play[i] === 'number') {
      available.push(i)
    }
  }
  return available
}

const takeRandomSpot = available => {
  let randomNumber = Math.floor(Math.random() * 8)
  while (available.indexOf(randomNumber) === -1) {
    randomNumber = Math.floor(Math.random() * 8)
  }
  return randomNumber
}

const botTurn = () => {
  const index = takeRandomSpot(emptySpot())
  const target = $('#box' + index)
  checkMove(target, index)
}

// ------------------------------------

const onShowPastGame = event => {
  event.preventDefault()
  $('#myModal').addClass('block')
  api.getAllGame()
    .then(ui.showAllGame)
}

const onClose = event => {
  event.preventDefault()
  $('#myModal').removeClass('block')
}

module.exports = {
  onMove,
  onUserGame,
  onGetGame,
  onCreateGame,
  onPlaybot,
  onShowPastGame,
  onClose
}
