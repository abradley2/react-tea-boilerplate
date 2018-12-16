const { loop, Cmd } = require('redux-loop')
const home = require('./pages/home')

const LOCATION_CHANGED = 'LOCATION_CHANGED'

const initialModel = {
  page: null
}

function locationChanged (pathname, search) {
  return {
    type: LOCATION_CHANGED,
    pathname,
    search
  }
}

const messageCreators = {
  locationChanged
}

function onLocationChanged (model, message) {
  // we only have on page so no need to conditionally get this
  const [page, cmd] = home.init()

  return loop(
    Object.assign({}, model, { page }),
    cmd
  )
}

function update (model = initialModel, message) {
  switch (message.type) {
    case LOCATION_CHANGED:
      return onLocationChanged(model, message)
    default:
      return loop(
        model,
        Cmd.none
      )
  }
}

module.exports = { update, messageCreators }
