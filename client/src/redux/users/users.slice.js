import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'


const initialState = {
  allUsers: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
		setAllUsers(state, {payload}) {
			state.allUsers = payload
		},
    fetchAllUsers() {}
  }
})

export default usersSlice.reducer
export const {
  setAllUsers,
  fetchAllUsers
} = usersSlice.actions

export const selectUsers = state => state.users
export const selectAllUsers = createSelector(selectUsers, (users) => users.allUsers)