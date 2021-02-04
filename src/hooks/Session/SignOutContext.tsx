import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react';

import { useAuth } from '../AuthContext';
import { api } from '../../services/api';
import history from '../../routes/history';

interface SignOutContextData {
  loading: boolean;
  signOut(): void;
}

interface SignOutProviderProps {
  children: ReactNode;
}

const SignOutContext = createContext<SignOutContextData>(
  {} as SignOutContextData
);

export const SignOutProvider: React.FC<SignOutProviderProps> = ({
  children,
}: SignOutProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { signOut: signOutAuthConext } = useAuth();

  const signOut = useCallback(() => {
    try {
      setLoading(true);

      signOutAuthConext();

      delete api.defaults.headers.Authorization;

      history.push('/login');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SignOutContext.Provider
      value={{
        loading,
        signOut,
      }}>
      {children}
    </SignOutContext.Provider>
  );
};

export function useSignOut(): SignOutContextData {
  const context = useContext(SignOutContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export default SignOutProvider;
