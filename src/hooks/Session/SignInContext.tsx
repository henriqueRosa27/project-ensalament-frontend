import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react';
import jwtDecode from 'jwt-decode';

import { useAuth } from '../AuthContext';
import signInService from '../../services/session';
import { api } from '../../services/api';
import history from '../../routes/history';
import { useNotification } from '../Notification';

interface SignInData {
  email: string;
  password: string;
}

interface SignInContextData {
  loading: boolean;
  signIn(credentials: SignInData): Promise<void>;
}

interface SignInProviderProps {
  children: ReactNode;
}

const SignInContext = createContext<SignInContextData>({} as SignInContextData);

export const SignInProvider: React.FC<SignInProviderProps> = ({
  children,
}: SignInProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { signIn: signInAuthConext } = useAuth();
  const { error } = useNotification();

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);

      const { token } = await signInService({ email, password });
      const dataJwt: string = jwtDecode(token);
      const { user }: any = dataJwt;

      await signInAuthConext({ user, token });

      api.defaults.headers.Authorization = `Bearer ${token}`;

      history.push('/');
    } catch (e) {
      if (e?.response?.status === 400) {
        if (!e?.response?.data?.message) {
          error({ title: 'Dados inválidos', message: e.response.data.error });
        } else {
          error({
            title: 'Dados inválidos',
            message: 'Favor, revalide os dados e tente novamente',
          });
        }
      } else {
        error({
          message: 'Ops, algo de errado aconteceu',
          title: 'Erro inesperado',
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SignInContext.Provider
      value={{
        loading,
        signIn,
      }}>
      {children}
    </SignInContext.Provider>
  );
};

export function useSignIn(): SignInContextData {
  const context = useContext(SignInContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export default SignInProvider;
