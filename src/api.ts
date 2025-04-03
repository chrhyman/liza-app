import axios, { AxiosError } from 'axios'
import { UserDto } from '@/types/user'
import { LoginRequest } from '@/types/login-request.interface'
import { StatusResponse } from '@/types/status-response.interface'
import { ErrorResponse } from './types/error-response.interface'

const API_URL = import.meta.env.VITE_API_URL

const UNKNOWN_ERROR = 'An unknown error occurred.'

const api = axios.create({ baseURL: API_URL, withCredentials: true }) // let axios use session cookies

/**
 * Helper function to process caught errors during API requests and extract the error message.
 * "Expected" API errors take the form of AxiosError<ErrorResponse> (in Java, ResponseEntity<ErrorResponseDto>)
 * @param error the raw error caught by axios
 * @returns a string message to re-throw in a new Error()
 */
const processError = (error: unknown): string => {
  const axiosError = error as AxiosError<ErrorResponse>
  const apiErrorMessage = axiosError.response?.data?.message

  return apiErrorMessage ?? UNKNOWN_ERROR
}

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
  } catch (e) {
    throw new Error(processError(e))
  }
}

export const getAuthenticatedUser = async (): Promise<UserDto> => {
  try {
    const { data } = await api.get<UserDto>('/users/me')
    return data
  } catch (e) {
    throw new Error(processError(e))
  }
}

export const logoutUser = async (): Promise<StatusResponse> => {
  try {
    const { data } = await api.post<ErrorResponse>('/auth/logout')
    return data
  } catch (e) {
    throw new Error(processError(e))
  }
}
