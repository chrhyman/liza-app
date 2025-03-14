import { Box } from '@mui/material'
import Sidebar from './sidebar'
import MainOutlet from './main-outlet'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <MainOutlet>{children}</MainOutlet>
    </Box>
  )
}

export default AppLayout
