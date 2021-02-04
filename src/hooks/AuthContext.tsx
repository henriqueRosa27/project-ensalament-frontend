import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

import UserModel from '../models/User';
import { api } from '../services/api';

interface AuthState {
  token: string;
  user: UserModel;
}

interface SyncData {
  token: string;
  user: UserModel;
}

interface AuthContextData {
  user: UserModel;
  loading: boolean;
  signIn(credentials: SyncData): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        setData({ token, user: JSON.parse(user) });
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ user, token }) => {
    try {
      setLoading(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setData({ token, user });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    delete api.defaults.headers.Authorization;

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export default AuthProvider;
