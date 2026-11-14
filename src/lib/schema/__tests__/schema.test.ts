import { describe, expect, it } from 'vitest'
import { configSite } from '../../site.config'
import {
  baseSchemas,
  buildJsonLd,
  composeSchemas,
  exampleIndexSchema,
  examplePageSchema,
  homepageSchema,
  organizationSchema,
  softwareAppSchema,
  websiteSchema,
} from '..'

describe('base schemas', () => {
  it('defines the site organization, website, and application', () => {
    expect(organizationSchema).toMatchObject({
      '@type': 'Organization',
      '@id': `${configSite.url}/#organization`,
      name: configSite.name,
      url: configSite.url,
      logo: {
        '@type': 'ImageObject',
        url: `${configSite.url}/assets/images/astro-logo.webp`,
      },
    })

    expect(websiteSchema).toMatchObject({
      '@type': 'WebSite',
      '@id': `${configSite.url}/#website`,
      name: configSite.name,
      description: configSite.description,
      inLanguage: configSite.lang,
      publisher: { '@id': `${configSite.url}/#organization` },
    })

    expect(softwareAppSchema).toMatchObject({
      '@type': 'SoftwareApplication',
      '@id': `${configSite.url}/#app`,
      operatingSystem: 'Web',
      isAccessibleForFree: true,
    })
  })

  it('exports the three base schemas with unique canonical IDs', () => {
    expect(baseSchemas.map((schema) => schema['@type'])).toEqual([
      'Organization',
      'WebSite',
      'SoftwareApplication',
    ])

    const ids = baseSchemas.map((schema) => schema['@id'])
    expect(new Set(ids).size).toBe(baseSchemas.length)
    expect(
      ids.every(
        (id) => typeof id === 'string' && id.startsWith(configSite.url),
      ),
    ).toBe(true)
  })
})

describe('page schemas', () => {
  const exampleIndexUrl = `${configSite.url}/example`
  const exampleContactUrl = `${exampleIndexUrl}/contact`

  it('creates the homepage web page and app relationship', () => {
    expect(
      homepageSchema({
        url: configSite.url,
        title: 'Inicio',
        description: configSite.description,
      }),
    ).toMatchObject([
      {
        '@type': 'WebPage',
        '@id': `${configSite.url}/#webpage`,
        url: configSite.url,
        name: 'Inicio',
        specialCommitments: 'FreeToUse',
        mainEntity: { '@id': `${configSite.url}/#app` },
      },
    ])
  })

  it('creates a collection page with its example courses', () => {
    expect(
      exampleIndexSchema({
        url: exampleIndexUrl,
        title: 'Ejemplos',
        description: 'Páginas de ejemplo',
      }),
    ).toMatchObject([
      {
        '@type': 'CollectionPage',
        '@id': `${exampleIndexUrl}/#webpage`,
        name: 'Ejemplos',
      },
      {
        '@type': 'Course',
        '@id': `${exampleIndexUrl}/contact/#course`,
        url: `${exampleIndexUrl}/contact/`,
      },
      {
        '@type': 'Course',
        '@id': `${exampleIndexUrl}/search/#course`,
        url: `${exampleIndexUrl}/search/`,
      },
    ])
  })

  it('creates a page, course, and learning resource for an example page', () => {
    expect(
      examplePageSchema({
        url: exampleContactUrl,
        title: 'Contacto',
        description: 'Ejemplo de página de contacto',
      }),
    ).toMatchObject([
      {
        '@type': 'WebPage',
        '@id': `${exampleContactUrl}/#webpage`,
        name: 'Contacto',
      },
      {
        '@type': 'Course',
        '@id': `${exampleContactUrl}/#course`,
        isPartOf: { '@id': `${configSite.url}/example/#webpage` },
      },
      {
        '@type': 'LearningResource',
        '@id': `${exampleContactUrl}/#learning-resource`,
        isPartOf: { '@id': `${exampleContactUrl}/#course` },
      },
    ])
  })
})

describe('schema composition', () => {
  it('combines base, page, and automatically generated breadcrumb schemas', () => {
    const composed = composeSchemas({
      url: `${configSite.url}/example/contact`,
      title: 'Contacto',
      description: 'Ejemplo',
      schemas: examplePageSchema({
        url: `${configSite.url}/example/contact`,
        title: 'Contacto',
        description: 'Ejemplo',
      }),
    })

    expect(composed.map((schema) => schema['@type'])).toEqual([
      'Organization',
      'WebSite',
      'SoftwareApplication',
      'WebPage',
      'Course',
      'LearningResource',
      'BreadcrumbList',
    ])
  })

  it('honors explicit breadcrumb items and supports disabling breadcrumbs', () => {
    const explicitBreadcrumbs = [
      { name: 'Inicio', url: `${configSite.url}/` },
      { name: 'Custom', url: `${configSite.url}/custom/` },
    ]

    expect(
      composeSchemas({
        url: `${configSite.url}/custom`,
        title: 'Custom',
        schemas: [],
        breadcrumbs: explicitBreadcrumbs,
      }).at(-1),
    ).toMatchObject({
      '@type': 'BreadcrumbList',
      itemListElement: [{ position: 1 }, { position: 2, name: 'Custom' }],
    })

    expect(
      composeSchemas({
        url: `${configSite.url}/custom`,
        title: 'Custom',
        breadcrumbs: false,
      }),
    ).toHaveLength(baseSchemas.length)
  })

  it('wraps composed schemas in JSON-LD format', () => {
    const jsonLd = buildJsonLd({
      url: configSite.url,
      title: 'Inicio',
      breadcrumbs: false,
    })

    expect(jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@graph': baseSchemas,
    })
  })
})
