import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import { User, UserDto } from '@/types/user'
import { AuthState } from './auth-slice'

export const selectAuthState = (state: RootState): AuthState => state.auth

const selectRawUser = (state: RootState): UserDto | null =>
  state.auth.activeUser

export const selectUser = createSelector(
  [selectRawUser],
  (rawUser: UserDto | null): User | null => {
    return rawUser ? User.serializer.fromJSON(rawUser) : null
  }
)
