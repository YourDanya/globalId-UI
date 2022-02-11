import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createSelector} from 'reselect'
import userApi from '../api/user.api'
import authApi from '../api/auth.api'

const initialState = {
    user: {
        data: {
            success: false,
            isLoading: false,
            message: '',
        },
        auth: {
            success: false,
            isLoading: false,
            message: '',
        },
        update: {
            success: false,
            isLoading: false,
            message: ''
        }
    },
    modifyProfile: {
      success: false,
      isLoading: false,
      message: ''
    }

}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setFetchUserDataLoading(state, {payload}) {
            state.user.data = payload
        },
        setUpdateUserDataLoading(state, {payload}) {
            state.user.update=payload
        },
        setUpdateUserPasswordLoading(state, {payload}) {
            state.user.update=payload
        },
        setAuthLoading(state, {payload}) {
            state.user.auth = payload
        },
        setAuthLoadingSilently(state, { payload }) {
            payload.message = ''
            state.user.auth = payload
        },
        setForgetUserPasswordLoading(state, {payload}) {
            state.user.update=payload
        },
        setResetUserPasswordLoading(state, {payload}) {
            state.user.update=payload
        },
        setModifyProfileLoading(state, {payload}) {
            state.modifyProfile = payload
        }
    }
})

export default loadingSlice.reducer
export const {
    setFetchUserDataLoading,
    setAuthLoading,
    setUpdateUserDataLoading,
    setAuthLoadingSilently,
    setUpdateUserPasswordLoading,
    setForgetUserPasswordLoading,
    setResetUserPasswordLoading,
    setModifyProfileLoading
} = loadingSlice.actions

export const selectLoading = state => state.loading

export const selectUserLoading = createSelector(selectLoading, (loading) => loading.user)
export const selectFetchUserDataLoading = createSelector(selectUserLoading, (userLoading) => userLoading.data)
export const selectAuthLoading = createSelector(selectUserLoading, (userLoading) => userLoading.auth)
export const selectUpdateUserDataLoading = createSelector(selectUserLoading, (userLoading) => userLoading.update)
export const selectUpdateUserPasswordLoading= createSelector(selectUserLoading, (userLoading) => userLoading.update)
export const selectForgetUserPasswordLoading= createSelector(selectUserLoading, (userLoading) => userLoading.update)
export const selectResetUserPasswordLoading= createSelector(selectUserLoading, (userLoading) => userLoading.update)
export const selectModifyProfileLoading = createSelector([selectLoading], (loading) => loading.modifyProfile)

