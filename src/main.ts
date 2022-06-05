import type { App } from 'vue'
import { createApp } from 'vue'
import AppView from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupGlobDirectives } from './directives'
import { setupI18n } from './locales/setupI18n'

import './common'
import './util'

async function bootstrap(app: App): Promise<App> {
  setupStore(app)
  setupRouter(app)
  setupGlobDirectives(app)
  // TODO:添加 i18n
  await setupI18n(app)
  return app
}

const app = createApp(AppView)
window.logger.log('🎉🎉🎉', 'Starting application')
bootstrap(app).then((app) => app.mount('#app'))
