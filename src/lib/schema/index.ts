export type { BreadcrumbItem, PageSchemaContext, SchemaBase } from './core'
export {
  baseSchemas,
  organizationSchema,
  softwareAppSchema,
  websiteSchema,
} from './modules/base.schema'
export {
  buildBreadcrumbItems,
  buildBreadcrumbSchema,
  getBreadcrumbSchema,
  shouldHaveBreadcrumbs,
} from './modules/breadcrumbs'
export { buildJsonLd, composeSchemas } from './modules/composer'
export { exampleIndexSchema } from './modules/example-index.schema'
export { examplePageSchema } from './modules/example-page.schema'
export { homepageSchema } from './modules/home.schema'
