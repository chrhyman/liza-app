import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthenticatedUser, loginUser, logoutUser } from '@/api'
import { LoginRequest } from '@/types/login-request.interface'
import { UserDto } from '@/types/user'
import { StatusResponse } from '@/types/status-response.interface'

export interface AuthState {
  loading: boolean
  error: string | null
  activeUser: UserDto | null
}

const initialState: AuthState = {
  loading: false,
  error: null,
  activeUser: null,
}

export const login = createAsyncThunk<
  UserDto,
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

export const checkAuth = createAsyncThunk<
  UserDto,
  void,
  { rejectValue: string }
>('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    return await getAuthenticatedUser()
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred.')
  }
})

export const logout = createAsyncThunk<
  StatusResponse,
  void,
  { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await logoutUser()
  } catch (error) {
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
    setActiveUser: (state, action: PayloadAction<UserDto>) => {
      state.activeUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logout.pending, (state) => {
        // instantly remove the user from state, even if the action fails. don't track errors for logout
        state.activeUser = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.activeUser = action.payload
        state.error = null
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.activeUser = action.payload
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.activeUser = null
        state.error = action.payload ?? 'Login failed due to unknown error'
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false
        state.activeUser = null
        state.error = action.payload ?? 'Login failed due to unknown error'
      })
  },
})

export const { setActiveUser } = authSlice.actions
export const authReducerPath = authSlice.reducerPath
export default authSlice.reducer
