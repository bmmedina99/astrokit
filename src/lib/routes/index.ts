import { exampleRoutes, exampleRoutesLabels } from './modules/example'
import { publicRoutes, publicRoutesLabels } from './modules/public'

export const routes = {
  ...publicRoutes,
  example: exampleRoutes,
} as const

export const routeLabels: Record<string, string> = {
  ...publicRoutesLabels,
  ...exampleRoutesLabels,
}

export type { PageSlug } from './core'
