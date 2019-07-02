'use strict'
const store = require('../store')
store.id = []
const alertInvalid = () => {
  $('#alert').text('You cannot click at that cell !!!!')
  $('#alert').css('color', 'red')
  store.valid = 0
}

const drawMove = (target, xOro, currentPlayer) => {
  target.text(xOro)
  $('#message').text(currentPlayer + ' is TURN !!')
  $('#alert').text('')
}

const highlight = (first, second, third) => {
  for (let i = 0; i < 3; i++) {
    $('#box' + store.winner[i]).addClass('red-background')
  }
}
const alertGameOver = () => {
  $('#alert').text('Game is over !!! You cannot click !!!')
  $('#alert').css('color', 'red')
}

const emptyBoard = () => {
  $('.box').text('')
  $('#message').text('')
  $('#display-game').text('')
  $('#alert').text('')
  for (let i = 0; i < 3; i++) {
    $('#message' + store.winner[i]).removeClass('red-background')
  }
}

const createSuccessful = responseData => {
  store.game = responseData.game
  $('.box').removeClass('red-background')
  $('#game-board').removeClass('hide')
  $('#message').text('')
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
  // information of the content
  const htmlContent = `
    <p>ID: ${responseData.game.id}</p>
    <p>Cells: ${responseData.game.cells}</p>
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
}

const totalGameSuccessful = responseData => {
  $('#message').text('Your total game is ' + responseData.games.length)
  let count = 0
  store.allGame = responseData.games
  responseData.games.forEach(Data => {
    if (Data.Over === true) {
      count++
    }
  })
  $('#message').text(`Your total game is ${responseData.games.length} and won ${count}`)
}
const playBot = () => {
  if (store.botMode === true) {
    $('#message').text('You can play with bot now !! Please Create a new game !!')
  } else {
    $('#message').text('Bot mode is off now !! Please Create a new game !!')
  }
}
// ----------- showAllGame-----------
const showAllGame = responseData => {
  store.allGame = responseData.games
  responseData.games.forEach(Data => {
    if (store.id.indexOf(Data.id) === -1) {
      store.id.push(Data.id)
      const htmlContent = `
      <p class="info" data-id="${Data.id}">ID: ${Data.id}
        | Cells: ${Data.cells}
        | Over :${Data.over}
        | Player X: {
          id: ${Data.player_x.id}
          email: ${Data.player_x.email}
        }
        |Player O : ${Data.player_o}</p>
        `
      $('.modal-content').append(htmlContent)
    }
  })
}

const showGame = responseData => {
  store.disableClick = true
  store.play = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  responseData.games.forEach(Data => {
    if (Data.id === store.idResume) {
      for (let i = 0; i < 9; i++) {
        $('#box' + i).text(Data.cells[i])
        store.play[i] = Data.cells[i]
        if (Data.cells[i] === '') {
          store.play[i] = i
        }
      }
    }
    $('#game-board').removeClass('hide')
    $('#myModal').removeClass('block')
    $('#message').text('show successfully')
    $('.box').removeClass('red-background')
  })
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
  totalGameSuccessful,
  highlight,
  playBot,
  showAllGame,
  showGame
}
