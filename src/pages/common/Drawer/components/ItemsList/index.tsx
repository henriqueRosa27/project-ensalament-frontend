import React, { ReactNode } from 'react';
import {
  Dashboard,
  Business,
  HomeWork,
  School,
  Class,
} from '@material-ui/icons';

interface ItemList {
  label: string;
  icon: ReactNode;
  path: string;
}

const itemsList: Array<ItemList> = [
  {
    label: 'Home',
    path: '/',
    icon: <Dashboard />,
  },
  {
    label: 'Prédios',
    path: '/predio',
    icon: <Business />,
  },
  {
    label: 'Salas',
    path: '/sala',
    icon: <HomeWork />,
  },
  {
    label: 'Cursos',
    path: '/curso',
    icon: <School />,
  },
  {
    label: 'Turmas',
    path: '/turma',
    icon: <Class />,
  },
];

export default itemsList;
