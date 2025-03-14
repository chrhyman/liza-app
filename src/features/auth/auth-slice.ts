import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthenticatedUser, loginUser } from '@/api'
import { LoginRequest } from '@/types/login-request.interface'
import { UserDto } from '@/types/user'

export interface AuthState {
  token: string | null
  loading: boolean
  error: string | null
  activeUser: UserDto | null
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  activeUser: null,
}

export const login = createAsyncThunk<
  UserDto,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const response = await loginUser(credentials)
    dispatch(setToken(response.token))
    const userResponse = await getAuthenticatedUser()
    return userResponse
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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setActiveUser: (state, action: PayloadAction<UserDto>) => {
      state.activeUser = action.payload
    },
    logout: (state) => {
      state.token = null
      state.activeUser = null
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
        const userDto: UserDto = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt,
        }
        state.activeUser = userDto
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.token = null
        state.activeUser = null
        state.error = action.payload ?? 'Login failed due to unknown error'
      })
  },
})

export const { setToken, setActiveUser, logout } = authSlice.actions
export const authReducerPath = authSlice.reducerPath
export default authSlice.reducer
