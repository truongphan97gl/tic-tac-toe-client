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
  for (let i = 0; i < 9; i++) {
    $('#box' + i).text('')
  }
  $('#message').text('')
  $('#alert').text('')
}

const signUpSuccessful = () => {
  $('#message').text('You are signed up successfully')
  $('#gameBoard').show()
}

const signUpFailure = () => {
  $('#message').text('You failed to signed up ')
}

const signInSuccessful = responseData => {
  $('#message').text('You are signed in successfully')
  store.user = responseData.user
  $('#gameBoard').show()
}

const signInFailure = response => {
  $('#message').text('You failed to signed up ')
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
}

const createFailure = responseData => {
  $('#message').text('You failed to create ')
}
module.exports = {
  drawMove,
  alertInvalid,
  emptyBoard,
  signUpFailure,
  signUpSuccessful,
  signInFailure,
  signInSuccessful,
  changeSuccessful,
  changeFailure,
  createSuccessful,
  createFailure
}
