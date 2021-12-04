import {put, call} from '@redux-saga/core/effects'

export default function withLoading(callback, ...loadingSetters) {

return function* (...args) {	let i = 0
	while (i < loadingSetters.length) {
		console.log(loadingSetters[i])
		yield put(loadingSetters[i](true))
		i++
	}

	yield call(callback, ...args)

	i = 0
	while (i < loadingSetters.length) {
	  yield put(loadingSetters[i](false))
		i++
	}}
}