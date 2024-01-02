'use client';

import axios, { getAxiosClientWithInterceptor } from '@/lib/axios';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useLayoutEffect, useState } from 'react';

type SessionContexProps = {
  data?: {
    user: {
      id: string;
      username: string;
      fullName: string;
    };
    expires: string;
  } | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  updateSession: () => void;
  axiosClient: AxiosInstance;
};

type SessionInfo = {
  data?: {
    user: {
      id: string;
      username: string;
      fullName: string;
    };
    expires: string;
  } | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};

const InitialSessionContext: SessionContexProps = {
  status: 'unauthenticated',
  axiosClient: axios,
  updateSession: () => {},
};

const SessionContex = createContext<SessionContexProps>(InitialSessionContext);

async function getSession(): Promise<SessionInfo> {
  try {
    const response = await axios.get('/api/session');
    const { session }: { session: SessionContexProps } = response.data;

    return { status: session.status, data: session.data };
  } catch (err: unknown) {
    return { status: 'unauthenticated' };
  }
}

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SessionContexProps['status']>('loading');
  const [data, setData] = useState<SessionContexProps['data']>();
  const router = useRouter();

  const fetchSessionData = async () => {
    if (status !== 'authenticated') setStatus('loading');

    let session = await getSession();

    setStatus(session.status);
    setData(session.data);
  };

  const useAxiosClient = () => {
    return getAxiosClientWithInterceptor(fetchSessionData, router);
  };

  useLayoutEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <SessionContex.Provider value={{ data, status, updateSession: fetchSessionData, axiosClient: useAxiosClient() }}>
      {children}
    </SessionContex.Provider>
  );
}

function useSession() {
  const context = useContext(SessionContex);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return {
    status: context.status,
    user: context.data?.user,
    updateSession: context.updateSession,
    axios: context.axiosClient,
  };
}

export { SessionProvider, useSession, getSession };
