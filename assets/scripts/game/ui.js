'use strict'
const store = require('../store')

const alertInvalid = () => {
  $('#alert').text('You cannot click at that cell !!!!')
  $('#alert').css('color', 'red')
}

const drawMove = (target, xOro, currentPlayer) => {
  target.text(xOro)
  $('#message').text(currentPlayer + ' is TURN!')
  $('#alert').text('')
}

const alertGameOver = () => {
  $('#alert').text('Game is over !!! You cannot click !!!')
  $('#alert').css('color', 'red')
}

const emptyBoard = () => {
  $('.box').text('')
  $('#message').text('')
  $('#alert').text('')
}

const createSuccessful = responseData => {
  console.log(responseData)
  store.game = responseData.game
  $('#game-board').removeClass('hide')
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
  console.log(responseData)
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
  console.log(responseData)
}

const getAllGameSuccessful = data => {
  console.log(data)
  $('#message').text('Your total game is ' + data.games.length)
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
  getAllGameSuccessful
}
