'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const gameEvents = require('./game/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  $('.box').on('click', gameEvents.onMove)
})
