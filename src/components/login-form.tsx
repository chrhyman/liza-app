import { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
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
    // clear the form password on submission
    setPassword('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300,
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">Log in</Typography>
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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Button type="submit" variant="contained">
          Submit
        </Button>
      )}
    </Box>
  )
}

export default LoginForm
