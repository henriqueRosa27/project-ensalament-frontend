import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import RoomModel from '../../models/Room';
import { getRooms } from '../../services/room';
import { useNotification } from '../Notification';

interface RoomListContextData {
  loading: boolean;
  data: RoomModel[];
  loadData(): Promise<void>;
}

interface RoomListContextProps {
  children: ReactNode;
}

const RoomListContext = createContext<RoomListContextData>(
  {} as RoomListContextData
);

const RoomListProvider: FC<RoomListContextProps> = ({
  children,
}: RoomListContextProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RoomModel[]>([]);
  const { error } = useNotification();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const roomData = await getRooms();
      setData(roomData);
    } catch (e) {
      error({ message: 'Algo deu errado ao buscar dados' });
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <RoomListContext.Provider value={{ loading, loadData, data }}>
      {children}
    </RoomListContext.Provider>
  );
};

export function useRoomList(): RoomListContextData {
  const context = useContext(RoomListContext);

  if (!context) {
    throw new Error('useRoomList must be used within a ListGroupProvider');
  }

  return context;
}

export default RoomListProvider;
