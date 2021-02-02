import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import RoomModel from '../../../models/Room';
import history from '../../../routes/history';

const Columns = [
  {
    name: 'Id',
    selector: 'id',
    sortable: true,
    omit: true,
  },
  {
    name: 'Nome',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Capacidade Máxima',
    selector: 'capacity',
    sortable: true,
  },
  {
    name: 'Prédio',
    cell: (row: any) => <div>{row.building.name}</div>,
    sortable: true,
  },
  {
    name: 'Laboratório',
    selector: 'isLab',
    cell: (row: RoomModel) => (row.isLab ? 'Sim' : 'Não'),
  },

  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: (row: RoomModel) => (row.active ? 'Ativo' : 'Inativo'),
  },
  {
    name: 'Ações',
    cell: (row: RoomModel) => (
      <>
        <IconButton
          aria-label="delete"
          color="inherit"
          onClick={() => {
            history.push(`sala/alterar/${row.id}`);
          }}>
          <EditIcon />
        </IconButton>
      </>
    ),
    sortable: false,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export default Columns;
