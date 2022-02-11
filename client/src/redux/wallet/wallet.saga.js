import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay
} from '@redux-saga/core/effects'
import Web3 from 'web3'
import chains from '../../chainsData'
import withLoading from '../../utils/redux-utils/withLoading.saga'
import { selectUser, setUser, setWalletAddress } from '../user/user.slice'
import { changeAccountMetamask, connectWalletMetamask, setCurrentChain, setCurrentChainToState, setIcebreaker } from './wallet.slice'

import icebreakerAbi from '../../icebreakerAbi.json'
import authApi from '../../api/auth.api'
import { loginWithWeb3Saga } from '../user/user.saga'

export function* connectWalletMetamaskSaga() {
  try {
    yield window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{
          eth_accounts: {}
        }]
      })
  } catch (err) {
    console.log(JSON.stringify(err))
  } let accounts
 try { accounts = yield window.ethereum.request({
    method: 'eth_requestAccounts'
  })} catch (err) {console.log(err)}
      
  const nextAccount = accounts[0]
  console.log(accounts)
  yield put(setWalletAddress(nextAccount))
  yield call(loginWithWeb3Saga)
}


export function* setCurrentChainSaga({payload}) {
  const web3 = new Web3(window.ethereum)
  const id = payload
  const chain = chains.find(chain => chain.id == id)

  let chainId = chain.chainId

   //save for future sessions
  localStorage.setItem('icebreaker-chain-id', id)

  //save to redux state
  console.log(chain)
  
  yield put(setCurrentChainToState(chain))

  //switch chain with metamask
  try {
    let res = yield window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    })
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(res)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
    console.log(window.ethereum.networkVersion)
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.data?.originalError?.code == 4902 || error.code == 4902) {
      const { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls } = chain
      const params = [{ chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls }]
      try {
        yield window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params
      })
      } catch(err) {
        alert(JSON.stringify(err))
      }
    }
  }

  //switch icebreaker address
  let nextIcebreaker = new web3.eth.Contract(icebreakerAbi, chain.icebreakerAddress)
  yield put(setIcebreaker(nextIcebreaker))

  //set user address 
  const accounts = yield window.ethereum.request({ method: 'eth_accounts' })
  if (accounts) {
    const walletAddress = accounts[0]
    yield put(setWalletAddress(walletAddress))
  }
}
function* changeAccountMetamaskSaga({payload}) {
  const newAccount = payload
        yield authApi.postSingle('logout')
        yield put(setWalletAddress(newAccount))
        yield console.log(newAccount)
        if (newAccount.length > 0) yield put(loginWithWeb3Saga)
}

export default function* walletSaga() {
  yield takeLatest(connectWalletMetamask, connectWalletMetamaskSaga)
  yield takeLatest(changeAccountMetamask, changeAccountMetamaskSaga)
	yield takeLatest(setCurrentChain, setCurrentChainSaga)
}