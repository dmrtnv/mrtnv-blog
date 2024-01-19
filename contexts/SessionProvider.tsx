'use client';

import { UserType, UserSchema } from '@/types/User';
import api from '@/lib/api';
import { useContext, createContext, useState, useEffect } from 'react';

type SessionContextType = {
  user: UserType | null;
  getUser: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | null>(null);

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = async () => {
    try {
      const result = await api.get('/me');

      setUser(UserSchema.parse(result.data.user));
    } catch (err: unknown) {
      // console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getUser();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <SessionContext.Provider value={{ user, getUser }}>{children}</SessionContext.Provider>;
}

function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) throw Error('Use useSessionContext inside SessionProvider');

  return context;
}

function useSession() {
  const { user, getUser } = useSessionContext();
  const [isLoading, setIsLoading] = useState(true);

  const updateSession = async () => {
    setIsLoading(true);
    await getUser();
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!user) {
        await updateSession();
      }
      setIsLoading(false);
    })();
  }, []);

  return { user, isLoading, updateSession };
}

export { SessionProvider, useSession };
