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

interface BuildingByIdContextData {
  loading: boolean;
  data: BuildingModel;
  loadData(id: string, onError: () => void): Promise<void>;
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

  const loadData = useCallback(async (id, onError) => {
    try {
      setLoading(true);
      const buildingData = await getBuildingById(id);
      setData(buildingData);
    } catch (e) {
      onError();
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
