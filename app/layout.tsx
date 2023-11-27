import type { Metadata } from 'next';
import { Catamaran, Cormorant_Infant } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import Navbar from '@/components/ui/NavBar';
import AuthProvider from '@/lib/context/AuthContext';
import { getServerSession } from 'next-auth';
import { Toaster } from '@/components/ui/toaster';

const catamaran = Catamaran({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-catamaran',
});

const cormorant = Cormorant_Infant({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://www.bitacorizky.com/'),
  title: {
    default: 'Bitacorikzy',
    template: '%s | Bitacorikzy',
  },
  description:
    'Sitio web para escribir y guardar tus pensamientos, ideas y reflexiones personales. Regístrate y comienza a plasmar tus pensamientos en Bitacorizky.',
  applicationName: 'Bitacorikzy',
  authors: [{ name: 'Izky', url: 'https://izky.dev/' }],
  keywords: ['Bitacora', 'fast writting', 'personal diary'],
  openGraph: {
    title: 'Bitacorikzy',
    description:
      'Sitio web para escribir y guardar tus pensamientos, ideas y reflexiones personales',
    url: 'https://www.bitacorizky.com/',
    siteName: 'Bitacorikzy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'public/izky.png',
        width: 800,
        height: 600,
        alt: 'Imagen de izky',
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${catamaran.variable} ${cormorant.variable} font-catamaran`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
