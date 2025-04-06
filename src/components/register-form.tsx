import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { checkEmailExists, checkUsernameExists } from '@/api'
import { RegisterRequest } from '@/types/register-request.interface'

// Only check username/email availability every half second
const API_REQUEST_TIMEOUT_MILLIS = 500

interface RegisterFormProps {
  onRegister: (registerRequest: RegisterRequest) => void
  loading: boolean
}

const RegisterForm = ({ onRegister, loading }: RegisterFormProps) => {
  // Form field values
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  // Form validation
  const usernameRegex = /^[A-Za-z0-9_]+$/
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [emailAvailable, setEmailAvailable] = useState(true)
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
  })
  const [formValid, setFormValid] = useState(false)

  // Handling username and email (debounce API calls)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!username) return

      void checkUsernameExists(username).then((e) => setUsernameAvailable(!e))
    }, API_REQUEST_TIMEOUT_MILLIS)

    return () => clearTimeout(timeout)
  }, [username])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!email) return

      void checkEmailExists(email).then((exists) => setEmailAvailable(!exists))
    }, API_REQUEST_TIMEOUT_MILLIS)

    return () => clearTimeout(timeout)
  }, [email])

  const validateUsername = (name: string) => {
    if (!name) return 'Username is required'
    if (!usernameRegex.test(name))
      return 'Only letters, numbers, and _ are allowed'
    return ''
  }

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsername(e.target.value)
    setErrors((prev) => ({
      ...prev,
      username: validateUsername(e.target.value),
    }))
  }

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value)
    setErrors((prev) => ({
      ...prev,
      email: !e.target.value ? 'Email is required' : '',
    }))
  }

  // most basic password validation
  useEffect(() => {
    if (password && password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be 8+ characters',
      }))
    } else if (password.toLowerCase() === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: "Password cannot be 'password'!",
      }))
    } else {
      setErrors((prev) => ({ ...prev, password: '' }))
    }
  }, [password])

  useEffect(() => {
    if (rePassword && rePassword !== password) {
      setErrors((prev) => ({ ...prev, rePassword: 'Passwords do not match' }))
    } else {
      setErrors((prev) => ({ ...prev, rePassword: '' }))
    }
  }, [password, rePassword])

  // combine it all for form validity
  useEffect(() => {
    const allValid =
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.rePassword &&
      !!username &&
      !!email &&
      !!password &&
      !!rePassword &&
      usernameAvailable &&
      emailAvailable

    setFormValid(allValid)
  }, [
    errors,
    username,
    email,
    password,
    rePassword,
    usernameAvailable,
    emailAvailable,
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister({ username, email, password })
    // clear the form password on submission
    setPassword('')
    setRePassword('')
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
      <Typography variant="h4">Sign up</Typography>
      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        error={!!errors.username || !usernameAvailable}
        helperText={
          errors.username || (!usernameAvailable ? 'Username is taken' : '')
        }
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={!!errors.email || !emailAvailable}
        helperText={
          errors.email || (!emailAvailable ? 'Email already in use' : '')
        }
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        label="Re-enter password"
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        error={!!errors.rePassword}
        helperText={errors.rePassword}
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Button type="submit" variant="contained" disabled={!formValid}>
          Register new user
        </Button>
      )}
    </Box>
  )
}

export default RegisterForm
