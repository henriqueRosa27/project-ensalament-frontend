import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

import { DataInterface } from '../models/EnsalamentData';
import Course from '../models/Course';
import { getCourses } from '../services/ensalament';
import {
  FatherState,
  pushChildren,
  changeFatherState,
  pushChildrensByFatherId,
} from './helpers';

interface DataCourseSelectsContextData {
  courses: Course[];
  loading: boolean;
  data: DataInterface[];
  childrenSelecteds: string[];
  defaultExpanded: string[];
  fathersState: FatherState[];
  get: (week: number, shift: number) => void;
  setDataSelectsChildren: (id: string) => void;
  setFatherSelectsChildren: (id: string) => void;
}

interface DataCourseSelectsProviderProps {
  children: ReactNode;
}

const DataCourseSelectsContext = createContext<DataCourseSelectsContextData>(
  {} as DataCourseSelectsContextData
);

const DataCourseSelectsProvider: FC<DataCourseSelectsProviderProps> = ({
  children,
}: DataCourseSelectsProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [data, setData] = useState<DataInterface[]>([]);
  const [childrenSelecteds, setChildrenSelecteds] = useState<string[]>([]);
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>([]);
  const [fathersState, setFathersState] = useState<FatherState[]>([]);

  function convertData(dataCourses: Course[]) {
    const dataConverted = dataCourses.map(value => {
      return {
        id: value.id!,
        name: value.name,
        children: value.teams?.map(v => {
          return {
            id: v.id!,
            name: v.name,
            info: `${v.numberStudents} alunos`,
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
      const dataCourses = await getCourses(week, shift);
      setCourses(dataCourses);
      convertData(dataCourses);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const setDataSelectsChildren = useCallback(
    id => {
      pushChildren(id, childrenSelecteds, setChildrenSelecteds);
    },
    [childrenSelecteds]
  );

  useEffect(() => {
    changeFatherState(data, childrenSelecteds, fathersState, setFathersState);
  }, [childrenSelecteds]);

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
    <DataCourseSelectsContext.Provider
      value={{
        courses,
        loading,
        data,
        childrenSelecteds,
        setDataSelectsChildren,
        defaultExpanded,
        get,
        setFatherSelectsChildren,
        fathersState,
      }}>
      {children}
    </DataCourseSelectsContext.Provider>
  );
};

export function useCourseDataSelects(): DataCourseSelectsContextData {
  const context = useContext(DataCourseSelectsContext);

  if (!context) {
    throw new Error('useAuth must be used within a SingUpProviderProps');
  }

  return context;
}

export default DataCourseSelectsProvider;
