import type { Preset } from '@unocss/core'
import type { PresetMiniOptions, Theme } from '@unocss/preset-mini'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
// import { variants } from "./variants";

export { rules, shortcuts, theme }

export type PresetWindOptions = PresetMiniOptions

export const presetWind = (options: PresetWindOptions = {}): Preset<Theme> => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false

  return {
    name: '@unocss/preset-weily',
    theme,
    rules,
    shortcuts,
    options
  }
}

export default presetWind
