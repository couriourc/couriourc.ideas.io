declare type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'
declare interface LocaleSetting {
  // isShow the change language button
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}
