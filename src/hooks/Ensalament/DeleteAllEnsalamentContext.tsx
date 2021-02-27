import React, {
  FC,
  createContext,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { useNotification } from '../Notification';
import { useGlobals } from '../GlobalsContext';
import { deleteAllEnsalaments } from '../../services/ensalament';
import history from '../../routes/history';

interface DeleteAllEnsalamentContextData {
  loading: boolean;
  deleteAll: () => void;
}

interface DeleteAllEnsalamentProviderProps {
  children: ReactNode;
}

const DeleteAllEnsalamentContext = createContext<
  DeleteAllEnsalamentContextData
>({} as DeleteAllEnsalamentContextData);

const DeleteAllEnsalamentProvider: FC<DeleteAllEnsalamentProviderProps> = ({
  children,
}: DeleteAllEnsalamentProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();
  const { openBackdrop, closeBackdrop } = useGlobals();

  const deleteAll = async () => {
    try {
      setLoading(true);
      openBackdrop();

      await deleteAllEnsalaments();
      history.go(0);
    } catch (e) {
      error({ message: 'Ops, algo deu errado ao excluir os ensalamentos' });
    } finally {
      setLoading(false);
      closeBackdrop();
    }
  };
  return (
    <DeleteAllEnsalamentContext.Provider value={{ loading, deleteAll }}>
      {children}
    </DeleteAllEnsalamentContext.Provider>
  );
};

export function useDeleteAllEnsalament(): DeleteAllEnsalamentContextData {
  const context = useContext(DeleteAllEnsalamentContext);

  if (!context) {
    throw new Error('useAuth must be used within a SingUpProviderProps');
  }

  return context;
}

export default DeleteAllEnsalamentProvider;
