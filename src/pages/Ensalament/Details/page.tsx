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

import { useEnsalamentDetails } from '../../../hooks/Ensalament/GetDetailsEnsalamentContext';
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
  const { loadData, loading, data } = useEnsalamentDetails();

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <></>;

  return (
    <Container className={classes.container}>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h3" align="center">
            Ensalamentos
          </Typography>
          <Box m={3} marginBottom={1} />
          <TableContainer component={Paper}>
            {data.map(course => (
              <>
                <Box m={2} />
                <Table key={course.id} size="small">
                  <TableHead>
                    <TableRow
                      style={{
                        backgroundColor: '#dce5e8',
                      }}>
                      <TableCell align="center" colSpan={3}>
                        <Box fontWeight={600} fontSize={16}>
                          {course.name}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {course.teams.map(team => (
                    <Table key={team.id} size="small">
                      <TableHead>
                        <TableRow
                          style={{
                            backgroundColor: '#dce5e8',
                          }}>
                          <TableCell align="center" colSpan={3}>
                            <Box fontWeight={600}>{team.name}</Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">
                            <Box fontWeight={600}>Dia</Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box fontWeight={600}>Turno</Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box fontWeight={600}>Sala</Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {team.rooms.map(room => {
                        const shift = shiftOptions.find(
                          ({ value }) => value === room.shift + 1
                        )?.title;
                        const week = weekOptions.find(
                          ({ value }) => value === room.week + 1
                        )?.title;
                        return (
                          <TableBody key={room.id}>
                            <TableRow>
                              <TableCell align="center">
                                <Box>{week}</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box>{shift}</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box>{`${room.room.name} - ${room.room.building.name}`}</Box>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                    </Table>
                  ))}
                </Table>
              </>
            ))}
          </TableContainer>
        </Paper>
      </div>
    </Container>
  );
}
