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
  loading: {
    auth: false,
    data: false
  },
  data: null,
  auth: {
    success: false,
    message: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      state.data = payload
    },
    setUserAuth(state, { payload }) {
      state.auth = payload
    },
    setDataLoading(state, { payload }) {
      state.loading.data = payload
    },
    setAuthLoading(state, {payload}) {
      state.loading.auth = payload
    },
    getUserData() {},
    loginWithGoogle() {},
    loginWithNameAndPassword() {},
    createUserWithNameAndPassword() {},
    logout() {},
  }
})

export default userSlice.reducer
export const {
  setUserData,
  setUserAuth,
  setDataLoading,
  setAuthLoading,
  getUserData,
  loginWithNameAndPassword,
  loginWithGoogle,
  createUserWithNameAndPassword,
	logout
} = userSlice.actions