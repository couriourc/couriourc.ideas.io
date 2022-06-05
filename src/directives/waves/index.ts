import type { App } from 'vue'
import waves from './waves'

export function setupDirectiveWaves(app: App) {
  app.directive('waves', waves)
}
