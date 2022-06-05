import { genMessage, setHtmlPageLang } from './helper'
import { localeSetting } from '../settings/localeSetting'

const { fallback, availableLocales } = localeSetting
const allLang = import.meta.globEager('./lang/**/*.ts')

export async function createI18nOptions() {
  const locale = 'en'
  // const defaultLocal = allLang[locale]
  // const message = defaultLocal ?? {}
  // genMessage(message)
  setHtmlPageLang(locale)
  // setLoadLocalePool((loadLocalePool) => {
  //   loadLocalePool.push(locale)
  // })
  console.log(genMessage(allLang))
  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: genMessage(allLang),
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true
  }
}
