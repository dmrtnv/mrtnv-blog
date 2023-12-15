import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from './(auth)/SessionProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}

export default Providers;
