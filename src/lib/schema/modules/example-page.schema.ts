import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import { webPageSchema } from './shared'

export function examplePageSchema(params: {
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { url, title, description } = params
  return [
    webPageSchema({ url, title, description }),
    {
      '@type': 'Course',
      '@id': `${url}/#course`,
      name: `Example Page`,
      description,
      url,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
      provider: { '@id': `${configSite.url}/#organization` },
      isPartOf: { '@id': `${configSite.url}/example/#webpage` },
    },
    {
      '@type': 'LearningResource',
      '@id': `${url}/#learning-resource`,
      name: title,
      description,
      url,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      isPartOf: { '@id': `${url}/#course` },
    },
  ]
}
