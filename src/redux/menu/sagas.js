import { all, put, call } from 'redux-saga/effects'
import { getMenu } from 'services/menu'

export function* GET_DATA() {
  const menu = yield call(getMenu)
  yield put({
    type: 'menu/SET_STATE',
    payload: {
      menuData: menu,
    },
  })
}

export default function* rootSaga() {
  yield all([
    GET_DATA(), // run once on app load to fetch menu data
  ])
}
