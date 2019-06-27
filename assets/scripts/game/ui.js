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
const signUpSuccessful = responseData => {
  $('#message').text('You are signed up successfully')
  $('form').trigger('reset')
}

const signUpFailure = () => {
  $('#message').text('You failed to signed up ')
  $('form').trigger('reset')
}

const signInSuccessful = responseData => {
  $('#message').text('You are signed in successfully')
  $('#message').addClass('alert alert-primary')
  $('#alert').addClass('alert alert-danger')
  store.user = responseData.user

  $('#user-game').removeClass('hide')
  $('#change-password').removeClass('hide')
  $('#create-game').removeClass('hide')
  $('#get-game').removeClass('hide')
  $('#sign-out').removeClass('hide')
  $('#game-board').removeClass('hide')
  $('#game-id').removeClass('hide')
  // Hide
  $('#sign-in').addClass('hide')
  $('#sign-up').addClass('hide')
  $('form').trigger('reset')
}

const signInFailure = response => {
  $('#message').text('You failed to signed up ')
  $('form').trigger('reset')
}

const signOutSuccessful = () => {
  $('#message').text('You signed out successfully ')
  // hide
  $('#game-board').addClass('hide')
  $('#change-password').addClass('hide')
  $('#create-game').addClass('hide')
  $('#get-game').addClass('hide')
  $('#sign-out').addClass('hide')
  $('#game-id').addClass('hide')
  $('#sign-out').addClass('hide')
  $('#user-game').addClass('hide')
  // show
  $('#sign-in').removeClass('hide')
  $('#sign-up').removeClass('hide')
  emptyBoard()
  store.disableClick = false
  $('form').trigger('reset')
}
const signOutFailure = () => {
  $('#message').text('You failed to signed out ')
}
const changeSuccessful = responseData => {
  $('#message').text('You are changed password successfully')
  $('form').trigger('reset')
}

const changeFailure = response => {
  $('#message').text('You failed to change password ')
  $('form').trigger('reset')
}

const emptyBoard = () => {
  $('.box').text('')
  $('#message').text('')
  $('#alert').text('')
}

const createSuccessful = responseData => {
  console.log(responseData)
  $('#gameBoard').show()
  store.game = responseData.game
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
  signUpFailure,
  signUpSuccessful,
  signInFailure,
  signInSuccessful,
  signOutFailure,
  signOutSuccessful,
  changeSuccessful,
  changeFailure,
  createSuccessful,
  createFailure,
  getGameFailure,
  getGameSuccessful,
  alertGameOver,
  updateSuccess,
  getAllGameSuccessful
}
