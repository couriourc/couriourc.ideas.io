// index.ts
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import PkgConfig from 'vite-plugin-package-config'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { configCompressPlugin } from './compress'
import { ConfigMockPlugin } from './mock'
import { AutoImportDeps } from './autoImport'
import { configUnocss } from './unocss'
import vueJsx from '@vitejs/plugin-vue-jsx'

export function createVitePlugins() {
  const isBuild = process.env.NODE_ENV === 'production'

  const vitePlugins: (Plugin | Plugin[])[] = [
    configUnocss(),

    // vue支持
    vue(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 开启.gz压缩  rollup-plugin-gzip
    configCompressPlugin('gzip'),
    VueSetupExtend(),
    PkgConfig(),
    OptimizationPersist(),
    vueJsx() //tsx 支持
  ]

  // vite-plugin-mock
  vitePlugins.push(ConfigMockPlugin(isBuild))
  return vitePlugins
}

export default createVitePlugins
