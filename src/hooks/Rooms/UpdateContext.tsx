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
  const { error, success } = useNotification();

  const updateData = useCallback(
    async (id, name, capacity, isLab, buildingId) => {
      try {
        setLoading(true);
        await updateRoom(id, name, capacity, isLab, buildingId);
        success({ message: 'Sala alterada com suceso' });
      } catch (e) {
        if (e?.response?.status === 400) {
          error({
            title: 'Dados inválidos',
            message: 'Favor, revalide os dados e tente novamente',
          });
        } else {
          error({
            message: [
              'Ops, algo de errado aconteceu',
              'Tente novamente mais tarde',
            ],
            title: 'Erro inesperado',
          });
        }
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
