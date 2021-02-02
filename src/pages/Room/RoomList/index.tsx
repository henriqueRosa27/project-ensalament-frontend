import React from 'react';

import Page from './page';
import RoomListProvider from '../../../hooks/Rooms/ListContext';

export default function () {
  return (
    <RoomListProvider>
      <Page />
    </RoomListProvider>
  );
}
