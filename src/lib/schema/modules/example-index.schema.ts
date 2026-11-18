import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import { webPageSchema } from './shared'

export function exampleIndexSchema(params: {
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { url, title, description } = params
  return [
    webPageSchema({ url, title, description, type: 'CollectionPage' }),
    {
      '@type': 'Course',
      '@id': `${url}/contact/#course`,
      name: `Ejemplo de contacto`,
      description:
        'Ejemplo de contacto, cambia el contenido de esta página para que se ajuste a tu sitio web.',
      url: `${url}/contact/`,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      provider: { '@id': `${configSite.url}/#organization` },
    },
    {
      '@type': 'Course',
      '@id': `${url}/search/#course`,
      name: `Ejemplo de busqueda`,
      description:
        'Ejemplo de busqueda, cambia el contenido de esta página para que se ajuste a tu sitio web.',
      url: `${url}/search/`,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      provider: { '@id': `${configSite.url}/#organization` },
    },
  ]
}
