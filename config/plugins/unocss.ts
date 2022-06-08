import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import presetWind from '@unocss/preset-wind'
// import CarbonIcon from '@iconify-json/carbon'

export function configUnocss() {
  return Unocss({
    presets: [
      presetUno({}),
      presetAttributify(),
      presetIcons({
        prefix: 'i-',
        extraProperties: {
          display: 'inline-block'
        },
        collections: {
          // carbon: () => CarbonIcon.then((i) => i.icons as any)
        }
      }),
      presetWind()
    ]
  })
}
