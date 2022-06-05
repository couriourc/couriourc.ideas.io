import { set } from 'lodash-es'

export const loadLocalePool: LocaleType[] = []

// 在 html 部分设置全局语言
export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

// 在本地设置一个记录池
export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool)
}

/**
 * 假设你还有其他目录下的语言文件 它的路径是
 * src/locales/
 *            zh-CN/
 *              sys|
 *                export default { hello: '你好' }
 *            en/
 *              sys|
 *                export default { hello: 'hello' }
 * 那么你就可以使用 dot 来索引 $t("sys.hello") : zh-CN -> 您好
 * 同理你也可以使用 dot 来索引 $t("sys.hello") : en -> hello
 * */

export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj = {}
  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)

    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')
    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}
