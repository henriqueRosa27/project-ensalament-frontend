import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import BuildingModel from '../../models/Building';
import { getBuildings } from '../../services/building';
import { useNotification } from '../Notification';

interface BuildingListContextData {
  loading: boolean;
  data: BuildingModel[];
  loadData(): Promise<void>;
}

interface BuildingListContextProps {
  children: ReactNode;
}

const BuildingListContext = createContext<BuildingListContextData>(
  {} as BuildingListContextData
);

const BuildingListProvider: FC<BuildingListContextProps> = ({
  children,
}: BuildingListContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BuildingModel[]>([]);
  const { error } = useNotification();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const buildingData = await getBuildings();
      setData(buildingData);
    } catch (e) {
      error('Algo deu errado ao buscar dados');
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <BuildingListContext.Provider value={{ loading, loadData, data }}>
      {children}
    </BuildingListContext.Provider>
  );
};

export function useBuildingList(): BuildingListContextData {
  const context = useContext(BuildingListContext);

  if (!context) {
    throw new Error('useListBuilding must be used within a ListGroupProvider');
  }

  return context;
}

export default BuildingListProvider;
