import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { createBuilding } from '../../services/building';
import { useNotification } from '../Notification';

interface BuildingCreateContextData {
  loading: boolean;
  createData(name: string): Promise<void>;
}

interface BuildingCreateContextProps {
  children: ReactNode;
}

const BuildingCreateContext = createContext<BuildingCreateContextData>(
  {} as BuildingCreateContextData
);

const BuildingCreateProvider: FC<BuildingCreateContextProps> = ({
  children,
}: BuildingCreateContextProps) => {
  const [loading, setLoading] = useState(false);
  const { error, success } = useNotification();

  const createData = useCallback(async name => {
    try {
      setLoading(true);
      await createBuilding(name);
      success({ message: 'Prédio inserido com suceso' });
    } catch (e) {
      if (e?.response?.status === 400) {
        error({
          title: 'Dados inválidos',
          message: 'Favor, revalide os dados e tente novamente',
        });
      } else {
        error({
          message: [
            'Ops, algo de errado aconteceu',
            'Tente novamente mais tarde',
          ],
          title: 'Erro inesperado',
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <BuildingCreateContext.Provider value={{ loading, createData }}>
      {children}
    </BuildingCreateContext.Provider>
  );
};

export function useBuildingCreate(): BuildingCreateContextData {
  const context = useContext(BuildingCreateContext);

  if (!context) {
    throw new Error(
      'useBuildingCreate must be used within a ListGroupProvider'
    );
  }

  return context;
}

export default BuildingCreateProvider;
