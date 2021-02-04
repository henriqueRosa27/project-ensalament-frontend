import React, { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import history from '../../../../../routes/history';

interface ItemListProps {
  label: string;
  icon: ReactNode;
  path: string;
}

const ItemList: React.FC<ItemListProps> = ({
  label,
  icon,
  path,
}: ItemListProps) => {
  const location = useLocation();
  const onClick = () => {
    history.push(path);
  };

  return (
    <div>
      <ListItem button onClick={onClick} selected={location.pathname === path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </div>
  );
};

export default ItemList;
