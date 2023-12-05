import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bitacorikzy',
    short_name: 'Bitacorikzy',
    description:
      'Sitio web para escribir y guardar tus pensamientos, ideas y reflexiones personales. Regístrate y comienza a plasmar tus pensamientos en Bitacorizky.',
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
