import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { DeleteDataRow } from './helpers';
import { shiftOptions, weekOptions } from '../../../Models/WeekShift';

const Columns = [
  {
    name: 'Id',
    selector: 'id',
    sortable: true,
    omit: true,
  },
  {
    name: 'Dia',
    cell: (row: any) =>
      weekOptions.find(({ value }) => value === row.week + 1)!.title,
    sortable: true,
  },
  {
    name: 'Turno',
    cell: (row: any) =>
      shiftOptions.find(({ value }) => value === row.shift + 1)!.title,
    sortable: true,
  },
  {
    name: 'Quantidade Salas',
    selector: 'rooms',
    sortable: true,
  },
  {
    name: 'Quantidade Turmas',
    selector: 'teams',
    sortable: true,
  },

  {
    name: 'Ações',
    cell: (row: any) => <DeleteDataRow id={row.id} />,
    sortable: false,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export default Columns;
