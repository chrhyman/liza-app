import axios, { AxiosError } from 'axios'
import { UserDto } from '@/types/user'
import { LoginRequest } from '@/types/login-request.interface'
import { StatusResponse } from '@/types/status-response.interface'

const API_URL = import.meta.env.VITE_API_URL

const UNKNOWN_ERROR = 'An unknown error occurred.'

const api = axios.create({ baseURL: API_URL, withCredentials: true })

export const loginUser = async ({
  identifier,
  password,
}: LoginRequest): Promise<UserDto> => {
  try {
    const { data } = await api.post<UserDto>('/auth/login', {
      identifier,
      password,
    })
    return data
  } catch (error) {
    // API errors take the form of StatusResponse (in Java, ResponseEntity<StatusResponseDto>)
    const axiosError = error as AxiosError<StatusResponse>
    const apiErrorMessage = axiosError.response?.data?.message

    throw new Error(apiErrorMessage ?? UNKNOWN_ERROR)
  }
}

export const getAuthenticatedUser = async (): Promise<UserDto> => {
  try {
    const { data } = await api.get<UserDto>('/users/me')
    return data
  } catch (error) {
    const axiosError = error as AxiosError<StatusResponse>
    const apiErrorMessage = axiosError.response?.data?.message

    throw new Error(apiErrorMessage ?? UNKNOWN_ERROR)
  }
}

export const logoutUser = async (): Promise<StatusResponse> => {
  try {
    const { data } = await api.post<StatusResponse>('/auth/logout')
    return data
  } catch (error) {
    const axiosError = error as AxiosError<StatusResponse>
    const apiErrorMessage = axiosError.response?.data?.message

    throw new Error(apiErrorMessage ?? UNKNOWN_ERROR)
  }
}
