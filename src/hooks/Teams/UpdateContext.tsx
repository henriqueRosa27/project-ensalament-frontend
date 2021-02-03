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
  const { error } = useNotification();

  const updateData = useCallback(
    async (id, name, numberStudents, course, prefLab) => {
      try {
        setLoading(true);
        await updateTeam(id, name, numberStudents, course, prefLab);
      } catch (e) {
        error('Algo deu errado ao alterar dados');
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
