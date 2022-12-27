import { PURGE } from 'redux-persist'
import actions from './actions'

const initialState = {
  all: [],
  totalCount: 0,
  loading: false,
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
