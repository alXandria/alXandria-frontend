import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import settings from './settings/reducers'
import chain from './chain/reducers'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings,
    chain,
  })
