import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const currencies = [
  'MATIC',
  'USD',
  'UAH',
]

const initialState = {
  prices: [],
  displayedCurrency: localStorage.getItem('icebreaker-currency') || 'MATIC'
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
		setPrices(state, {payload}) {
			state.prices = payload
		} ,
    setDisplayedCurrency(state, {payload})  {localStorage.getItem('icebreaker-currency')
      localStorage.setItem('icebreaker-currency', payload)
      state.displayedCurrency = payload
    },
    switchDisplayedCurrency(state) {
      const currentCurrencyIndex = currencies.findIndex(item => item == state.displayedCurrency)
      const nextCurrencyIndex = currentCurrencyIndex + 1 < currencies.length ? currentCurrencyIndex + 1 : '0'
      const nextCurrency = currencies[nextCurrencyIndex]

      localStorage.setItem('icebreaker-currency', nextCurrency)
      state.displayedCurrency = nextCurrency
    },
    fetchPrices() {}
  }
})

export default currencySlice.reducer
export const {
  setPrices,
  fetchPrices,
  switchDisplayedCurrency
} = currencySlice.actions

export const selectCurrency = state => state.currency

export const selectPrices = createSelector([selectCurrency], (currency) => currency.prices)
export const selectDisplayedCurrency = createSelector([selectCurrency], (currency) => currency.displayedCurrency)
export const selectMaticToDisplayedCurrency = createSelector([selectDisplayedCurrency, selectPrices], (displayedCurrency, prices) => {
  if (displayedCurrency == 'MATIC') return 1
  return prices.find(price => price.from == 'MATIC' && price.to == displayedCurrency)?.value
})