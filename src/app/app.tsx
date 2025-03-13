import AppProvider from './app-provider'
import AppRouter from './app-router'

/**
 * Wraps BrowserRouter in an AppProvider, which includes the Theme context and Store
 * @returns React.FC
 */
const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
