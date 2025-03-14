import { Routes, Route } from 'react-router'
import LoginPage from '@/components/login-page'
import AppLayout from '@/components/layout/app-layout'

/**
 * Defines routes for components to render
 * @returns AppLayout containing the Routes as children
 */
const AppRoutes = () => (
  <AppLayout>
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  </AppLayout>
)

export default AppRoutes
