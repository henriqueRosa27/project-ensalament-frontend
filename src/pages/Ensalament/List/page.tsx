import React, { useEffect } from 'react';
import {
  Container,
  makeStyles,
  Theme,
  Button,
  withStyles,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

import { useEnsalamentList } from '../../../hooks/Ensalament/ListContext';
import { useDeleteAllEnsalament } from '../../../hooks/Ensalament/DeleteAllEnsalamentContext';
import history from '../../../routes/history';
import { DataTableComponent } from '../../../components';

import Columns from './Columns';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(red.A200),
    backgroundColor: red.A200,
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const Building: React.FC = () => {
  const classes = useStyles();
  const { data, loadData, loading } = useEnsalamentList();
  const { deleteAll } = useDeleteAllEnsalament();

  useEffect(() => {
    loadData();
  }, []);

  const actions = (
    <>
      <ColorButton
        variant="contained"
        color="primary"
        startIcon={<DeleteIcon />}
        onClick={() => {
          deleteAll();
          history.go(0);
        }}>
        Excluir todos
      </ColorButton>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          history.push('/ensalamento/gerar');
        }}>
        Gerar um novo
      </Button>
    </>
  );

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
