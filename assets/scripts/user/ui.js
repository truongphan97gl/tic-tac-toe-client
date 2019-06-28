'use strict'

const store = require('../store')
const emptyBoard = () => {
  $('.box').text('')
  $('#message').text('')
  $('#alert').text('')
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
  store.user = responseData.user

  // show some things
  $('#user-game').removeClass('hide')
  $('#change-password').removeClass('hide')
  $('#create-game').removeClass('hide')
  $('#get-game').removeClass('hide')
  $('#sign-out').removeClass('hide')
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
  // hide some things
  $('#game-board').addClass('hide')
  $('#display-game').addClass('hide')
  $('#change-password').addClass('hide')
  $('#create-game').addClass('hide')
  $('#get-game').addClass('hide')
  $('#sign-out').addClass('hide')
  $('#game-id').addClass('hide')
  $('#sign-out').addClass('hide')
  $('#user-game').addClass('hide')
  // show some things
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

module.exports = {
  signUpFailure,
  signUpSuccessful,
  signInSuccessful,
  signInFailure,
  signOutSuccessful,
  signOutFailure,
  changeSuccessful,
  changeFailure
}
