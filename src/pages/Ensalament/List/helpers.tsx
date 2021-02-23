import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  Pageview as PageviewIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import { deleteEnsalament } from '../../../services/ensalament';
import { useNotification } from '../../../hooks/Notification';
import { useGlobals } from '../../../hooks/GlobalsContext';
import { useEnsalamentList } from '../../../hooks/Ensalament/ListContext';
import history from '../../../routes/history';

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

function EditDatRow({ id }: DeleteDataRowProps) {
  const { error, success } = useNotification();
  const { openBackdrop, closeBackdrop } = useGlobals();
  const { loadData } = useEnsalamentList();

  const redirect = async () => {
    history.push(`/ensalamento/show/${id}`);
  };

  return (
    <IconButton aria-label="delete" color="inherit" onClick={redirect}>
      <PageviewIcon />
    </IconButton>
  );
}

export { DeleteDataRow, EditDatRow };
