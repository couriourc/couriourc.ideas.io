import { normalizePath } from 'vite'
import { parse } from 'svg-parser'
import { join, dirname, basename, resolve } from 'path'
import { readFileSync, writeFileSync, existsSync, mkdir } from 'fs'
function getSvgPath(source: string): string | undefined {
  return /^virtual-svg2d3:(.*)$/.exec(source)?.[1]
}
async function getSourcePath(id) {
  return await readFileSync(id, 'utf-8')
}
export function svg2d3() {
  let pathAlias: {}
  let curContent: string | null
  return {
    name: 'svg2obj',
    config(cf) {
      if (cf.resolve?.alias) {
        pathAlias = cf.resolve.alias
      }
    },
    async resolveId(id) {
      // 去确认使用模块
      let svgPath = getSvgPath(id)
      if (getSvgPath(id)) {
        Object.keys(pathAlias).forEach((key) => {
          svgPath = (svgPath as string).startsWith(key)
            ? svgPath?.replace(key, pathAlias[key])
            : svgPath
        })
        const filePath = join(process.cwd(), normalizePath(svgPath as string))
        curContent = await getSourcePath(filePath)
        const virtualFilePath = resolve(dirname(filePath), basename(filePath) + '.js')
        console.log(JSON.stringify(parse(curContent)))

        try {
          if (!existsSync(virtualFilePath)) {
            console.log(`export default JSON.parse(\`${JSON.stringify(parse(curContent))}\`)`)
            await writeFileSync(
              virtualFilePath,
              `export default ${JSON.stringify(parse(curContent))}`,
              {
                encoding: 'utf-8'
              }
            )
          }
        } catch (err) {}
        return virtualFilePath
      }
      curContent = null
    }
  }
}
