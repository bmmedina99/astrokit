import { configSite } from '../site.config'

export type AppRoute = `/${string}`

export type PageSlug = 'contact' | 'search'

export function buildUrl(
  pathname: AppRoute,
  params: Record<string, string | undefined | null>,
): string {
  const url = new URL(pathname, configSite.url)

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value)
  }

  return `${url.pathname}${url.search}`
}
