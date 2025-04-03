/**
 * Maps names to hex codes.
 * Prefer using the Theme whenever possible!
 */
export const colorMap = {
  errorRed: '#CF6679',
  infoBlue: '#67B8E3',
  purple: '#BB86FC',
  successGreen: '#82B184',
  teal: '#03DAC6',
  warningOrange: '#F4A767',
}

/**
 * Applies or unapplies a white overlay to the given hex color using the supplied opacity
 * @param hexColor the hex code (with or without #) of the color to modify
 * @param opacity the amount of white to overlay (0-1)
 * @param unapply if true, reverses this process
 * @returns the new hex color code
 */
export const whiteOverlay = (
  hexColor: string,
  opacity: number,
  unapply = false
): string => {
  // strip # if present
  if (hexColor.startsWith('#')) {
    hexColor = hexColor.substring(1)
  }

  // validate hexColor value
  const hexRegExp = /^[0-9A-Fa-f]{6}$/
  if (!hexRegExp.test(hexColor)) {
    console.warn('Invalid hex color format')
    return '#FFFFFF'
  }

  // validate opacity value
  if (opacity < 0 || opacity > 1) {
    console.warn(
      'Invalid opacity (should be 0-1); returning original hex value'
    )
    return `#${hexColor}`
  }

  // convert hex values to (decimal) RGB
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)

  const white = 255

  // apply a white overlay using the given opacity
  const apply = (n: number) => Math.round(n * (1 - opacity) + white * opacity)

  // reverse a white overlay from the given opacity
  const reverseApply = (n: number) =>
    Math.round((n - (1 - opacity) * white) / opacity)

  // apply or unapply the overlay
  const newR = unapply ? reverseApply(r) : apply(r)
  const newG = unapply ? reverseApply(g) : apply(g)
  const newB = unapply ? reverseApply(b) : apply(b)

  // ensure values are in range 0-255
  const clamp = (n: number) => Math.min(255, Math.max(0, n))

  // convert back to hex
  const toHex = (x: number) => clamp(x).toString(16).padStart(2, '0')

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}
