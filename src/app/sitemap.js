import { prisma } from '../lib/prisma';

export default async function sitemap() {
  const baseUrl = 'https://dahabperfume.com';

  const staticRoutes = [
    '',
    '/shop',
    '/collections',
    '/about',
    '/contact',
    '/reviews',
    '/store-location',
    '/faq',
    '/shipping',
    '/returns',
    '/terms-and-conditions',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.6,
  }));

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { visible_on_website: true },
      select: { slug: true, updated_at: true },
    }),
    prisma.category.findMany({
      where: { is_active: true },
      select: { slug: true, updated_at: true },
    }),
  ]);

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updated_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/collections/${category.slug}`,
    lastModified: category.updated_at,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
