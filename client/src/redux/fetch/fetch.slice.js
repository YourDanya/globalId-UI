import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'


const initialState = {
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