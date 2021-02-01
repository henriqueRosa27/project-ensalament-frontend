import React, {
  FC,
  createContext,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { useGenerateEnsalamentShift } from './GenerateEnsalamentContext';
import { useOptionWeekShift } from './OptionsWeekShiftContext';
import { save as saveData } from '../../services/ensalament';

interface CreateEnsalamentContextData {
  loading: boolean;
  save: () => void;
}

interface CreateEnsalamentProviderProps {
  children: ReactNode;
}

const CreateEnsalamentContext = createContext<CreateEnsalamentContextData>(
  {} as CreateEnsalamentContextData
);

const SignUpProvider: FC<CreateEnsalamentProviderProps> = ({
  children,
}: CreateEnsalamentProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { data: dataSelected } = useGenerateEnsalamentShift();
  const { data: dataOption } = useOptionWeekShift();

  const save = async () => {
    try {
      setLoading(true);

      const data = {
        week: dataOption.week! - 1,
        shift: dataOption.shift! - 1,
        rooms: dataSelected.data
          .map(({ rooms }) => rooms)
          .flat()
          .filter(({ teams }) => teams && teams.length > 0)
          .map(({ id, teams }) => ({
            id: id!,
            teams: teams.map(({ id: idTeam }) => idTeam!),
          })),
      };

      await saveData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CreateEnsalamentContext.Provider value={{ loading, save }}>
      {children}
    </CreateEnsalamentContext.Provider>
  );
};

export function useCreateEnsalament(): CreateEnsalamentContextData {
  const context = useContext(CreateEnsalamentContext);

  if (!context) {
    throw new Error('useAuth must be used within a SingUpProviderProps');
  }

  return context;
}

export default SignUpProvider;
