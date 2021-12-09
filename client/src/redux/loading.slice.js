import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../api/user.api'
import authApi from '../api/auth.api'

// export const getUserData = createAsyncThunk('user/getUserData',  async () => await userApi.getSingle('user-data'))
// export const loginAnonymously = createAsyncThunk('user/loginAnonymously', async () => await authApi.postSingle('login-anonymously'))
// export const loginWithGoogle = createAsyncThunk('user/loginWithGoogle', async (token) => await authApi.postSingle('login-with-google', {token}))
// export const loginWithNameAndPassword = createAsyncThunk('user/loginWithNameAndPassword' , async (credentials) => await authApi.postSingle('login', credentials))
// export const createUserWithNameAndPassword = createAsyncThunk('user/createUserWithNameAndPassword', async (credentials) => await authApi.postSingle('signup', credentials))
// export const logout = createAsyncThunk('user/logout', async () => await authApi.postSingle('logout'))


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
	  }
	}
  
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setUserDataLoading(state, { payload }) {
      state.user.data = payload
    },
    setAuthLoading(state, { payload }) {
      state.user.auth = payload
    },
  }
})

export default loadingSlice.reducer
export const {
  setUserDataLoading,
  setAuthLoading,
} = loadingSlice.actions