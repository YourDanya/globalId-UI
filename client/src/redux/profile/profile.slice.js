import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'


const initialState = {
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeAvatar() {},
    modifyProfile() {},
  }
})

export default profileSlice.reducer
export const {
  changeAvatar,
  modifyProfile
} = profileSlice.actions

