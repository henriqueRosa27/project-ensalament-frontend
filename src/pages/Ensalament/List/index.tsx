import React from 'react';

import Page from './page';
import EnsalamentListProvider from '../../../hooks/Ensalament/ListContext';
import EnsalamentDeleteAllProvider from '../../../hooks/Ensalament/DeleteAllEnsalamentContext';

export default function () {
  return (
    <EnsalamentListProvider>
      <EnsalamentDeleteAllProvider>
        <Page />
      </EnsalamentDeleteAllProvider>
    </EnsalamentListProvider>
  );
}
