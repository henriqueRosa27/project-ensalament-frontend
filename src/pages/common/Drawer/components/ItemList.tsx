import React, { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

interface ItemListProps {
  label: string;
  icon: ReactNode;
}

const ItemList: React.FC<ItemListProps> = ({ label, icon }: ItemListProps) => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </div>
  );
};

export default ItemList;
