import { createContext, useContext } from 'react'

interface ThemeContextType {
  toggleTheme: () => void
  mode: 'light' | 'dark'
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export const useAppTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useAppTheme must be called within ThemeProviderWrapper which provides initial ThemeContext'
    )
  }
  return context
}
