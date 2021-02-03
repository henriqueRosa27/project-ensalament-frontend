import React from 'react';

import Page from './page';
import BuildingCreateProvider from '../../../hooks/Buildings/CreateContext';
import BuildingGetByIdProvider from '../../../hooks/Buildings/GetByIdContext';
import BuildingUpdateProvider from '../../../hooks/Buildings/UpdateContext';

export default function () {
  return (
    <BuildingCreateProvider>
      <BuildingGetByIdProvider>
        <BuildingUpdateProvider>
          <Page />
        </BuildingUpdateProvider>
      </BuildingGetByIdProvider>
    </BuildingCreateProvider>
  );
}
