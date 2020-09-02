import React, { useState, useEffect } from 'react';
import { Container, makeStyles, Theme, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import history from '../../../routes/history';
import { DataTableComponent } from '../../../components';
import RoomModel from '../../../models/Room';
import { getRooms, deleteRoom, reactiveRoom } from '../../../services/room';
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
      history.push('sala/criar');
    }}
  >
    Adicionar
  </Button>
);

const Building: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RoomModel[]>([]);

  useEffect(() => {
    const teste = async () => {
      setLoading(true);
      try {
        const responseData = await getRooms();
        setData(responseData);
        setLoading(false);
      } catch (e) {
        console.log(e);
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

  const onChangeSwitch = async (row: RoomModel) => {
    try {
      if (row.active) {
        await deleteRoom(row.id!);
      } else {
        await reactiveRoom(row.id!);
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
        title="Salas"
        columns={columns}
        data={data}
        actions={actions}
        isLoading={loading}
      />
    </Container>
  );
};

export default Building;
