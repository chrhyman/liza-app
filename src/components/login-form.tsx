import { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material'
import { LoginRequest } from '@/types/login-request.interface'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface LoginFormProps {
  onLogin: (credentials: LoginRequest) => void
  loading: boolean
}

const LoginForm = ({ onLogin, loading }: LoginFormProps) => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin({ identifier, password })
    // clear the form password
    setPassword('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            label="Username or email"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              },
            }}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </>
      )}
    </Box>
  )
}

export default LoginForm
