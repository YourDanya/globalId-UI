import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import withLoading from '../../utils/redux-utils/withLoading.saga'
import { fetchPricesSaga } from '../currency/currency.saga'
import { fetchPrices } from '../currency/currency.slice'
import { fetchUserSaga } from '../user/user.saga'
import { fetchUser } from '../user/user.slice'
import { fetchAllUsersSaga } from '../users/users.saga'
import { fetchAllUsers } from '../users/users.slice'
import { fetchEverything, selectFetchInterval } from './fetch.slice'


function* fetchEverythingSaga() {
  yield call(fetchPricesSaga)
  yield call(fetchAllUsersSaga)
  yield call(fetchUserSaga)
  
}


export default function* fetchSaga() {
  yield takeLatest(fetchEverything, fetchEverythingSaga)
}