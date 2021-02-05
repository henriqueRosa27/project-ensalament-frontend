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
  const { error, success } = useNotification();

  const createData = useCallback(
    async (name, numberStudents, course, prefLab) => {
      try {
        setLoading(true);
        await createTeam(name, numberStudents, course, prefLab);
        success({ message: 'Turma inserida com suceso' });
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
