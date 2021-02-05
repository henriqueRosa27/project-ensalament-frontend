import React from 'react';
// import { IconButton } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';

// import RoomModel from '../../../models/Room';
// import history from '../../../routes/history';
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
      weekOptions.find(({ value }) => value === row.shift + 1)!.title,
    sortable: true,
  },
  {
    name: 'Turno',
    cell: (row: any) =>
      shiftOptions.find(({ value }) => value === row.week + 1)!.title,
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

  // {
  //   name: 'Ações',
  //   cell: (row: RoomModel) => (
  //     <>
  //       <IconButton
  //         aria-label="delete"
  //         color="inherit"
  //         onClick={() => {
  //           history.push(`sala/alterar/${row.id}`);
  //         }}>
  //         <EditIcon />
  //       </IconButton>
  //     </>
  //   ),
  //   sortable: false,
  //   ignoreRowClick: true,
  //   allowOverflow: true,
  //   button: true,
  // },
];

export default Columns;
