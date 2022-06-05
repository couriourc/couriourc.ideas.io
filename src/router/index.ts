import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { setupBeforeEachGuard } from './guard/beforeEach'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

// config router
export function setupRouter(app: App<Element>): void {
  setupBeforeEachGuard(router)

  app.use(router)
}
