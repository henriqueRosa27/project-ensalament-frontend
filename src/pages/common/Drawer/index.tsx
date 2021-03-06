import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ItemList from './components/ItemList';
import ItemsList from './components/ItemsList';
import { useGlobals } from '../../../hooks/GlobalsContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      border: 0,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

const DrawerPage: React.FC = () => {
  const classes = useStyles();

  const { drawer } = useGlobals();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawer,
        [classes.drawerClose]: !drawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawer,
          [classes.drawerClose]: !drawer,
        }),
      }}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {ItemsList.map((item, index) => (
          <ItemList
            label={item.label}
            icon={item.icon}
            // eslint-disable-next-line react/no-array-index-key
            key={index + item.path}
            path={item.path}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerPage;
