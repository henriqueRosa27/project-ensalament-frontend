import React from 'react';
import { Container, makeStyles, Theme } from '@material-ui/core';
import { IDataTableColumn } from 'react-data-table-component';

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
    name: '',
    cell: () => (
      <button
        type="button"
        onClick={() => {
          console.log('teste');
        }}
      >
        Action
      </button>
    ),
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

const Building: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <DataTableComponent title="Prédios" columns={Columns} data={Data} />
    </Container>
  );
};

export default Building;
