export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/login', '/admin/products', '/admin/inventory', '/admin/orders'],
    },
    sitemap: 'https://dahabperfume.com/sitemap.xml',
  };
}
