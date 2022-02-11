import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import chains from '../../chainsData'




const initialState = {
  currentChain: chains[0],
  icebreaker: null
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
		setCurrentChainToState(state, {payload}) {
      state.currentChain = payload
    },
    setCurrentChain() {},
    setIcebreaker(state, {payload}) {
      state.icebreaker = payload
    },

    connectWalletMetamask() {},
    changeAccountMetamask() {},
  }
})

export default walletSlice.reducer
export const {
  setCurrentChainToState,
  setCurrentChain,
  connectWalletMetamask,
  changeAccountMetamask,
  setIcebreaker
} = walletSlice.actions

export const selectWallet = state => state.wallet
export const selectCurrentChain = createSelector(selectWallet, (wallet) => wallet.currentChain)
export const selectIcebreaker = createSelector(selectWallet, (wallet) => wallet.icebreaker)