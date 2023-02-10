import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { Router } from 'vue-router'
import { setupL2dWidget } from '/@/util/L2dWidgets'

export function setupBeforeEachGuard(router: Router): void {
  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      window.logger.info('now is:', to.path, from.path)
      next()
    }
  )
  router.afterEach((to: RouteLocationNormalized, _: RouteLocationNormalized) => {
    document.title = (to.meta['title'] || '50 Project') as string
    if (!window.__SETUPED_L2DWidge as boolean) {
      setupL2dWidget()
      window.__SETUPED_L2DWidge = true
    }
  })
}
