import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import CourseModel from '../../models/Course';
import { getCourses } from '../../services/course';
import { useNotification } from '../Notification';

interface CourseListContextData {
  loading: boolean;
  data: CourseModel[];
  loadData(): Promise<void>;
}

interface CourseListContextProps {
  children: ReactNode;
}

const CourseListContext = createContext<CourseListContextData>(
  {} as CourseListContextData
);

const BuildingListProvider: FC<CourseListContextProps> = ({
  children,
}: CourseListContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CourseModel[]>([]);
  const { error } = useNotification();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const courseData = await getCourses();
      setData(courseData);
    } catch (e) {
      error('Algo deu errado ao buscar dados');
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <CourseListContext.Provider value={{ loading, loadData, data }}>
      {children}
    </CourseListContext.Provider>
  );
};

export function useCourseList(): CourseListContextData {
  const context = useContext(CourseListContext);

  if (!context) {
    throw new Error('useCourseList must be used within a ListGroupProvider');
  }

  return context;
}

export default BuildingListProvider;
