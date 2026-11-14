import { describe, expect, it } from 'vitest'
import { configSite } from '../../site.config'
import {
  buildBreadcrumbItems,
  buildBreadcrumbSchema,
  getBreadcrumbSchema,
  shouldHaveBreadcrumbs,
} from '..'

const EXAMPLE_CONTACT_URL = `${configSite.url}/example/contact`

describe('shouldHaveBreadcrumbs', () => {
  it.each(['/', ''])('returns false for the root path "%s"', (path) => {
    expect(shouldHaveBreadcrumbs(path)).toBe(false)
  })

  it.each(['/example/', '/example/contact/'])(
    'returns true for a non-root path "%s"',
    (path) => {
      expect(shouldHaveBreadcrumbs(path)).toBe(true)
    },
  )
})

describe('buildBreadcrumbItems', () => {
  it('builds a breadcrumb for each path segment using canonical URLs', () => {
    expect(buildBreadcrumbItems(EXAMPLE_CONTACT_URL)).toEqual([
      { name: 'Inicio', url: `${configSite.url}/` },
      { name: 'Example', url: `${configSite.url}/example/` },
      { name: 'Contacto', url: `${configSite.url}/example/contact/` },
    ])
  })

  it('uses the same canonical URLs when the input has a trailing slash', () => {
    expect(buildBreadcrumbItems(`${EXAMPLE_CONTACT_URL}/`)).toEqual(
      buildBreadcrumbItems(EXAMPLE_CONTACT_URL),
    )
  })

  it('falls back to capitalized labels for unregistered segments', () => {
    const items = buildBreadcrumbItems(
      `${configSite.url}/resources/basic-guide`,
    )

    expect(items.slice(1).map((item) => item.name)).toEqual([
      'Resources',
      'Basic-guide',
    ])
  })
})

describe('breadcrumb schema', () => {
  it('builds ordered ListItem entries', () => {
    expect(
      buildBreadcrumbSchema([
        { name: 'Inicio', url: `${configSite.url}/` },
        { name: 'Example', url: `${configSite.url}/example/` },
      ]),
    ).toMatchObject({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: `${configSite.url}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Example',
          item: `${configSite.url}/example/`,
        },
      ],
    })
  })

  it('omits breadcrumbs for the site root', () => {
    expect(getBreadcrumbSchema(configSite.url)).toBeNull()
  })

  it('creates breadcrumbs for nested page URLs', () => {
    expect(getBreadcrumbSchema(EXAMPLE_CONTACT_URL)).toMatchObject({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { position: 1, name: 'Inicio', item: `${configSite.url}/` },
        { position: 2, name: 'Example', item: `${configSite.url}/example/` },
        {
          position: 3,
          name: 'Contacto',
          item: `${configSite.url}/example/contact/`,
        },
      ],
    })
  })
})
