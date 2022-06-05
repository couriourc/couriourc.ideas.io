// autoImport.ts
import type { Plugin } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(compress: 'gzip' | 'brotli' | 'none'): Plugin | Plugin[] {
  const compressList = compress.split(',')

  const plugins: Plugin[] = []

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz'
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress'
      })
    )
  }
  return plugins
}
