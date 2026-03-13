import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/inventory-app/api/', '/inventory-app/settings/'],
    },
    sitemap: 'https://www.build2click.in/sitemap.xml',
  }
}
