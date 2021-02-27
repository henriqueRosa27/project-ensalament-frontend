import React from 'react';

import Page from './page';
import GetDetailsEnsalamentProvider from '../../../hooks/Ensalament/GetDetailsEnsalamentContext';

export default function () {
  return (
    <GetDetailsEnsalamentProvider>
      <Page />
    </GetDetailsEnsalamentProvider>
  );
}
