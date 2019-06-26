'use strict'

const onMove = event => {
  const target = $(event.target)
  console.log(target.text())
  if (target.text() === 'X' || target.text() === 'O') {
    console.log('Unavaible Move')
  } else {
    $(event.target).text('X')
  }
}

module.exports = {
  onMove
}
