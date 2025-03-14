import { Box, CircularProgress, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store'
import { LoginRequest } from '@/types/login-request.interface'
import { login } from '@/features/auth/auth-slice'
import { selectAuthState, selectUser } from '@/features/auth/auth-selector'
import LoginForm from './login-form'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(selectAuthState)
  const activeUser = useAppSelector(selectUser)

  const handleLogin = (credentials: LoginRequest) => {
    dispatch(login(credentials))
      .unwrap()
      .catch((error) => {
        console.error('Login failed: ', error)
      })
  }

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

        {!loading && !activeUser && <LoginForm onLogin={handleLogin} />}

        {loading && <CircularProgress />}

        {activeUser && (
          <Typography
            color="success"
            sx={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              textAlign: 'center',
            }}
          >
            You&apos;re logged in! Your username is {activeUser.username}.
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default LoginPage
