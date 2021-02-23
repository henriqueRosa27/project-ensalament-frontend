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
          <Typography component="h1" variant="h4" align="center">
            Ensalamentos
          </Typography>
          <Box m={3} marginBottom={1} />
        </Paper>
      </div>
    </Container>
  );
}
