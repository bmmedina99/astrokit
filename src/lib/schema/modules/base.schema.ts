import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'

export const organizationSchema: SchemaBase = {
  '@type': 'Organization',
  '@id': `${configSite.url}/#organization`,
  name: configSite.name,
  url: configSite.url,
  logo: {
    '@type': 'ImageObject',
    url: `${configSite.url}/assets/images/astro-logo.webp`,
  },
}

export const websiteSchema: SchemaBase = {
  '@type': 'WebSite',
  '@id': `${configSite.url}/#website`,
  name: configSite.name,
  url: configSite.url,
  description: configSite.description,
  inLanguage: configSite.lang,
  publisher: { '@id': `${configSite.url}/#organization` },
}

export const softwareAppSchema: SchemaBase = {
  '@type': 'SoftwareApplication',
  '@id': `${configSite.url}/#app`,
  name: configSite.name,
  url: configSite.url,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  description: configSite.description,
  inLanguage: configSite.lang,
  isAccessibleForFree: true,
  publisher: { '@id': `${configSite.url}/#organization` },
}

export const baseSchemas: SchemaBase[] = [
  organizationSchema,
  websiteSchema,
  softwareAppSchema,
]
