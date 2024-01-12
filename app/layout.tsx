import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@uploadthing/react/styles.css';
import Header from '@/components/Header';
import Providers from './Providers';
import { ScrollArea } from '@/components/ui/scroll-area';

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
          <div className='flex h-screen w-full flex-col'>
            <Header />
            <ScrollArea className='flex-grow-1'>
              <main className='mx-auto my-2 flex max-w-5xl flex-col gap-2 px-0'>{children}</main>
            </ScrollArea>
          </div>
        </Providers>
      </body>
    </html>
  );
}
