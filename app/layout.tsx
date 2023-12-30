import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Blog',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className='container max-w-4xl px-0'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
