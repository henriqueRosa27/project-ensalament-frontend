import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

import { DataInterface } from '../../../Models/EnsalamentData';
import Building from '../../../Models/Building';
import { getBuildings } from '../../../services/ensalament';
import {
  FatherState,
  pushChildren,
  changeFatherState,
  pushChildrensByFatherId,
} from '../../helpers';
import { useNotification } from '../../Notification';

interface DataBuildingSelectsContextData {
  buildings: Building[];
  loading: boolean;
  data: DataInterface[];
  childrenSelecteds: string[];
  defaultExpanded: string[];
  fathersState: FatherState[];
  get: (week: number, shift: number) => Promise<void>;
  setDataSelectsChildren: (id: string) => void;
  setFatherSelectsChildren: (id: string) => void;
  clearChildren: () => void;
}

interface DataBuildingSelectsProviderProps {
  children: ReactNode;
}

const DataBuildingSelectsContext = createContext<
  DataBuildingSelectsContextData
>({} as DataBuildingSelectsContextData);

const DataCourseSelectsProvider: FC<DataBuildingSelectsProviderProps> = ({
  children,
}: DataBuildingSelectsProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataInterface[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [childrenSelecteds, setChildrenSelecteds] = useState<string[]>([]);
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>([]);
  const [fathersState, setFathersState] = useState<FatherState[]>([]);
  const { error } = useNotification();

  const setDataSelectsChildren = useCallback(
    id => {
      pushChildren(id, childrenSelecteds, setChildrenSelecteds);
    },
    [childrenSelecteds]
  );

  const clearChildren = useCallback(() => {
    setChildrenSelecteds([]);
  }, [childrenSelecteds]);

  useEffect(() => {
    changeFatherState(data, childrenSelecteds, fathersState, setFathersState);
  }, [childrenSelecteds]);

  function convertData(dataCourses: Building[]) {
    const dataConverted = dataCourses.map(value => {
      return {
        id: value.id!,
        name: value.name,
        children: value.rooms?.map(v => {
          return {
            id: v.id!,
            name: v.name,
            info: `${v.capacity} lugares`,
          };
        }),
      };
    });

    const defaultExpandedData = dataConverted.map(t => t.id);
    const stateFather: FatherState[] = dataConverted.map(t => ({
      id: t.id,
      state: 'none',
    }));

    setData(dataConverted);
    setDefaultExpanded(defaultExpandedData);
    setFathersState(stateFather);
  }

  const get = useCallback(async (week: number, shift: number) => {
    try {
      setLoading(true);
      const dataBuilding = await getBuildings(week, shift);
      setBuildings(dataBuilding);
      convertData(dataBuilding);
    } catch (e) {
      error({ message: 'Ops, algum erro ocorreu ao buscar as salas' });
    } finally {
      setLoading(false);
    }
  }, []);

  const setFatherSelectsChildren = useCallback(
    id => {
      pushChildrensByFatherId(
        id,
        data,
        fathersState,
        childrenSelecteds,
        setChildrenSelecteds
      );
    },
    [fathersState]
  );

  return (
    <DataBuildingSelectsContext.Provider
      value={{
        buildings,
        loading,
        data,
        childrenSelecteds,
        setDataSelectsChildren,
        defaultExpanded,
        get,
        setFatherSelectsChildren,
        fathersState,
        clearChildren,
      }}>
      {children}
    </DataBuildingSelectsContext.Provider>
  );
};

export function useBuildingDataSelects(): DataBuildingSelectsContextData {
  const context = useContext(DataBuildingSelectsContext);

  if (!context) {
    throw new Error('useAuth must be used within a SingUpProviderProps');
  }

  return context;
}

export default DataCourseSelectsProvider;
