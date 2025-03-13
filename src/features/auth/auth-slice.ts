import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser } from '@/api'
import { LoginRequest } from '@/types/login-request.interface'
import { LoginResponse } from '@/types/login-response.interface'

export interface AuthState {
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await loginUser(credentials)
  } catch (error) {
    // if api.ts receives an ErrorResponse from the API, it throws an Error with that message
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred.')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.token = null
        state.error = action.payload ?? 'Login failed due to unknown error'
      })
  },
})

export const { logout } = authSlice.actions
export const authReducerPath = authSlice.reducerPath
export default authSlice.reducer
