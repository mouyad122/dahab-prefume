import { MetadataRoute } from 'next';
import { prisma } from '../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dahabperfume.com';

  const staticRoutes = [
    '',
    '/shop',
    '/collections',
    '/about',
    '/location',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/shop') ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.6,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    const products = await prisma.product.findMany({
      where: {
        visible: true,
        ready_for_storefront: true,
      },
      select: {
        slug: true,
        updated_at: true,
      },
    });

    productRoutes = products
      .filter((p) => p.slug)
      .map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updated_at,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error('Error generating product sitemap paths:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
