import { Link as RouterLink } from 'react-router'
import { Box, Link, Typography } from '@mui/material'

const Me = () => (
  <Box>
    <Typography variant="h1">Hello, world!</Typography>
    <Typography variant="subtitle1">It&apos;s a big one!</Typography>
    <Link component={RouterLink} to="/">
      Back home
    </Link>
  </Box>
)

export default Me
