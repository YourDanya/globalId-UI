import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'


const initialState = {
}

const gameActionsSlice = createSlice({
  name: 'gameActions',
  initialState,
  reducers: {
		createChallenge() {},
    claimChallengeFailure() {},
    claimChallengeSuccess() {}
  }
})

export default gameActionsSlice.reducer
export const {
  createChallenge,
  claimChallengeSuccess,
  claimChallengeFailure
} = gameActionsSlice.actions

export const selectGameActions = state => state.gameActions
// export const selectGameActionsData = createSelector(selectGameActions, (gameActions) => gameActions.data)