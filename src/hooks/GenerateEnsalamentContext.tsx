import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import EnsalamentData from '../models/Ensalament';
import { useBuildingDataSelects } from './DataBuildingSelectsContext';
import { useCourseDataSelects } from './DataCourseSelectsContext';
import { generate } from '../services/ensalament';

interface GenerateEnsalamentData {
  data: EnsalamentData;
  getData: (onSucess: () => void) => void;
}

interface GenerateEnsalamentProps {
  children: ReactNode;
}

const GenerateEnsalamentContext = createContext<GenerateEnsalamentData>(
  {} as GenerateEnsalamentData
);

const GenerateEnsalamentProvider: FC<GenerateEnsalamentProps> = ({
  children,
}: GenerateEnsalamentProps) => {
  const [data, setData] = useState<EnsalamentData>({} as EnsalamentData);
  const { childrenSelecteds: roomsIds } = useBuildingDataSelects();
  const { childrenSelecteds: teamsIds } = useCourseDataSelects();

  const getData = useCallback(
    async onSucess => {
      try {
        console.log(roomsIds, teamsIds);
        const dataResponse = await generate(roomsIds, teamsIds);
        setData(dataResponse);
        onSucess();
      } catch (e) {
        console.log(e);
      }
    },
    [data, roomsIds, teamsIds]
  );

  return (
    <GenerateEnsalamentContext.Provider value={{ data, getData }}>
      {children}
    </GenerateEnsalamentContext.Provider>
  );
};

export function useOptionWeekShift(): GenerateEnsalamentData {
  const context = useContext(GenerateEnsalamentContext);

  if (!context) {
    throw new Error('useAuth must be used within a SingUpProviderProps');
  }

  return context;
}

export default GenerateEnsalamentProvider;
