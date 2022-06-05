import type { App } from 'vue'
import { createI18nOptions } from './index'
import { createI18n } from 'vue3-i18n'

export let i18n: ReturnType<typeof createI18n>

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
