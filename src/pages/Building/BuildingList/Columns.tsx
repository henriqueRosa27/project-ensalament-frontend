import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import BuildingModel from '../../../Models/Building';
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
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: (row: BuildingModel) => (row.active ? 'Ativo' : 'Inativo'),
  },
  {
    name: 'Ações',
    cell: (row: BuildingModel) => (
      <>
        <IconButton
          aria-label="delete"
          color="inherit"
          onClick={() => {
            history.push(`predio/alterar/${row.id}`);
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
