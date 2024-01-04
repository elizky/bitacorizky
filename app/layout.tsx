import type { Metadata } from 'next';
import { Catamaran, Cormorant_Infant } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import Navbar from '@/components/NavBar';
import AuthProvider from '@/lib/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { en } from '@/lib/texts/en';

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
  metadataBase: new URL(en.metadata.url),
  title: {
    template: en.metadata.template,
    default: en.metadata.title,
  },
  description: en.metadata.description,
  applicationName: en.metadata.title,
  authors: [{ name: en.metadata.author.name, url: en.metadata.author.url }],
  keywords: en.metadata.keywords,
  openGraph: {
    title: en.metadata.title,
    description: en.metadata.descriptionShort,
    url: en.metadata.url,
    siteName: en.metadata.title,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'opengraph-image.png',
        width: 800,
        height: 600,
        alt: 'opengraph-image.alt.txt',
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
