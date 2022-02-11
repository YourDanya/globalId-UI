import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import userApi from '../../api/user.api'
import withLoading from '../../utils/redux-utils/withLoading.saga'
import { fetchAllUsers, setAllUsers } from './users.slice'



export function* fetchAllUsersSaga() {
  const allUsers = yield userApi.getSingle('user-data/all-users')
  yield put(setAllUsers(allUsers))
  return allUsers
}

export default function* usersSaga() {
  yield takeLatest(fetchAllUsers, fetchAllUsersSaga)
}