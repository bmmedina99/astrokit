import type { AppRoute, PageSlug } from '../core'

const BASE = '/example'

export const exampleRoutes = {
  index: (): AppRoute => `${BASE}/`,
  page: (page: PageSlug | string): AppRoute => `${BASE}/${page}/`,
} as const

export const exampleRoutesLabels: Record<string, string> = {
  '/example/': 'Example',
  '/example/contact/': 'Contacto',
  '/example/search/': 'Busqueda',
}
