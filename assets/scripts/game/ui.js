'use strict'
const store = require('../store')

const drawMove = (target, xOro, currentPlayer) => {
  target.text(xOro)
  $('#message').text(currentPlayer + ' is TURN!')
  $('#alert').text('')
}

const alertInvalid = () => {
  $('#alert').text('You cannot click at that cell !!!!')
  $('#alert').css('color', 'red')
}

const emptyBoard = () => {
  $('.box').text('')
  $('#message').text('')
  $('#alert').text('')
}

const signUpSuccessful = responseData => {
  $('#message').text('You are signed up successfully')
}

const signUpFailure = () => {
  $('#message').text('You failed to signed up ')
}

const signInSuccessful = responseData => {
  $('#message').text('You are signed in successfully')
  store.user = responseData.user
  // show
  $('#change-password').removeClass('hide')
  $('#create-game').removeClass('hide')
  $('#get-game').removeClass('hide')
  // Hide
  $('#sign-in').addClass('hide')
  $('#sign-up').addClass('hide')
  $('#sign-out').addClass('hide')
}

const signInFailure = response => {
  $('#message').text('You failed to signed up ')
}

const signOutSuccessful = () => {
  $('#message').text('You signed out successfully ')
  // hide
  $('#change-password').addClass('hide')
  $('#create-game').addClass('hide')
  $('#get-game').addClass('hide')

  // show
  $('#sign-in').removeClass('hide')
  $('#sign-up').removeClass('hide')
}
const signOutFailure = () => {
  $('#message').text('You failed to signed out ')
}
const changeSuccessful = responseData => {
  $('#message').text('You are changed password successfully')
}

const changeFailure = response => {
  $('#message').text('You failed to change password ')
}

const createSuccessful = responseData => {
  console.log(responseData)
  $('#message').text('You are created successfully')
  $('#gameBoard').show()
  store.game = responseData.game
  emptyBoard()
}

const createFailure = responseData => {
  $('#message').text('You failed to create ')
}
const getGameFailure = responseData => {
  $('#message').text('You failed to show ')
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
  getGameSuccessful
}
