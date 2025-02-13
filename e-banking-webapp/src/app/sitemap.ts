import { MetadataRoute } from 'next';
import { ROUTES } from '@/constants';

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.SIGN_IN}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${ROUTES.SIGN_UP}`,
      lastModified: new Date(),
    },
  ];
};

export default sitemap;
