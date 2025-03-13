import { Link as RouterLink } from 'react-router'
import { Box, Button, Link } from '@mui/material'
import { useThemeContext } from '@/app/theme/theme-context'

const ModeButton = () => {
  const { toggleTheme, mode } = useThemeContext()

  return (
    <Box>
      <Button onClick={toggleTheme} variant="outlined">
        Toggle to {mode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Link component={RouterLink} to="me">
        Me
      </Link>
    </Box>
  )
}

export default ModeButton
