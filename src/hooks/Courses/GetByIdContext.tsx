import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import CourseModel from '../../Models/Course';
import { getCourseById } from '../../services/course';
import { useNotification } from '../Notification';

interface CourseByIdContextData {
  loading: boolean;
  data: CourseModel;
  loadData(id: string, onError: () => void): Promise<void>;
}

interface CourseByIdContextProps {
  children: ReactNode;
}

const CourseByIdContext = createContext<CourseByIdContextData>(
  {} as CourseByIdContextData
);

const CourseByIdProvider: FC<CourseByIdContextProps> = ({
  children,
}: CourseByIdContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CourseModel>({} as CourseModel);
  const { error } = useNotification();

  const loadData = useCallback(async (id, onError) => {
    try {
      setLoading(true);
      const courseData = await getCourseById(id);
      setData(courseData);
    } catch (e) {
      onError();
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <CourseByIdContext.Provider value={{ loading, loadData, data }}>
      {children}
    </CourseByIdContext.Provider>
  );
};

export function useCourseById(): CourseByIdContextData {
  const context = useContext(CourseByIdContext);

  if (!context) {
    throw new Error('useCourseById must be used within a ListGroupProvider');
  }

  return context;
}

export default CourseByIdProvider;
