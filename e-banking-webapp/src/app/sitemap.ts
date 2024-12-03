import { MetadataRoute } from 'next';
import { ROUTES } from '@/constants';

export const sitemap = (): MetadataRoute.Sitemap => {
  const paths = Object.values(ROUTES);

  return paths.map((path) => ({
    url: `${process.env.NEXT_PUBLIC_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));
};

export default sitemap;
