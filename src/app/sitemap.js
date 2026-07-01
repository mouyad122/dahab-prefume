import { initialProducts } from '../data/initialProducts';

export default function sitemap() {
  const baseUrl = 'https://dahabperfume.com';

  // Public static routes
  const staticRoutes = [
    '',
    '/shop',
    '/collections',
    '/collections/hair-mists',
    '/collections/private-collection',
    '/collections/middle-eastern',
    '/about',
    '/contact',
    '/reviews',
    '/store-location',
    '/faq',
    '/shipping',
    '/returns',
    '/terms-and-conditions',
    '/privacy-policy',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.6,
  }));

  // Dynamic product routes
  const productRoutes = initialProducts.map(p => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
