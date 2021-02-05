import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { updateTeam } from '../../services/team';
import { useNotification } from '../Notification';

interface TeamUpdateContextData {
  loading: boolean;
  updateData(
    id: string,
    name: string,
    course: string,
    numberStudents: number,
    prefLab: boolean
  ): Promise<void>;
}

interface TeamUpdateContextProps {
  children: ReactNode;
}

const TeamUpdateContext = createContext<TeamUpdateContextData>(
  {} as TeamUpdateContextData
);

const TeamUpdateProvider: FC<TeamUpdateContextProps> = ({
  children,
}: TeamUpdateContextProps) => {
  const [loading, setLoading] = useState(false);
  const { error, success } = useNotification();

  const updateData = useCallback(
    async (id, name, numberStudents, course, prefLab) => {
      try {
        setLoading(true);
        await updateTeam(id, name, numberStudents, course, prefLab);
        success({ message: 'Turma alterada com suceso' });
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
    <TeamUpdateContext.Provider value={{ loading, updateData }}>
      {children}
    </TeamUpdateContext.Provider>
  );
};

export function useTeamUpdate(): TeamUpdateContextData {
  const context = useContext(TeamUpdateContext);

  if (!context) {
    throw new Error('useTeamUpdate must be used within a ListGroupProvider');
  }

  return context;
}

export default TeamUpdateProvider;
