import { Box } from '@mui/material'
import MainOutlet from './main-outlet'
import { useAppDispatch } from '@/store'
import { useEffect } from 'react'
import { checkAuth } from '@/features/auth/auth-slice'
import Navbar from './navbar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // we check the auth, but we do nothing on a failure
    // this hydrates the store if the user has a valid session cookie
    // components can select from the store to know if the user is logged in
    void dispatch(checkAuth())
  }, [dispatch])
  return (
    <Box>
      <Navbar />
      <MainOutlet>{children}</MainOutlet>
    </Box>
  )
}

export default AppLayout
