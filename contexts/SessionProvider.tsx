'use client';

import { UserType, UserSchema } from '@/types/User';
import axios from '@/lib/axios';
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
      const result = await axios.get('/api/me');

      setUser(UserSchema.parse(result.data.user));
    } catch (err: unknown) {
      // console.error(err);
      setUser(null);
    }
  };

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getUser();
      setIsLoading(false);
    })();
  }, []);

  return { user, isLoading };
}

export { SessionProvider, useSession };
