import axios, { AxiosError } from 'axios'
import { store } from '@/store'
import { UserDto } from '@/types/user'
import { LoginResponse } from '@/types/login-response.interface'
import { LoginRequest } from '@/types/login-request.interface'
import { ErrorResponse } from '@/types/error-response.interface'

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({ baseURL: API_URL, withCredentials: true })

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const loginUser = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    })
    return data
  } catch (error) {
    // API errors take the form of ErrorResponse (in Java, ResponseEntity<ErrorResponseDto>)
    const axiosError = error as AxiosError<ErrorResponse>
    const apiErrorMessage = axiosError.response?.data?.message

    throw new Error(apiErrorMessage ?? 'An unknown error occurred.')
  }
}

export const getAuthenticatedUser = async (): Promise<UserDto> => {
  try {
    const { data } = await api.get<UserDto>('/users/me')
    return data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    const apiErrorMessage = axiosError.response?.data?.message

    throw new Error(apiErrorMessage ?? 'An unknown error occurred.')
  }
}
