import { describe, expect, it } from 'vitest'
import { routeLabels, routes } from '..'
import { buildUrl } from '../core'

describe('routes', () => {
  it('returns the home route', () => {
    expect(routes.home()).toBe('/')
  })

  it('returns example routes with trailing slashes', () => {
    expect(routes.example.index()).toBe('/example/')
    expect(routes.example.page('contact')).toBe('/example/contact/')
    expect(routes.example.page('search')).toBe('/example/search/')
  })

  it('supports additional example page slugs', () => {
    expect(routes.example.page('about')).toBe('/example/about/')
  })
})

describe('buildUrl', () => {
  it('builds a path without a query string when no params are provided', () => {
    expect(buildUrl('/example/', {})).toBe('/example/')
  })

  it('encodes query params and omits nullish values', () => {
    expect(
      buildUrl('/example/search/', {
        query: 'hiragana katakana',
        empty: '',
        omitted: undefined,
        alsoOmitted: null,
      }),
    ).toBe('/example/search/?query=hiragana+katakana&empty=')
  })
})

describe('routeLabels', () => {
  it('labels the home and example routes', () => {
    expect(routeLabels['/']).toBe('Inicio')
    expect(routeLabels['/example/']).toBe('Example')
    expect(routeLabels['/example/contact/']).toBe('Contacto')
    expect(routeLabels['/example/search/']).toBe('Busqueda')
  })
})
