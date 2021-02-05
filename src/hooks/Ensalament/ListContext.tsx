import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { EnsalementResponse } from '../../Models/Ensalament';
import { getEnsalaments } from '../../services/ensalament';
import { useNotification } from '../Notification';

interface EnsalamentListContextData {
  loading: boolean;
  data: EnsalementResponse[];
  loadData(): Promise<void>;
}

interface EnsalamentListContextProps {
  children: ReactNode;
}

const EnsalamentListContext = createContext<EnsalamentListContextData>(
  {} as EnsalamentListContextData
);

const EnsalamentListProvider: FC<EnsalamentListContextProps> = ({
  children,
}: EnsalamentListContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EnsalementResponse[]>([]);
  const { error } = useNotification();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const ensalamentData = await getEnsalaments();
      setData(ensalamentData);
    } catch (e) {
      error({ message: 'Algo deu errado ao buscar dados' });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <EnsalamentListContext.Provider value={{ loading, loadData, data }}>
      {children}
    </EnsalamentListContext.Provider>
  );
};

export function useEnsalamentList(): EnsalamentListContextData {
  const context = useContext(EnsalamentListContext);

  if (!context) {
    throw new Error(
      'useEnsalamentList must be used within a ListGroupProvider'
    );
  }

  return context;
}

export default EnsalamentListProvider;
