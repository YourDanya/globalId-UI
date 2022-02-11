import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import userApi from '../../api/user.api';
import userProfileApi from '../../api/userProfile.api';
import withLoading from '../../utils/redux-utils/withLoading.saga'
import { setModifyProfileLoading } from '../loading.slice';
import { fetchUserSaga } from '../user/user.saga';
import { changeAvatar, modifyProfile } from './profile.slice'



export function* changeAvatarSaga({payload}) {
    let formData = new FormData();
    formData.append('avatar', payload)
    yield userProfileApi.postSingle('avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    yield call(fetchUserSaga)
}

const modifyProfileSaga = withLoading(function*({ payload }) {
  const message = yield userApi.postSingle('user-data/profile', payload)
  yield call(fetchUserSaga)
  return message
}, setModifyProfileLoading)

export default function* profileSaga() {
  yield takeLatest(changeAvatar, changeAvatarSaga)
  yield takeLatest(modifyProfile, modifyProfileSaga)
}