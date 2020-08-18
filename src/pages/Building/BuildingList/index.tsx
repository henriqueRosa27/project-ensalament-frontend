import React from 'react';
import {
  Container,
  makeStyles,
  Theme,
  Button,
  IconButton,
} from '@material-ui/core';
import { IDataTableColumn } from 'react-data-table-component';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import history from '../../../routes/history';
import { DataTableComponent } from '../../../components';
import BuildingModel from '../../../Models/Building';

const Columns: Array<IDataTableColumn> = [
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
    cell: (row: any) => (row.status ? 'Ativo' : 'Inativo'),
  },
  {
    name: 'Ações',
    cell: (row) => (
      <IconButton
        aria-label="delete"
        color="inherit"
        onClick={() => {
          console.log(row);
        }}
      >
        <EditIcon />
      </IconButton>
    ),
    sortable: false,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const Data: Array<BuildingModel> = [
  {
    id: 1,
    name: 'Prédio 1',
    status: false,
  },
  {
    id: 2,
    name: 'Prédio 2',
    status: true,
  },
  {
    id: 3,
    name: 'Prédio 3',
    status: false,
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const actions = (
  <Button
    variant="outlined"
    color="primary"
    startIcon={<AddIcon />}
    onClick={() => {
      history.push('predio/criar');
    }}
  >
    Adicionar
  </Button>
);

const Building: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <DataTableComponent
        title="Prédios"
        columns={Columns}
        data={Data}
        actions={actions}
      />
    </Container>
  );
};

export default Building;
