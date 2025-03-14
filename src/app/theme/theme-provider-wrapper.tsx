import { ReactNode, useMemo, useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { ThemeContext } from './theme-context'
import { getTheme } from './theme'

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              transition:
                'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
