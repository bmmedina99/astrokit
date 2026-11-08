import type { PageSlug } from '@/lib/routes'
import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'

export const PAGE_LABELS: Record<PageSlug, string> = {
  contact: 'Contacto',
  search: 'Busqueda',
}

export function webPageSchema(params: {
  url: string
  title: string
  description?: string
  type?: 'WebPage' | 'CollectionPage'
}): SchemaBase {
  const { url, title, description, type = 'WebPage' } = params
  return {
    '@type': type,
    '@id': `${url}/#webpage`,
    url: url,
    name: title,
    ...(description && { description }),
    inLanguage: configSite.lang,
    isPartOf: { '@id': `${configSite.url}/#website` },
  }
}
