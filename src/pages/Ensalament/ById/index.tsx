import React from 'react';

import Page from './page';
import GetByIdEnsalamentProvider from '../../../hooks/Ensalament/GetByIdEnsalamentContext';

export default function () {
  return (
    <GetByIdEnsalamentProvider>
      <Page />
    </GetByIdEnsalamentProvider>
  );
}
