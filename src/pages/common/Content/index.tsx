import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import clsx from 'clsx';

import drawerState from '../../../store/selector/navigation';
import Navbar from '../Navbar';
import DrawerPage from '../Drawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginBottom: 20,
    minHeight: 'calc(100vh - 20px)',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: -drawerWidth,
    },
    background: 'rgb(249, 249, 252)',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '0px !important',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

interface ContentProps {
  children: any;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const classes = useStyles();

  const drawerIsOpen = useSelector(drawerState);

  return (
    <>
      <Navbar />
      <DrawerPage />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerIsOpen,
        })}
      >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Content;
