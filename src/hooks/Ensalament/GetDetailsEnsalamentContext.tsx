import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { EnsalamentDetail } from '../../Models/Ensalament';
import { getEnsalamentDetails } from '../../services/ensalament';
import { useNotification } from '../Notification';
import history from '../../routes/history';
import { useGlobals } from '../GlobalsContext';

interface EnsalamentDetailsContextData {
  loading: boolean;
  data: EnsalamentDetail;
  loadData(): Promise<void>;
}

interface EnsalamentDetailsContextProps {
  children: ReactNode;
}

const EnsalamentDetailsContext = createContext<EnsalamentDetailsContextData>(
  {} as EnsalamentDetailsContextData
);

const EnsalamentDetailsProvider: FC<EnsalamentDetailsContextProps> = ({
  children,
}: EnsalamentDetailsContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EnsalamentDetail>({} as EnsalamentDetail);
  const { error } = useNotification();

  const { openBackdrop, closeBackdrop } = useGlobals();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      openBackdrop();
      const ensalamentData = await getEnsalamentDetails();
      setData(ensalamentData);
    } catch (e) {
      error({
        title: 'Erro ao buscar dado',
        message: 'Erro ao buscar ensalamentos',
      });
      history.push('/');
    } finally {
      setLoading(false);
      closeBackdrop();
    }
  }, []);
  return (
    <EnsalamentDetailsContext.Provider value={{ loading, loadData, data }}>
      {children}
    </EnsalamentDetailsContext.Provider>
  );
};

export function useEnsalamentDetails(): EnsalamentDetailsContextData {
  const context = useContext(EnsalamentDetailsContext);

  if (!context) {
    throw new Error(
      'useEnsalamentDetails must be used within a ListGroupProvider'
    );
  }

  return context;
}

export default EnsalamentDetailsProvider;
