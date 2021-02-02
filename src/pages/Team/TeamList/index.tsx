import React from 'react';

import Page from './page';
import TeamListProvider from '../../../hooks/Teams/ListContext';

export default function () {
  return (
    <TeamListProvider>
      <Page />
    </TeamListProvider>
  );
}
