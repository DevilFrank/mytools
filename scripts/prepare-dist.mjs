import { cpSync, existsSync, lstatSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, '.output/public')
const distDir = resolve(root, 'dist')

if (!existsSync(publicDir)) {
  throw new Error('Missing .output/public. Run nuxt generate before preparing dist.')
}

if (existsSync(distDir)) {
  const stat = lstatSync(distDir)
  rmSync(distDir, { recursive: stat.isDirectory(), force: true })
}

cpSync(publicDir, distDir, { recursive: true })

console.log('Prepared static output in dist/')
