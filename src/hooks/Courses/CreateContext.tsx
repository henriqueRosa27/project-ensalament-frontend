import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { createCourse } from '../../services/course';
import { useNotification } from '../Notification';

interface CourseCreateContextData {
  loading: boolean;
  createData(name: string): Promise<void>;
}

interface CourseCreateContextProps {
  children: ReactNode;
}

const CourseCreateContext = createContext<CourseCreateContextData>(
  {} as CourseCreateContextData
);

const CourseCreateProvider: FC<CourseCreateContextProps> = ({
  children,
}: CourseCreateContextProps) => {
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  const createData = useCallback(async name => {
    try {
      setLoading(true);
      await createCourse(name);
    } catch (e) {
      error('Algo deu errado ao inserir dados');
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <CourseCreateContext.Provider value={{ loading, createData }}>
      {children}
    </CourseCreateContext.Provider>
  );
};

export function useCourseCreate(): CourseCreateContextData {
  const context = useContext(CourseCreateContext);

  if (!context) {
    throw new Error('useCourseCreate must be used within a ListGroupProvider');
  }

  return context;
}

export default CourseCreateProvider;
