// vitePlugins.ts
import { viteMockServe } from 'vite-plugin-mock' // ++

export function ConfigMockPlugin(isBuild) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    // 实际开发关闭
    prodEnabled: false,
    injectCode: `
            import { setupProdMockServer } from '../mock/_createProductionServer';
            setupProdMockServer();
        `
  })
}
