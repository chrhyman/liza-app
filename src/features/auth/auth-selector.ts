import { RootState } from '@/store'
import { AuthState } from './auth-slice'

export const selectAuthState = (state: RootState): AuthState => state.auth

export const selectAuthLoading = (state: RootState): boolean =>
  state.auth.loading
export const selectAuthToken = (state: RootState): string | null =>
  state.auth.token
export const selectAuthError = (state: RootState): string | null =>
  state.auth.error
