import { PURGE } from 'redux-persist'
import actions from './actions'

const initialState = {
  cosmWasmClient: null,
  loading: false,
  cosmLoaded: false,
  offlineSigner: null,
}

export default function chainReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case PURGE:
      return initialState
    default:
      return state
  }
}
