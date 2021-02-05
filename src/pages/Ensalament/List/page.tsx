import React, { useEffect } from 'react';
import { Container, makeStyles, Theme, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { useEnsalamentList } from '../../../hooks/Ensalament/ListContext';
import history from '../../../routes/history';
import { DataTableComponent } from '../../../components';

import Columns from './Columns';

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
      history.push('/ensalamento/gerar');
    }}>
    Gerar um novo
  </Button>
);

const Building: React.FC = () => {
  const classes = useStyles();
  const { data, loadData, loading } = useEnsalamentList();

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className={classes.container}>
      <DataTableComponent
        title="Salas"
        columns={Columns}
        data={data}
        actions={actions}
        isLoading={loading}
      />
    </Container>
  );
};

export default Building;
