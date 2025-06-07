import { ROUTES } from '@/constants';
import { MetadataRoute } from 'next';

export const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: [ROUTES.SIGN_IN, ROUTES.SIGN_UP],
    disallow: [
      ROUTES.HOME,
      ROUTES.ANALYTICS,
      ROUTES.TRANSACTIONS,
      ROUTES.PROFILE,
      ROUTES.GENERAL,
      ROUTES.ACCOUNT,
    ],
  },
  sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
});

export default robots;
