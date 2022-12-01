import {  SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
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
  console.log('Starting setup', window)
  // load settings from url on app load
  if (window.keplr) {
    if (window.keplr.experimentalSuggestChain) {
      yield call(window.keplr.experimentalSuggestChain, ChainInfo)
      yield call(window.keplr.enable, ChainInfo.chainId)

      const offlineSigner = yield call(window.getOfflineSigner, ChainInfo.chainId)
      const CosmWasmClient = yield call(
        SigningCosmWasmClient.connectWithSigner,
        ChainInfo.rpc,
        offlineSigner,
      )

      if (CosmWasmClient) {
        yield put({
          type: 'chain/SET_STATE',
          payload: {
            cosmWasmClient: CosmWasmClient,
            loading: false,
            cosmLoaded: true,
            offlineSigner,
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
            offlineSigner,
          },
        })
      }
    } else {
      console.warn('Error accessing experimental features, please update Keplr')
    }
  } else {
    console.warn('Error accessing Keplr, please install Keplr')
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SETUP, SETUP)])
}
