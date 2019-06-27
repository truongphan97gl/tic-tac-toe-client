'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const userEvents = require('./game/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  $('.box').on('click', userEvents.onMove)
  $('#create-game').on('click', userEvents.onCreateGame)
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#change-password').on('submit', userEvents.onChangePassword)
  $('#get-game').on('submit', userEvents.onGetGame)
  $('#sign-out').on('submit', userEvents.onSignOut)
  $('#bot-play').on('submit', userEvents.onBotPlay)
})
