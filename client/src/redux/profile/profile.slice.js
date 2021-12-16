import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'


const initialState = {
  data: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
		// setProfileData(state, {payload}) {
		// 	state.data = payload
		// } ,
    changeAvatar() {}
  }
})

export default profileSlice.reducer
export const {
  changeAvatar
} = profileSlice.actions

// export const selectProfile = state => state.profile
// export const selectProfileData = createSelector(selectProfile, (profile) => profile.data)