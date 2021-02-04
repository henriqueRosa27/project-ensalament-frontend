import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { updateCourse } from '../../services/course';
import { useNotification } from '../Notification';

interface CourseUpdateContextData {
  loading: boolean;
  updateData(id: string, name: string): Promise<void>;
}

interface CourseUpdateContextProps {
  children: ReactNode;
}

const CourseUpdateContext = createContext<CourseUpdateContextData>(
  {} as CourseUpdateContextData
);

const CourseUpdateProvider: FC<CourseUpdateContextProps> = ({
  children,
}: CourseUpdateContextProps) => {
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  const updateData = useCallback(async (id, name) => {
    try {
      setLoading(true);
      await updateCourse(id, name);
    } catch (e) {
      error({ message: 'Algo deu errado ao alterar dados' });
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <CourseUpdateContext.Provider value={{ loading, updateData }}>
      {children}
    </CourseUpdateContext.Provider>
  );
};

export function useCourseUpdate(): CourseUpdateContextData {
  const context = useContext(CourseUpdateContext);

  if (!context) {
    throw new Error('useCourseUpdate must be used within a ListGroupProvider');
  }

  return context;
}

export default CourseUpdateProvider;
