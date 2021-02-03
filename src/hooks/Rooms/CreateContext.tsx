import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { createRoom } from '../../services/room';
import { useNotification } from '../Notification';

interface RoomCreateContextData {
  loading: boolean;
  createData(
    name: string,
    capacity: number,
    isLab: boolean,
    buildingId: string
  ): Promise<void>;
}

interface RoomCreateContextProps {
  children: ReactNode;
}

const RoomCreateContext = createContext<RoomCreateContextData>(
  {} as RoomCreateContextData
);

const RoomCreateProvider: FC<RoomCreateContextProps> = ({
  children,
}: RoomCreateContextProps) => {
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  const createData = useCallback(async (name, capacity, isLab, buildingId) => {
    try {
      setLoading(true);
      await createRoom(name, capacity, isLab, buildingId);
    } catch (e) {
      error('Algo deu errado ao inserir dados');
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <RoomCreateContext.Provider value={{ loading, createData }}>
      {children}
    </RoomCreateContext.Provider>
  );
};

export function useRoomCreate(): RoomCreateContextData {
  const context = useContext(RoomCreateContext);

  if (!context) {
    throw new Error('useRoomCreate must be used within a ListGroupProvider');
  }

  return context;
}

export default RoomCreateProvider;
