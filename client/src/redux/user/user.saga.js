import {
    call,
    put,
    takeLatest,
    select
} from '@redux-saga/core/effects'
import Web3 from 'web3'
import authApi from '../../api/auth.api'
import userApi from '../../api/user.api'
import withLoading from '../../utils/redux-utils/withLoading.saga'
import {
    setAuthLoading,
    setFetchUserDataLoading,
    setAuthLoadingSilently,
    setUpdateUserDataLoading,
    setUpdateUserPasswordLoading,
    setForgetUserPasswordLoading, setResetUserPasswordLoading, setModifyProfileLoading,
} from '../loading.slice'
import { selectPrices } from '../currency/currency.slice'
import { selectAllUsers } from '../users/users.slice'
import { selectIcebreaker } from '../wallet/wallet.slice'
import {
    createUserWithNameAndPassword,
    getUserData,
    loginWithNameAndPassword,
    loginWithGoogle,
    logout,
    setUserData,
    updateUserData,
    updateUserPassword,
    forgetUserPassword,
    resetUserPassword,
    fetchUser,
    selectWalletAddress,
    setUser,
    modifyUser,
    loginWithWeb3
} from './user.slice'


export const getUserDataSaga = withLoading(function* () {
    const userData = yield userApi.getSingle('user-data')
    yield put(setUserData(userData))

    return userData.message
}, setFetchUserDataLoading, setAuthLoadingSilently)

const handleAuth = withLoading(function* (auth) {
    const authMessage = yield call(auth)
    yield call(getUserDataSaga)

    return authMessage
}, setAuthLoading)

function* loginWithGoogleSaga({payload}) {
    yield call(handleAuth, async () => await authApi.postSingle('login-with-google', payload))
}

function* loginWithNameAndPasswordSaga({payload}) {
    yield call(handleAuth, async () => await authApi.postSingle('login', payload))
}

function* createUserWithNameAndPasswordSaga({payload}) {
    yield call(handleAuth, async () => await authApi.postSingle('signup', payload))
}

const logoutSaga = withLoading(function* () {
    const authMessage = yield authApi.postSingle('logout')
    yield put(setUserData(null))
    yield put(setAuthLoading({success: false, isLoading: false, message: ''}))

    return authMessage
}, setFetchUserDataLoading)

const updateUserDataSaga = withLoading(function* ({payload}) {
    const message = yield userApi.postSingle('user-data', payload)
    yield call(getUserDataSaga)
    return message
}, setUpdateUserDataLoading)

const updateUserPasswordSaga= withLoading( function* ({payload}){
    const message= yield userApi.postSingle('update-password', payload)
    yield call(getUserDataSaga)
    return message
}, setUpdateUserPasswordLoading)

const forgetUserPasswordSaga= withLoading( function* ({payload}){
    const message= yield userApi.postSingle('forgot-password', payload)
    yield call(getUserDataSaga)
    return message
}, setForgetUserPasswordLoading)

const resetUserPasswordSaga= withLoading( function* ({payload}){
    console.log('inside reset pass saga')
    const message= yield userApi.postSingle(`reset-password/${payload.token}`, payload)
    yield call(getUserDataSaga)
    return message
}, setResetUserPasswordLoading)

export const fetchUserSaga = function* () {
    const currentWalletAddress = yield select(selectWalletAddress)
    if (!currentWalletAddress) return

    //check for user account from our server 
    const allUsers = yield select(selectAllUsers) 
    let currentUser = allUsers.find(user => user.walletAddress == currentWalletAddress) || { walletAddress: currentWalletAddress }
    currentUser = {...currentUser}

    //query blockchain
    
    //get balance
    currentUser.balance = yield window.ethereum.request({ method: 'eth_getBalance', params: [currentUser.walletAddress, 'latest'] })
    currentUser.balance = Math.trunc((parseInt(currentUser.balance, 16) / Math.pow(10, 18)) * 1000) / 1000
    

    //get challenges
    const icebreaker = yield select(selectIcebreaker)
    
    const userChallengesIds = yield icebreaker.methods.getChallengesByUser(currentUser.walletAddress).call()
    const userInspectionsIds = yield icebreaker.methods.getInspectionsByUser(currentUser.walletAddress).call()

    let userChallenges = []
    let userInspections = []

    for (let index in userChallengesIds) {
      const challenge = yield icebreaker.methods.getChallengeInfo(userChallengesIds[index]).call()
      challenge.id = userChallengesIds[index]
      userChallenges.push(challenge)
    }

    for (let index in userInspectionsIds) {
      const challenge = yield icebreaker.methods.getChallengeInfo(userInspectionsIds[index]).call()
      challenge.id = userInspectionsIds[index]
      userInspections.push(challenge)
    }

    currentUser.challenges = userChallenges
    currentUser.inspections = userInspections

    
    //convert balances
    const prices = yield select(selectPrices)
    const maticToUsd = prices.find(price => price.from == 'MATIC' && price.to == 'USD').value
    const maticToUah = prices.find(price => price.from == 'MATIC' && price.to == 'UAH').value
    currentUser.balanceUAH = Math.trunc(maticToUah * currentUser.balance * 100) / 100
    currentUser.balanceUSD = Math.trunc(maticToUsd * currentUser.balance * 1000) / 1000

    
    yield put(setUser(currentUser))
    return currentUser
}

  export function* loginWithWeb3Saga() {
    yield call(logoutSaga)
    const web3 = new Web3(window.ethereum)
    const message = 'Login to icebreaker app with this address'
    const address = yield select(selectWalletAddress)
    const signature = yield web3.eth.personal.sign(message, address)
    const response = yield authApi.postSingle('login-with-web3', { message, address, signature })
    console.log(response);
  }


export default function* userSaga() {
    yield takeLatest(loginWithGoogle, loginWithGoogleSaga)
    yield takeLatest(loginWithNameAndPassword, loginWithNameAndPasswordSaga)
    yield takeLatest(createUserWithNameAndPassword, createUserWithNameAndPasswordSaga)
    yield takeLatest(logout, logoutSaga)
    yield takeLatest(getUserData, getUserDataSaga)
    yield takeLatest(updateUserData, updateUserDataSaga)
    yield takeLatest(updateUserPassword, updateUserPasswordSaga)
    yield takeLatest(forgetUserPassword, forgetUserPasswordSaga)
    yield takeLatest(resetUserPassword, resetUserPasswordSaga)


    yield takeLatest(fetchUser, fetchUserSaga)
    yield takeLatest(loginWithWeb3, loginWithWeb3Saga)    
}


