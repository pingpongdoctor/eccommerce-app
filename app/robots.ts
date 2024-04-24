import { MetadataRoute } from 'next';
import { baseUrl } from './utils/baseUrl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/shopping-cart',
        '/product/:path*',
        '/order-history',
        '/checkout',
        '/category/:path*',
        '/blog/:path*',
      ],
      disallow: ['/admin/:path*', '/beta-page'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
