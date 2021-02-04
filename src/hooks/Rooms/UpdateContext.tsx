import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { updateRoom } from '../../services/room';
import { useNotification } from '../Notification';

interface RoomUpdateContextData {
  loading: boolean;
  updateData(
    id: string,
    name: string,
    capacity: number,
    isLab: boolean,
    buildingId: string
  ): Promise<void>;
}

interface RoomUpdateContextProps {
  children: ReactNode;
}

const RoomUpdateContext = createContext<RoomUpdateContextData>(
  {} as RoomUpdateContextData
);

const RoomUpdateProvider: FC<RoomUpdateContextProps> = ({
  children,
}: RoomUpdateContextProps) => {
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  const updateData = useCallback(
    async (id, name, capacity, isLab, buildingId) => {
      try {
        setLoading(true);
        await updateRoom(id, name, capacity, isLab, buildingId);
      } catch (e) {
        error({ message: 'Algo deu errado ao alterar dados' });
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return (
    <RoomUpdateContext.Provider value={{ loading, updateData }}>
      {children}
    </RoomUpdateContext.Provider>
  );
};

export function useRoomUpdate(): RoomUpdateContextData {
  const context = useContext(RoomUpdateContext);

  if (!context) {
    throw new Error('useRoomUpdate must be used within a ListGroupProvider');
  }

  return context;
}

export default RoomUpdateProvider;
