import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { createTeam } from '../../services/team';
import { useNotification } from '../Notification';

interface TeamCreateContextData {
  loading: boolean;
  createData(
    name: string,
    numberStudents: number,
    course: string,
    prefLab: boolean
  ): Promise<void>;
}

interface TeamCreateContextProps {
  children: ReactNode;
}

const TeamCreateContext = createContext<TeamCreateContextData>(
  {} as TeamCreateContextData
);

const TeamCreateProvider: FC<TeamCreateContextProps> = ({
  children,
}: TeamCreateContextProps) => {
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  const createData = useCallback(
    async (name, numberStudents, course, prefLab) => {
      try {
        setLoading(true);
        await createTeam(name, numberStudents, course, prefLab);
      } catch (e) {
        error({ message: 'Algo deu errado ao inserir dados' });
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return (
    <TeamCreateContext.Provider value={{ loading, createData }}>
      {children}
    </TeamCreateContext.Provider>
  );
};

export function useTeamCreate(): TeamCreateContextData {
  const context = useContext(TeamCreateContext);

  if (!context) {
    throw new Error('useTeamCreate must be used within a ListGroupProvider');
  }

  return context;
}

export default TeamCreateProvider;
