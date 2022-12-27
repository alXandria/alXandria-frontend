import { all } from 'redux-saga/effects'
import settings from './settings/sagas'
import chain from './chain/sagas'
import menu from './menu/sagas'
import posts from './posts/sagas'

export default function* rootSaga() {
  yield all([chain(), settings(), menu(), posts()])
}
