import React, { ReactNode } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';

interface ItemList {
  label: string;
  icon: ReactNode;
  path: string;
}

const itemsList: Array<ItemList> = [
  {
    label: 'Home',
    path: '/',
    icon: <DashboardIcon />,
  },
  {
    label: 'Prédios',
    path: '/',
    icon: <BusinessIcon />,
  },
];

export default itemsList;
