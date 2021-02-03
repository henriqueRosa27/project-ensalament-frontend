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
  const { error } = useNotification();

  const createData = useCallback(async name => {
    try {
      setLoading(true);
      await createBuilding(name);
    } catch (e) {
      error('Algo deu errado ao inserir dados');
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
