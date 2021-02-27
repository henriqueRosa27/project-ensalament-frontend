import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { EnsalamentById } from '../../Models/Ensalament';
import { getEnsalamentByid } from '../../services/ensalament';
import { useNotification } from '../Notification';
import history from '../../routes/history';
import { useGlobals } from '../GlobalsContext';

interface EnsalamentByIdContextData {
  loading: boolean;
  data: EnsalamentById;
  loadData(id: string): Promise<void>;
}

interface EnsalamentByIdContextProps {
  children: ReactNode;
}

const EnsalamentByIdContext = createContext<EnsalamentByIdContextData>(
  {} as EnsalamentByIdContextData
);

const EnsalamentByIdProvider: FC<EnsalamentByIdContextProps> = ({
  children,
}: EnsalamentByIdContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EnsalamentById>({} as EnsalamentById);
  const { error } = useNotification();

  const { openBackdrop, closeBackdrop } = useGlobals();

  const loadData = useCallback(async id => {
    try {
      setLoading(true);
      openBackdrop();
      const ensalamentData = await getEnsalamentByid(id);
      setData(ensalamentData);
    } catch (e) {
      error({
        title: 'Erro ao buscar dado',
        message: 'Ensalamento não existe',
      });
      history.push('/');
    } finally {
      setLoading(false);
      closeBackdrop();
    }
  }, []);
  return (
    <EnsalamentByIdContext.Provider value={{ loading, loadData, data }}>
      {children}
    </EnsalamentByIdContext.Provider>
  );
};

export function useEnsalamentById(): EnsalamentByIdContextData {
  const context = useContext(EnsalamentByIdContext);

  if (!context) {
    throw new Error(
      'useEnsalamentById must be used within a ListGroupProvider'
    );
  }

  return context;
}

export default EnsalamentByIdProvider;
