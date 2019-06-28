'use strict'

const store = require('../store')
const api = require('./api.js')
const insideUi = () => {
  $('#user-game').removeClass('hide')
  $('#change-password').removeClass('hide')
  $('#create-game').removeClass('hide')
  $('#get-game').removeClass('hide')
  $('#sign-out').removeClass('hide')
  $('#game-id').removeClass('hide')
  $('#play-bot').removeClass('hide')
  $('#show-past-game').removeClass('hide')
  // Hide
  $('#sign-in').addClass('hide')
  $('#sign-up').addClass('hide')
  $('form').trigger('reset')
}

const outsideUi = () => {
  $('#game-board').addClass('hide')
  $('#display-game').text('')
  $('#change-password').addClass('hide')
  $('#create-game').addClass('hide')
  $('#get-game').addClass('hide')
  $('#sign-out').addClass('hide')
  $('#game-id').addClass('hide')
  $('#sign-out').addClass('hide')
  $('#user-game').addClass('hide')
  $('#play-bot').addClass('hide')
  $('#show-past-game').addClass('hide')
  // show some things
  $('#sign-in').removeClass('hide')
  $('#sign-up').removeClass('hide')
  emptyBoard()
  store.disableClick = false
}
const emptyBoard = () => {
  $('.box').text('')
  // $('#message').text('')
  $('#alert').text('')
  $('#game-id').text('')
}
const signUpSuccessful = responseData => {
  $('#message').text('You are signed up successfully')
  $('form').trigger('reset')

  api.signIn(store.signUp)
    .then(signInAuto)
}

const signInAuto = responseData => {
  $('#message').text('You are sign up successfully')
  store.user = responseData.user
  insideUi()
}
const signUpFailure = () => {
  $('#message').text('You failed to signed up ')
  $('form').trigger('reset')
}

const signInSuccessful = responseData => {
  $('#message').text('You are signed in successfully')
  store.user = responseData.user
  insideUi()
  // show some things
}

const signInFailure = response => {
  $('#message').text('You failed to signed up ')
  $('form').trigger('reset')
}

const signOutSuccessful = () => {
  $('#message').text('You signed out successfully ')
  // hide some things
  outsideUi()
  $('form').trigger('reset')
}

const signOutFailure = () => {
  $('#message').text('You failed to signed out ')
}
const signOutAuto = () => {
  $('#message').text('You changed password successfully ! You need to sign in again !! ')
  outsideUi()
}
const changeSuccessful = responseData => {
  $('#message').text('You are changed password successfully')
  api.signOut()
    .then(signOutAuto)
  $('form').trigger('reset')
}

const changeFailure = response => {
  $('#message').text('You failed to change password ')
  $('form').trigger('reset')
}

const playBot = () => {
  $('#message').text('You can play with bot ')
}
module.exports = {
  signUpFailure,
  signUpSuccessful,
  signInSuccessful,
  signInFailure,
  signOutSuccessful,
  signOutFailure,
  changeSuccessful,
  changeFailure,
  playBot
}
