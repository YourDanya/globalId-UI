import {
    call,
    put,
    takeLatest,
    select
} from '@redux-saga/core/effects'
import Web3 from 'web3'
import authApi from '../../api/auth.api'
import withLoading from '../../utils/redux-utils/withLoading.saga'
import {
    setFetchUserDataLoading,
} from '../loading.slice'
import { selectPrices } from '../currency/currency.slice'
import { selectAllUsers } from '../users/users.slice'
import { selectIcebreaker } from '../wallet/wallet.slice'
import {
    logout,
    fetchUser,
    selectWalletAddress,
    setUser,
    loginWithWeb3
} from './user.slice'








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



const logoutSaga = withLoading(function* () {
    const authMessage = yield authApi.postSingle('logout')
    return authMessage
}, setFetchUserDataLoading)

  

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
    yield takeLatest(logout, logoutSaga)
    yield takeLatest(fetchUser, fetchUserSaga)
    yield takeLatest(loginWithWeb3, loginWithWeb3Saga)    
}


