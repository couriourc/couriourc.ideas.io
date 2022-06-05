import type { App } from 'vue'
import { setupDirectiveWaves } from './waves'

// 设置全局指令
export function setupGlobDirectives(app: App) {
  setupDirectiveWaves(app)
}
