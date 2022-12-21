import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import ChainInfo from 'utils/chainInfo'
import actions from './actions'

export function* SETUP() {
  yield put({
    type: 'chain/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const CosmWasmClientLocal = yield call(CosmWasmClient.connect, ChainInfo.rpc)

  if (CosmWasmClient) {
    yield put({
      type: 'chain/SET_STATE',
      payload: {
        cosmWasmClient: CosmWasmClientLocal,
        loading: false,
        cosmLoaded: true,
      },
    })
  }

  if (CosmWasmClient) {
    yield put({
      type: 'chain/SET_STATE',
      payload: {
        cosmWasmClient: CosmWasmClient,
        loading: false,
        cosmLoaded: true,
      },
    })
  }
}

export function* DISCONNECTWALLET() {
  yield put({
    type: 'chain/SET_STATE',
    payload: {
      loading: true,
      offlineSigner: null,
      user: null,
      cosmWasmClient: null,
    },
  })
  yield call(SETUP)
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SETUP, SETUP),
    takeEvery(actions.DISCONNECTWALLET, DISCONNECTWALLET),
  ])
}
