import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupBeforeEachGuard } from './guard/beforeEach'
import routes from '~pages'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

// config router
export function setupRouter(app: App<Element>): void {
  setupBeforeEachGuard(router)

  app.use(router)
}
