import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import authApi from '../api/auth.api'
import userApi from '../api/user.api'
import withLoading from '../utils/redux-utils/withLoading.saga'
import { createUserWithNameAndPassword, getUserData, loginWithNameAndPassword, loginWithGoogle, logout, setUserData, setUserAuth, setDataLoading, setAuthLoading } from './user.slice'



const getUserDataSaga = withLoading(function* () {
  try {
    const userData = yield userApi.getSingle('user-data')
    yield put(setUserData(userData))
		yield put(setUserAuth({success: true}))
  } catch (error) {
    yield console.log(error)
  }
}, setDataLoading)

const handleAuth = withLoading(function* (auth) {
  try {
    const authResponse = yield call(auth)
    yield put(setUserAuth({ success: true, message: authResponse }))
		yield call(getUserDataSaga)
  } catch (error) {
    yield console.log(error)
    yield put(setUserAuth({ success: false, message: error }))
  }
}, setAuthLoading)


function* loginWithGoogleSaga({ payload }) {
  yield call(handleAuth, async () => await authApi.postSingle('login-with-google', payload))
}

function* loginWithNameAndPasswordSaga({ payload }) {
  yield call(handleAuth, async () => await authApi.postSingle('login', payload))
}

const createUserWithNameAndPasswordSaga = withLoading(function * ({ payload }) {
  yield call(handleAuth, async () => await authApi.postSingle('signup', payload))
})

const logoutSaga = withLoading(function * () {
  yield authApi.postSingle('logout')
  yield put(setUserData(null))
	yield put(setUserAuth({success: false, message: 'logged out'}))
}, setDataLoading)

export default function* userSaga() {
  yield takeLatest(loginWithGoogle, loginWithGoogleSaga)
  yield takeLatest(loginWithNameAndPassword, loginWithNameAndPasswordSaga)
  yield takeLatest(createUserWithNameAndPassword, createUserWithNameAndPasswordSaga)
  yield takeLatest(logout, logoutSaga)
  yield takeLatest(getUserData, getUserDataSaga)
}


