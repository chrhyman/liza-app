import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { LoginRequest } from '@/types/login-request.interface'

interface LoginFormProps {
  onLogin: (credentials: LoginRequest) => void
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin({ email, password })
    // clear the form password
    setPassword('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Box>
  )
}

export default LoginForm
