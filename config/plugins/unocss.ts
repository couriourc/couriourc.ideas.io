import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import presetWind from '@unocss/preset-wind'

export function configUnocss() {
  return Unocss({
    presets: [presetUno({}), presetAttributify(), presetIcons(), presetWind()]
  })
}
