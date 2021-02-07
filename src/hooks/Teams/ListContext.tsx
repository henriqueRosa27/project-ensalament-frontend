import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import TeamModel from '../../Models/Team';
import { getTeams } from '../../services/team';
import { useNotification } from '../Notification';

interface TeamListContextData {
  loading: boolean;
  data: TeamModel[];
  loadData(): Promise<void>;
}

interface TeamListContextProps {
  children: ReactNode;
}

const TeamListContext = createContext<TeamListContextData>(
  {} as TeamListContextData
);

const TeamListProvider: FC<TeamListContextProps> = ({
  children,
}: TeamListContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TeamModel[]>([]);
  const { error } = useNotification();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const teamData = await getTeams();
      setData(teamData);
    } catch (e) {
      error({ message: 'Algo deu errado ao buscar dados' });
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <TeamListContext.Provider value={{ loading, loadData, data }}>
      {children}
    </TeamListContext.Provider>
  );
};

export function useTeamList(): TeamListContextData {
  const context = useContext(TeamListContext);

  if (!context) {
    throw new Error('useTeamList must be used within a ListGroupProvider');
  }

  return context;
}

export default TeamListProvider;
