import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IDataTableColumn } from 'react-data-table-component';
import EditIcon from '@material-ui/icons/Edit';

import TeamModel from '../../../models/Team';
import history from '../../../routes/history';

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.success.main,
          borderColor: theme.palette.success.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.error.dark,
    },
    checked: {},
  })
)(Switch);

const Columns = (
  onChangeSwitch: (row: TeamModel) => void
): Array<IDataTableColumn> => [
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
    cell: (row: TeamModel) => (row.active ? 'Ativo' : 'Inativo'),
  },
  {
    name: 'Ações',
    cell: (row: TeamModel) => (
      <>
        <Tooltip
          title={row.active ? 'Inativar' : 'Ativar'}
          aria-label={row.active ? 'inativar' : 'ativar'}
        >
          <AntSwitch
            checked={row.active}
            onClick={() => {
              onChangeSwitch(row);
            }}
          />
        </Tooltip>

        <IconButton
          aria-label="delete"
          color="inherit"
          onClick={() => {
            history.push(`turma/alterar/${row.id}`);
          }}
        >
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