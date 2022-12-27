import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import ChainInfo from 'utils/chainInfo'
import actions from './actions'
import getChain from './selector'

export function* SETUP() {
  yield put({
    type: 'chain/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const chain = yield select(getChain)
  let offlineSigner
  let CosmWasmClientLocal
  if (chain.user) {
    offlineSigner = yield call(window.keplr.getOfflineSigner, ChainInfo.chainId)
    CosmWasmClientLocal = yield call(
      SigningCosmWasmClient.connectWithSigner,
      ChainInfo.rpc,
      offlineSigner,
    )
  } else {
    CosmWasmClientLocal = yield call(CosmWasmClient.connect, ChainInfo.rpc)
  }

  if (CosmWasmClientLocal) {
    yield put({
      type: 'chain/SET_STATE',
      payload: {
        cosmWasmClient: CosmWasmClientLocal,
        offlineSigner,
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
