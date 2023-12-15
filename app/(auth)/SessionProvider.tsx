'use client';

import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

type SessionContexProps = {
  data?: {
    user: {
      id: string;
      username: string;
    };
    expires: string;
  } | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};

const InitialSessionContext: SessionContexProps = {
  status: 'authenticated',
};

const SessionContex = createContext<SessionContexProps>(InitialSessionContext);

async function getSession(): Promise<SessionContexProps> {
  try {
    const response = await axios.get('/api/session');
    const { session }: { session: SessionContexProps } = response.data;
    console.log(session);

    return { status: session.status, data: session.data };
  } catch (err: unknown) {
    return { status: 'unauthenticated' };
  }
}

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SessionContexProps['status']>('loading');
  const [data, setData] = useState<SessionContexProps['data']>();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSessionData = async () => {
      if (status !== 'authenticated') setStatus('loading');

      const { status: sessionStatus, data } = await getSession();

      setStatus(sessionStatus);
      setData(data);
    };

    fetchSessionData();
  }, [pathname]);

  return <SessionContex.Provider value={{ data, status }}>{children}</SessionContex.Provider>;
}

function useSession() {
  const contex = useContext(SessionContex);

  if (!contex) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return contex;
}

export { SessionProvider, useSession, getSession };
