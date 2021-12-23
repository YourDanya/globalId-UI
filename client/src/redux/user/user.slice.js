import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createSelector} from 'reselect'
import userApi from '../../api/user.api'
import authApi from '../../api/auth.api'

const initialState = {
    data: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, {payload}) {
            state.data = payload
        },
        getUserData() {
        },
        loginWithGoogle() {
        },
        loginWithNameAndPassword() {
        },
        createUserWithNameAndPassword() {
        },
        logout() {
        },
        updateUserData() {
        },
        updateUserPassword() {
        }
    }
})

export default userSlice.reducer
export const {
    setUserData,
    getUserData,
    loginWithNameAndPassword,
    loginWithGoogle,
    createUserWithNameAndPassword,
    logout,
    updateUserData,
    updateUserPassword
} = userSlice.actions

export const selectUser = state => state.user
export const selectUserData = createSelector([selectUser], user => {
    console.log(user)
    return user.data
})

