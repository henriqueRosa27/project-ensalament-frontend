import React from 'react';
import { Container, makeStyles, Theme } from '@material-ui/core';

import { DataTableComponent } from '../../../components';
import DataTableMoldel from '../../../Models/DataTable';
import BuildingModel from '../../../Models/Building';

const Columns: Array<DataTableMoldel> = [
  { title: 'Nome', field: 'name', type: 'string' },
  {
    title: 'Ativo',
    field: 'status',
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

  const onEdit = (teste: any) => {
    console.log(teste);
  };

  return (
    <Container className={classes.container}>
      <DataTableComponent
        title="Prédios"
        columns={Columns}
        data={Data}
        onEdit={onEdit}
      />
    </Container>
  );
};

export default Building;
