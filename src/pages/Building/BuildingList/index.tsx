import React, { useState, useEffect } from 'react';
import { Container, makeStyles, Theme, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { toast } from 'react-toastify';

import history from '../../../routes/history';
import { DataTableComponent } from '../../../components';
import BuildingModel from '../../../models/Building';
import {
  getBuildings,
  deleteBuilding,
  reactiveBuilding,
} from '../../../services/building';
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
      history.push('predio/criar');
    }}
  >
    Adicionar
  </Button>
);

const Building: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BuildingModel[]>([]);

  useEffect(() => {
    const teste = async () => {
      setLoading(true);
      try {
        const responseData = await getBuildings();
        setData(responseData);
        setLoading(false);
      } catch (e) {
        console.log(await e);
        toast.error(<h1>teste</h1>);
        setLoading(false);
      }
    };
    teste();
  }, []);

  const changeStatusData = (id: number, status: boolean) => {
    const newData = data.map((building) => {
      if (building.id === id) {
        // eslint-disable-next-line no-param-reassign
        building.active = status;
      }
      return building;
    });
    setData(newData);
  };

  const onChangeSwitch = async (row: BuildingModel) => {
    try {
      if (row.active) {
        await deleteBuilding(row.id!);
      } else {
        await reactiveBuilding(row.id!);
      }
      changeStatusData(row.id!, !row.active);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = Columns(onChangeSwitch);

  return (
    <Container className={classes.container}>
      <DataTableComponent
        title="Prédios"
        columns={columns}
        data={data}
        actions={actions}
        isLoading={loading}
      />
    </Container>
  );
};

export default Building;
