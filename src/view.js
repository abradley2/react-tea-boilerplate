const h = require('react-hyperscript')
const home = require('./pages/home')

function view (model) {
  switch (model.page && model.page.name) {
    case home.name:
      return home.view(model.page)
    default:
      return h('div', [
        h('h1', 'PAGE NOT FOUND')
      ])
  }
}

module.exports = view
