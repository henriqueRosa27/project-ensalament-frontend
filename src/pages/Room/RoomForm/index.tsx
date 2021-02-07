import React from 'react';

import Page from './page';
import RoomCreateProvider from '../../../hooks/Rooms/CreateContext';
import RoomGetByIdProvider from '../../../hooks/Rooms/GetByIdContext';
import RoomUpdateProvider from '../../../hooks/Rooms/UpdateContext';

export default function () {
  return (
    <RoomCreateProvider>
      <RoomGetByIdProvider>
        <RoomUpdateProvider>
          <Page />
        </RoomUpdateProvider>
      </RoomGetByIdProvider>
    </RoomCreateProvider>
  );
}
