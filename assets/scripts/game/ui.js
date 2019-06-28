'use strict'
const store = require('../store')

const alertInvalid = () => {
  $('#alert').text('You cannot click at that cell !!!!')
  $('#alert').css('color', 'red')
  store.valid = 0
}

const drawMove = (target, xOro, currentPlayer) => {
  target.text(xOro)
  $('#message').text(currentPlayer + ' is TURN !!')
  $('#alert').text('')
}

const highlight = (first, second, third) => {
  for (let i = 0; i < 3; i++) {
    $('#box' + store.winner[i]).addClass('red-background')
  }
}
const alertGameOver = () => {
  $('#alert').text('Game is over !!! You cannot click !!!')
  $('#alert').css('color', 'red')
}

const emptyBoard = () => {
  $('.box').text('')
  $('#message').text('')
  $('#alert').text('')
  for (let i = 0; i < 3; i++) {
    $('#message' + store.winner[i]).removeClass('red-background')
  }
}

const createSuccessful = responseData => {
  store.game = responseData.game
  $('.box').removeClass('red-background')
  $('#game-board').removeClass('hide')
  $('#message').text('')
  $('#game-id').text('Your game ID is :' + responseData.game.id)
  emptyBoard()
  $('#message').text('You are created successfully')
  $('form').trigger('reset')
}

const createFailure = responseData => {
  $('#message').text('You failed to create ')
}
const getGameFailure = responseData => {
  $('#message').text('You failed to show ')
  $('form').trigger('reset')
}
const getGameSuccessful = responseData => {
  $('#message').text('You show successfully ')
  // information of the content
  const htmlContent = `
    <p>ID: ${responseData.game.id}
    <p>Cells: ${responseData.game.cells}
    <p>Over :${responseData.game.over}</p>
    <p>Player X: {
      id: ${responseData.game.player_x.id}
      email: ${responseData.game.player_x.email}
    }</p>
    <p> Player O : ${responseData.game.player_o}
  `
  $('#display-game').html(htmlContent)
  $('form').trigger('reset')
}

const updateSuccess = responseData => {
}

const getAllGameSuccessful = data => {
  $('#message').text('Your total game is ' + data.games.length)
}
const playBot = () => {
  if (store.botMode === true) {
    $('#message').text('You can play with bot now !! Please Create a new game !!')
  } else {
    $('#message').text('Bot mode is off now !! Please Create a new game !!')
  }
}
module.exports = {
  drawMove,
  alertInvalid,
  createSuccessful,
  createFailure,
  getGameFailure,
  getGameSuccessful,
  alertGameOver,
  updateSuccess,
  getAllGameSuccessful,
  highlight,
  playBot
}
