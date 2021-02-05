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
  const { error, success } = useNotification();

  const createData = useCallback(async name => {
    try {
      setLoading(true);
      await createCourse(name);
      success({ message: 'Curso inserido com suceso' });
    } catch (e) {
      if (e?.response?.status === 400) {
        error({
          title: 'Dados inválidos',
          message: 'Favor, revalide os dados e tente novamente',
        });
      } else {
        error({
          message: [
            'Ops, algo de errado aconteceu',
            'Tente novamente mais tarde',
          ],
          title: 'Erro inesperado',
        });
      }
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
