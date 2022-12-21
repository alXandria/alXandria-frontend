import { all, call, put, takeEvery } from 'redux-saga/effects'
import getAllPosts from 'services/posts'
import actions from './actions'

export function* GET_POSTS() {
  yield put({
    type: 'posts/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const { allPosts, totalCount } = yield call(getAllPosts)

  yield put({
    type: 'posts/SET_STATE',
    payload: {
      loading: false,
      totalCount,
      all: allPosts,
    },
  })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_POSTS, GET_POSTS), GET_POSTS()])
}
