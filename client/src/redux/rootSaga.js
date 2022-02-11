import {
	call,
	spawn,
	all
} from '@redux-saga/core/effects'
import userSaga from './user/user.saga'
import profileSaga  from './profile/profile.saga';
import walletSaga  from './wallet/wallet.saga';
import usersSaga  from './users/users.saga';
import currencySaga  from './currency/currency.saga';
import gameActionsSaga  from './gameActions/gameActions.saga';
import fetchSaga  from './fetch/fetch.saga';
//*** GENERATED IMPORTS GO HERE ***

export default function* rootSaga() {
	const sagas = [
		userSaga,
		profileSaga,
walletSaga,
usersSaga,
currencySaga,
gameActionsSaga,
fetchSaga,
//*** GENERATED SAGAS GO HERE ***
	]

	const retrySagas = yield sagas.map((saga, index) => {
		return spawn(function* () {
			while (true) {
				try {
					yield call(saga)
					break;
				} catch (err) {
					console.log('error at saga: ' + (index + 1))
					console.log(err)
				}
			}
		})
	})

	yield all(retrySagas)
}