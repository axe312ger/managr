export const SAVE_CONFIG = 'managr/saveConfigurationToLocalStorage'

export function saveConfig () {
  return {
    type: SAVE_CONFIG
  }
}
