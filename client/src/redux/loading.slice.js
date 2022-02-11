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
        
        setModifyProfileLoading(state, {payload}) {
            state.modifyProfile = payload
        }
    }
})

export default loadingSlice.reducer
export const {
    setFetchUserDataLoading,
    setModifyProfileLoading
} = loadingSlice.actions

export const selectLoading = state => state.loading

export const selectUserLoading = createSelector(selectLoading, (loading) => loading.user)
export const selectFetchUserDataLoading = createSelector(selectUserLoading, (userLoading) => userLoading.data)
export const selectModifyProfileLoading = createSelector([selectLoading], (loading) => loading.modifyProfile)

