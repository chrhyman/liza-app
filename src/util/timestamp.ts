import { DateTime } from 'luxon'

/**
 * A fallback DateTime object
 */
export const unixEpoch = DateTime.fromMillis(0)

/**
 * A type guard for the rest of this file, so that unixEpoch correctly gets the type DateTime<true>
 */
if (!unixEpoch.isValid) {
  throw new Error('Unexpected error: fallback luxon DateTime is not valid.')
}

export const isUnixEpoch = (datetime: DateTime): boolean => {
  return datetime.equals(unixEpoch)
}

/**
 * Safely gets a valid ISO timestamp
 * @param datetime
 * @returns ISO timestamp of the given DateTime, or that of the unixEpoch if that isn't valid
 */
export const toISO = (datetime: DateTime): string => {
  if (datetime.isValid) {
    return (datetime as DateTime<true>).toISO()
  } else {
    return unixEpoch.toISO()
  }
}

/**
 * Safely converts an input string to a luxon DateTime
 * @param isoString
 * @returns DateTime for the given isoString, or the unixEpoch if that isn't valid
 */
export const fromISO = (isoString: string): DateTime<true> => {
  const datetime = DateTime.fromISO(isoString)
  if (datetime.isValid) {
    return datetime
  } else {
    return unixEpoch
  }
}
