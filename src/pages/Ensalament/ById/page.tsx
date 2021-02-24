import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  makeStyles,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@material-ui/core';

import { useEnsalamentById } from '../../../hooks/Ensalament/GetByIdEnsalamentContext';
import { shiftOptions, weekOptions } from '../../../Models/WeekShift';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    borderRadius: 20,
    border: 'solid rgba(63, 81, 181, 0.4 )',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface ParamTypes {
  id: string;
}

export default function () {
  const classes = useStyles();
  const { id } = useParams<ParamTypes>();
  const { loadData, loading, data } = useEnsalamentById();
  useEffect(() => {
    loadData(id);
  }, []);

  if (loading) return <></>;

  const shift = shiftOptions.find(({ value }) => value === data.shift + 1)
    ?.title;
  const week = weekOptions.find(({ value }) => value === data.shift + 1)?.title;

  return (
    <Container className={classes.container}>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {`${week} - ${shift}`}
          </Typography>
          <Box m={3} marginBottom={1} />
          <TableContainer component={Paper}>
            {data.buildings?.map(building => (
              <>
                <Box m={2} />
                <Table key={building.id}>
                  <TableHead
                    style={{
                      backgroundColor: '#dce5e8',
                    }}>
                    <TableRow>
                      <TableCell align="center" colSpan={4}>
                        <Typography component="h5" variant="h5" align="center">
                          {building.name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead
                    style={{
                      backgroundColor: '#dce5e8',
                    }}>
                    <TableRow>
                      <TableCell align="center">Nome</TableCell>
                      <TableCell align="center">Capacidade</TableCell>
                      <TableCell align="center">Turmas</TableCell>
                      <TableCell align="center">Total de alunos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {building.rooms.map(room => (
                      <TableRow key={room.id}>
                        <TableCell align="center">{room.name}</TableCell>
                        <TableCell align="center">{room.capacity}</TableCell>
                        <TableCell align="center">
                          <div style={{ display: 'block' }}>
                            {room.teams.map(team => (
                              <div key={team.id}>{team.name}</div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {room.teams
                            .map(({ numberStudents }) => numberStudents)
                            .reduce((a, b) => {
                              return a + b;
                            }, 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ))}
          </TableContainer>
        </Paper>
      </div>
    </Container>
  );
}
