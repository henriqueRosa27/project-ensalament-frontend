import React from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { backdropState } from '../../../store/selector/navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

export default function SimpleBackdrop() {
  const classes = useStyles();

  const backdropIsOpen = useSelector(backdropState);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdropIsOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
