import { Box } from '@mui/material'
import Sidebar from './sidebar'
import MainOutlet from './main-outlet'
import { useAppDispatch } from '@/store'
import { useEffect } from 'react'
import { checkAuth } from '@/features/auth/auth-slice'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth()).catch(() => {
      // we check the auth, but we do nothing on a failure; the API handles refresh tokens
      // this hydrates the store if the user has a valid set of tokens in their cookies
      // otherwise, app logic will allow the user (null in the store) to login/register
    })
  }, [dispatch])
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <MainOutlet>{children}</MainOutlet>
    </Box>
  )
}

export default AppLayout
