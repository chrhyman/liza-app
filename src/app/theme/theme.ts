import { createTheme, useTheme } from '@mui/material'
import { colorMap } from '@/util/color-map'

/**
 * Allows toggling between light and dark mode
 * @param mode "light" or "dark"
 * @returns the chosen theme with custom palette
 */
export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: colorMap.aquaGreen,
      },
      secondary: {
        main: colorMap.rusticPink,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition:
              'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
          },
        },
      },
    },
  })
}

export const useAppTheme = useTheme
