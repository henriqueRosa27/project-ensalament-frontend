import React from 'react';

import Page from './page';
import DataCourseSelectsProvider from '../../hooks/DataCourseSelectsContext';
import DataBuildingSelectsProvider from '../../hooks/DataBuildingSelectsContext';

export default () => (
  <DataCourseSelectsProvider>
    <DataBuildingSelectsProvider>
      <Page />
    </DataBuildingSelectsProvider>
  </DataCourseSelectsProvider>
);
