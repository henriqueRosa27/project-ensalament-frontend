import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import BuildingModel from '../../models/Building';
import { getBuildingById } from '../../services/building';
import { useNotification } from '../Notification';

interface BuildingByIdContextData {
  loading: boolean;
  data: BuildingModel;
  loadData(id: string): Promise<void>;
}

interface BuildingByIdContextProps {
  children: ReactNode;
}

const BuildingByIdContext = createContext<BuildingByIdContextData>(
  {} as BuildingByIdContextData
);

const BuildingByIdProvider: FC<BuildingByIdContextProps> = ({
  children,
}: BuildingByIdContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BuildingModel>({} as BuildingModel);
  const { error } = useNotification();

  const loadData = useCallback(async id => {
    try {
      setLoading(true);
      const buildingData = await getBuildingById(id);
      setData(buildingData);
    } catch (e) {
      error({ message: 'Algo deu errado ao buscar dados' });
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <BuildingByIdContext.Provider value={{ loading, loadData, data }}>
      {children}
    </BuildingByIdContext.Provider>
  );
};

export function useBuildingById(): BuildingByIdContextData {
  const context = useContext(BuildingByIdContext);

  if (!context) {
    throw new Error('useBuildingById must be used within a ListGroupProvider');
  }

  return context;
}

export default BuildingByIdProvider;
