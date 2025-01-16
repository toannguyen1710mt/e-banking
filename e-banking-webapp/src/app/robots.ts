import { MetadataRoute } from 'next';

export const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${process.env.NEXT_PUBLIC_API_URL}/sitemap.xml`,
});

export default robots;
