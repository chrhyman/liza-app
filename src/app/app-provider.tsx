import { Provider as StoreProvider } from 'react-redux'
import { store } from '@/store'
import { ThemeProviderWrapper } from './theme/theme-provider-wrapper'

/**
 * Supplies the following providers:
 * - Provider (aliased to StoreProvider): from react-redux to provide the Root store
 * - ThemeProviderWrapper: wraps the Material UI theme, CssBaseline, and control of light/dark mode
 * @param children ReactNode
 * @returns children wrapped in providers
 */
const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider store={store}>
    <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
  </StoreProvider>
)

export default AppProvider
