import { MetadataRoute } from 'next';
import { ROUTES } from '@/constants';
import { formatLastModified } from '@/utils';

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.SIGN_IN}`,
      lastModified: formatLastModified(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.SIGN_UP}`,
      lastModified: formatLastModified(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];
};

export default sitemap;
