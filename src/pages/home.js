const { Cmd, loop } = require('redux-loop')
const h = require('react-hyperscript')

const name = 'HOME'

const initialModel = {
  name
}

function init () {
  return loop(
    initialModel,
    Cmd.none
  )
}

function update (model) {
  return loop(
    model,
    Cmd.none
  )
}

function view (model) {
  return h('div', [
    'welcome home'
  ])
}

module.exports = {
  init,
  update,
  view,
  name
}
