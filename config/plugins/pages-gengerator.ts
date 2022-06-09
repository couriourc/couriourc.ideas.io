import Pages from 'vite-plugin-pages'

export function ConfigPagesPlugin() {
  return Pages({
    dirs: [{ dir: 'src/views', baseRoute: '' }],
    importMode: 'async'
    // 实际开发关闭
  })
}
