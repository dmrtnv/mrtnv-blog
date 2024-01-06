import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from '@/contexts/SessionProvider';
import { PostsProvider } from '@/contexts/PostsProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <SessionProvider>
        <PostsProvider>{children}</PostsProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default Providers;
