import type { AppRoute } from '../core'

export const publicRoutes = {
  home: (): AppRoute => '/',
} as const

export const publicRoutesLabels: Record<string, string> = {
  '/': 'Inicio',
}
