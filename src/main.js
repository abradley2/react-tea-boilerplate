const { applyMiddleware, createStore, compose } = require('redux')
const { install } = require('redux-loop')
const { createLogger } = require('redux-logger')
const urlChangeEvent = require('@abradley2/url-change-event')
const { update, messageCreators } = require('./update')
const view = require('./view')

// HMR bullshit
if (module.hot) {
  module.hot.accept(function () {
    window.location.reload()
  })
}

const logger = createLogger({ diff: true, collapsed: true })

const store = createStore(
  update,
  compose(
    applyMiddleware(logger),
    install()
  )
)

// RUNTIME: BROWSER ONLY
if (document && document.body) {
  const ReactDOM = require('react-dom')

  const element = document.getElementById('app')

  const renderApplication = () => {
    const model = store.getState()
    ReactDOM.render(view(model, store.dispatch), element)
  }

  store.subscribe(renderApplication)

  const onLocationChanged = ({ pathname, search }) => {
    const message = messageCreators.locationChanged(
      pathname, search
    )
    store.dispatch(message)
  }

  urlChangeEvent()
  window.addEventListener('urlchange', onLocationChanged)
  onLocationChanged(document.location)
}

module.exports = { store, update, view }
