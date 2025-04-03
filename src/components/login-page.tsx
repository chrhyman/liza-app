import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store'
import { LoginRequest } from '@/types/login-request.interface'
import { login, logout } from '@/features/auth/auth-slice'
import { selectAuthState, selectUser } from '@/features/auth/auth-selector'
import LoginForm from './login-form'
import { useCallback } from 'react'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(selectAuthState)
  const activeUser = useAppSelector(selectUser)

  const handleLogin = useCallback(
    (credentials: LoginRequest) => void dispatch(login(credentials)),
    [dispatch]
  )

  const handleLogout = useCallback(() => void dispatch(logout()), [dispatch])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100hv',
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
        <Typography variant="h3">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}

        {!activeUser && <LoginForm onLogin={handleLogin} loading={loading} />}

        {activeUser && (
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
              You&apos;re logged in! Your username is {activeUser.username}.
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
