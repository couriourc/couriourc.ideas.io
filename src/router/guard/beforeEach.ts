import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { Router } from 'vue-router'
export function setupBeforeEachGuard(router: Router): void {
  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      window.logger.info('now is:', to.path, from.path)
      next()
    }
  )
}
