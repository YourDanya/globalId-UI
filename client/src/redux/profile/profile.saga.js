import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import userProfileApi from '../../api/userProfile.api';
import withLoading from '../../utils/redux-utils/withLoading.saga'
import { getUserDataSaga } from '../user/user.saga';
import { changeAvatar } from './profile.slice'



export function* changeAvatarSaga({payload}) {
    let formData = new FormData();
    formData.append('avatar', payload)
    yield userProfileApi.postSingle('avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    yield call(getUserDataSaga)
}

export default function* profileSaga() {
  yield takeLatest(changeAvatar, changeAvatarSaga)
}