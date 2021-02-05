import React from 'react';

import Page from './page';
import EnsalamentListProvider from '../../../hooks/Ensalament/ListContext';

export default function () {
  return (
    <EnsalamentListProvider>
      <Page />
    </EnsalamentListProvider>
  );
}
