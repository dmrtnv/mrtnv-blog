import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from '@/contexts/SessionProvider';
import { QueryProvider } from '@/contexts/QueryProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <SessionProvider>
        <QueryProvider>{children}</QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default Providers;
