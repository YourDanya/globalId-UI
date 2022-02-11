import { configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from '@redux-saga/core'

import logger from "redux-logger";

import userReducer from "./user/user.slice";
import loadingReducer from './loading.slice'
import profileReducer  from './profile/profile.slice';
import walletReducer  from './wallet/wallet.slice';
import usersReducer  from './users/users.slice';
import currencyReducer  from './currency/currency.slice';
import gameActionsReducer  from './gameActions/gameActions.slice';
import fetchReducer  from './fetch/fetch.slice';
//*** GENERATED IMPORTS GO HERE ***

import rootSaga from "./rootSaga";



const sagaMiddleware = createSagaMiddleware()

const customMiddleware = [sagaMiddleware]
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') customMiddleware.push(logger)

const store = configureStore({
	reducer: {
		user: userReducer,
		loading: loadingReducer,
		profile: profileReducer,
wallet: walletReducer,
users: usersReducer,
currency: currencyReducer,
gameActions: gameActionsReducer,
fetch: fetchReducer,
//*** GENERATED REDUCERS GO HERE ***
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	}).concat(customMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store