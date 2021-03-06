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
  $('#total-game').on('submit', gameEvents.onTotalGame)
  $('#get-game').on('submit', gameEvents.onGetGame)
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#guest-login').on('submit', userEvents.onGuestLogin)

  $('#change-password').on('submit', userEvents.onChangePassword)
  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#sign-out').on('submit', userEvents.onSignOut)
  $('#play-bot').on('submit', gameEvents.onPlaybot)
  $('#show-past-game').on('submit', gameEvents.onShowPastGame)
  $('.close').on('click', gameEvents.onClose)
  $('#resume-play').on('submit', gameEvents.onResume)
  $('.modal-content').on('click', '.info', gameEvents.onInfo)
})
