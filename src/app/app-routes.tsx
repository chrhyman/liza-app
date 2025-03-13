import { Routes, Route } from 'react-router'
import LoginPage from '@/components/login-page'

const AppRoutes = () => (
  <Routes>
    <Route index element={<LoginPage />} />
  </Routes>
)

export default AppRoutes
