import React from 'react';

import Page from './page';
import TeamCreateProvider from '../../../hooks/Teams/CreateContext';
import TeamGetByIdProvider from '../../../hooks/Teams/GetByIdContext';
import TeamUpdateProvider from '../../../hooks/Teams/UpdateContext';

export default function () {
  return (
    <TeamCreateProvider>
      <TeamGetByIdProvider>
        <TeamUpdateProvider>
          <Page />
        </TeamUpdateProvider>
      </TeamGetByIdProvider>
    </TeamCreateProvider>
  );
}
