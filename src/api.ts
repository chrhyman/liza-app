import axios, { AxiosError } from 'axios'
import { LoginResponse } from '@/types/login-response.interface'
import { LoginRequest } from '@/types/login-request.interface'
import { ErrorResponse } from '@/types/error-response.interface'

const API_URL = import.meta.env.VITE_API_URL

export const loginUser = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
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
