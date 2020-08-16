import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import currentRoute from '../../../../../store/selector/route';
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
  const currentePath = useSelector(currentRoute);
  const onClick = () => {
    history.push(path);
  };

  return (
    <div>
      <ListItem button onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={label}
          color={currentePath === path ? 'primary' : 'secondary'}
        />
      </ListItem>
    </div>
  );
};

export default ItemList;
