'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const gameEvents = require('./game/events')
// use require without a reference to ensure a file is bundled
// require('./example')
const userEvents = require('./user/events')

$(() => {
  // your JS code goes here
  $('.box').on('click', gameEvents.onMove)
  $('#create-game').on('click', gameEvents.onCreateGame)
  $('#user-game').on('submit', gameEvents.onUserGame)
  $('#get-game').on('submit', gameEvents.onGetGame)
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#change-password').on('submit', userEvents.onChangePassword)
  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#sign-out').on('submit', userEvents.onSignOut)
})
