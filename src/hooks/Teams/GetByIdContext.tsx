import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import TeamModel from '../../Models/Team';
import { getTeamById } from '../../services/team';
import { useNotification } from '../Notification';

interface TeamByIdContextData {
  loading: boolean;
  data: TeamModel;
  loadData(id: string, onError: () => void): Promise<void>;
}

interface TeamByIdContextProps {
  children: ReactNode;
}

const TeamByIdContext = createContext<TeamByIdContextData>(
  {} as TeamByIdContextData
);

const TeamByIdProvider: FC<TeamByIdContextProps> = ({
  children,
}: TeamByIdContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TeamModel>({} as TeamModel);
  const { error } = useNotification();

  const loadData = useCallback(async (id, onError) => {
    try {
      setLoading(true);
      const courseData = await getTeamById(id);
      setData(courseData);
    } catch (e) {
      onError();
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <TeamByIdContext.Provider value={{ loading, loadData, data }}>
      {children}
    </TeamByIdContext.Provider>
  );
};

export function useTeamById(): TeamByIdContextData {
  const context = useContext(TeamByIdContext);

  if (!context) {
    throw new Error('useTeamById must be used within a ListGroupProvider');
  }

  return context;
}

export default TeamByIdProvider;
