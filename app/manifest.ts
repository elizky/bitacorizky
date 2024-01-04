import { en } from '@/lib/texts/en';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: en.metadata.title,
    short_name: en.metadata.title,
    description: en.metadata.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0b0a',
    theme_color: '#0d0b0a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
