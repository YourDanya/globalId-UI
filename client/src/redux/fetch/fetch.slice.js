import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'


const initialState = {
  // interval: null
}

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    fetchEverything() {}
  }
})

export default fetchSlice.reducer
export const {
  fetchEverything
} = fetchSlice.actions

export const selectFetch = state => state.fetch
// export const selectFetchInterval = createSelector(selectFetch, (fetch) => fetch.interval)