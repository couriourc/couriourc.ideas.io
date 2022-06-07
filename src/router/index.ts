import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { setupBeforeEachGuard } from './guard/beforeEach'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: () => import('../views/tutorial/index.vue')
  },
  {
    path: '/expanding-cards',
    name: 'expanding-cards',
    component: () =>
      import(/** webpackChunkName: 'expanding-cards' */ '/@/views/expanding-cards/index.vue'),
    meta: {
      title: 'Expanding Cards'
    }
  },
  {
    path: '/progress-step',
    name: 'progress-step',
    component: () =>
      import(/** webpackChunkName: 'progress-step' */ '/@/views/progress-step/index.vue'),

    meta: {
      title: 'Progress Step'
    }
  },
  {
    path: '/rotating-navigation',
    name: 'rotating-navigation',
    component: () =>
      import(
        /** webpackChunkName: 'rotaing-navigation' */ '/@/views/rotating-navigation/index.vue'
      ),

    meta: {
      title: 'Rotating Navigation'
    }
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
