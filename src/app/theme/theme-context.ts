import { createContext, useContext } from 'react'

interface ThemeContextType {
  toggleTheme: () => void
  mode: 'light' | 'dark'
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useThemeContext must be called within ThemeProviderWrapper which provides initial ThemeContext'
    )
  }
  return context
}
