import { createTheme, useTheme } from '@mui/material'
import { colorMap, whiteOverlay } from '@/util/colors'

/**
 * Allows toggling between light and dark mode
 * @param mode "light" or "dark"
 * @returns the chosen theme with custom palette
 */
export const getTheme = (mode: 'light' | 'dark') => {
  /**
   * Returns the default color if it's dark mode.
   * Otherwise, a 40% white overlay is removed to brighten the color to its light mode equivalent.
   * @param color
   * @returns
   */
  const modeAwareColor = (lightColor: string) =>
    mode === 'dark' ? lightColor : whiteOverlay(lightColor, 0.4, true)

  return createTheme({
    palette: {
      mode,
      primary: {
        main: modeAwareColor(colorMap.purple),
      },
      secondary: {
        main: modeAwareColor(colorMap.teal),
      },
      error: {
        main: modeAwareColor(colorMap.errorRed),
      },
      warning: {
        main: modeAwareColor(colorMap.warningOrange),
      },
      info: {
        main: modeAwareColor(colorMap.infoBlue),
      },
      success: {
        main: modeAwareColor(colorMap.successGreen),
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
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
