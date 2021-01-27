import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { useBuildingDataSelects } from './DataBuildingSelectsContext';
import { useCourseDataSelects } from './DataCourseSelectsContext';

interface Data {
  week: number | undefined;
  shift: number | undefined;
}

interface OptionsWeekShiftContextData {
  data: Data;
  status: 'waitingRequest' | 'doneRequest';
  changeData: (data: Data) => void;
  getDatas: () => void;
  statusOption: () => boolean;
}

interface OptionsWeekShiftProps {
  children: ReactNode;
}

const OptionsWeekShiftContext = createContext<OptionsWeekShiftContextData>(
  {} as OptionsWeekShiftContextData
);

const ListGroupProvider: FC<OptionsWeekShiftProps> = ({
  children,
}: OptionsWeekShiftProps) => {
  const [data, setData] = useState<Data>({} as Data);
  const [status, setStatus] = useState<'waitingRequest' | 'doneRequest'>(
    'waitingRequest'
  );
  const { get: getCourse } = useCourseDataSelects();
  const { get: getBuilding } = useBuildingDataSelects();

  const changeData = useCallback(
    async value => {
      if (!value.shift) setStatus('waitingRequest');
      else if (!value.shift) setStatus('waitingRequest');
      setData(value);
    },
    [status, data]
  );

  const getDatas = () => {
    const { shift, week } = data;
    getCourse(week! - 1, shift! - 1);
    getBuilding(week! - 1, shift! - 1);
    setStatus('doneRequest');
  };

  const statusOption = () => {
    if (!data.shift) {
      return true;
    }
    if (!data.week) {
      return true;
    }
    return false;
  };

  return (
    <OptionsWeekShiftContext.Provider
      value={{ data, status, changeData, getDatas, statusOption }}>
      {children}
    </OptionsWeekShiftContext.Provider>
  );
};

export function useOptionWeekShift(): OptionsWeekShiftContextData {
  const context = useContext(OptionsWeekShiftContext);

  if (!context) {
    throw new Error('useAuth must be used within a SingUpProviderProps');
  }

  return context;
}

export default ListGroupProvider;
