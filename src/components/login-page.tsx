import { useCallback } from 'react'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store'
import { LoginRequest } from '@/types/login-request.interface'
import { RegisterRequest } from '@/types/register-request.interface'
import { login, logout, register } from '@/features/auth/auth-slice'
import { selectAuthState, selectUser } from '@/features/auth/auth-selector'
import LoginForm from './login-form'
import RegisterForm from './register-form'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(selectAuthState)
  const user = useAppSelector(selectUser)

  const theme = useTheme()
  const belowMediumWidth = useMediaQuery(theme.breakpoints.down('md'))

  const handleLogin = useCallback(
    (credentials: LoginRequest) => void dispatch(login(credentials)),
    [dispatch]
  )

  const handleRegister = useCallback(
    (registerRequest: RegisterRequest) =>
      void dispatch(register(registerRequest)),
    [dispatch]
  )

  const handleLogout = useCallback(() => void dispatch(logout()), [dispatch])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '75vw',
          gap: 2,
        }}
      >
        {!user && (
          <Box
            sx={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              flexDirection: belowMediumWidth ? 'column' : 'row',
            }}
          >
            <LoginForm onLogin={handleLogin} loading={loading} />
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '2px solid',
                borderColor: 'secondary.main',
              }}
            />
            <RegisterForm onRegister={handleRegister} loading={loading} />
          </Box>
        )}

        {error && <Typography color="error">{error}</Typography>}

        {user && (
          <>
            <Typography
              color="success"
              display="block"
              sx={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                maxWidth: '100%',
                textAlign: 'center',
              }}
            >
              You&apos;re logged in! Your username is {user.username}.
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Log out
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default LoginPage
