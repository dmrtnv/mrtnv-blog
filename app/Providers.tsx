import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from '@/contexts/SessionProvider';
import { PostsProvider } from '@/contexts/PostsProvider';
import { QueryProvider } from '@/contexts/QueryProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <SessionProvider>
        <QueryProvider>
          <PostsProvider>{children}</PostsProvider>
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default Providers;
