import {
	call,
	spawn,
	all
} from '@redux-saga/core/effects'
import userSaga from './user.saga'

export default function* rootSaga() {
	const sagas = [userSaga]

	const retrySagas = yield sagas.map((saga) => {
		return spawn(function* () {
			while (true) {
				try {
					yield call(saga)
					break;
				} catch (err) {
					console.log(err)
				}
			}
		})
	})

	yield all(retrySagas)
}