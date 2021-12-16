import {put, call} from '@redux-saga/core/effects'

export default function withLoading(callback, ...loadingSetters) {

return function* (...args) {	
	let 
		success = false,
		isLoading = true,
		message = ''
	
	
	let i = 0
	while (i < loadingSetters.length) {
		yield put(loadingSetters[i]({success, isLoading, message}))
		i++
	}

	try {
		message = yield call(callback, ...args)
		success = true
	} catch (err) {
		message = err.message
	} finally {
		isLoading = false
	}

	i = 0
	while (i < loadingSetters.length) {
	  yield put(loadingSetters[i]({ success, isLoading, message }))
		i++
	}}
}