import React from 'react';

import Page from './page';
import BuildingListProvider from '../../../hooks/Buildings/ListContext';

export default function () {
  return (
    <BuildingListProvider>
      <Page />
    </BuildingListProvider>
  );
}
