import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createSelector} from 'reselect'
import userApi from '../../api/user.api'
import authApi from '../../api/auth.api'

const initialState = {
    challenges: [],
    inspections: [],
    walletAddress: '',
    balance: 0,
    name: ''
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
        loginWithWeb3() {},
        logout() {
        },
        updateUserData() {
        },
        updateUserPassword() {
        },
        forgetUserPassword(){
        },
        resetUserPassword(){
        },
        

        setWalletAddress(state, {payload}) {
            state.walletAddress = payload
        },
        
        fetchUser() {},
        setUser(state, {payload}) {
            for (let property in payload) {
                state[property] = payload[property]
            }
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
    updateUserPassword,
    forgetUserPassword,
    resetUserPassword,
    setWalletAddress,

    fetchUser,
    setUser,
    loginWithWeb3,
} = userSlice.actions

export const selectUser = state => state.user
export const selectWalletAddress = createSelector([selectUser], user => {
    console.log(user)
    return user.walletAddress
})

