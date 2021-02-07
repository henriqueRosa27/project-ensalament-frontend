import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteEnsalament } from '../../../services/ensalament';
import { useNotification } from '../../../hooks/Notification';
import { useGlobals } from '../../../hooks/GlobalsContext';
import { useEnsalamentList } from '../../../hooks/Ensalament/ListContext';

interface DeleteDataRowProps {
  id: string;
}

function DeleteDataRow({ id }: DeleteDataRowProps) {
  const { error, success } = useNotification();
  const { openBackdrop, closeBackdrop } = useGlobals();
  const { loadData } = useEnsalamentList();
  const deleteData = async () => {
    try {
      openBackdrop();
      await deleteEnsalament(id);
      success({ message: 'Dado excluido com sucesso' });
    } catch (e) {
      error({ message: 'Ops, ocorreu algum erro ao excluir o dado' });
    } finally {
      closeBackdrop();
      await loadData();
    }
  };
  return (
    <IconButton aria-label="delete" color="inherit" onClick={deleteData}>
      <DeleteIcon />
    </IconButton>
  );
}

export { DeleteDataRow };
