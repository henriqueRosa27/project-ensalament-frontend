import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { useBuildingDataSelects } from './Datas/DataBuildingSelectsContext';
import { useCourseDataSelects } from './Datas/DataCourseSelectsContext';
import { useNotification } from '../Notification';
import { useGlobals } from '../GlobalsContext';

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
  const { error } = useNotification();
  const { openBackdrop, closeBackdrop } = useGlobals();

  const changeData = useCallback(
    async value => {
      if (!value.shift) setStatus('waitingRequest');
      else if (!value.shift) setStatus('waitingRequest');
      setData(value);
    },
    [status, data]
  );

  const getDatas = async () => {
    try {
      openBackdrop();
      const { shift, week } = data;
      await getCourse(week! - 1, shift! - 1);
      await getBuilding(week! - 1, shift! - 1);
      setStatus('doneRequest');
    } catch (e) {
      error({ message: 'Ops, Algum erro ocorreu ao buscar dados' });
    } finally {
      closeBackdrop();
    }
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
