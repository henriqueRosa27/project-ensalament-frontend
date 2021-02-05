import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import TeamModel from '../../../Models/Team';
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
    name: 'Número de alunos',
    selector: 'numberStudents',
    sortable: true,
  },
  {
    name: 'Curso',
    cell: (row: any) => <div>{row.course.name}</div>,
    sortable: true,
  },
  {
    name: 'Prefêrencia por laboratório',
    selector: 'prefLab',
    cell: (row: any) => (row.prefLab ? 'Sim' : 'Não'),
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: (row: TeamModel) => (row.active ? 'Ativo' : 'Inativo'),
  },
  {
    name: 'Ações',
    cell: (row: TeamModel) => (
      <>
        <IconButton
          aria-label="delete"
          color="inherit"
          onClick={() => {
            history.push(`turma/alterar/${row.id}`);
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
