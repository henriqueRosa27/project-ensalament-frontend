import React from 'react';

import Page from './page';
import DataCourseSelectsProvider from '../../hooks/DataCourseSelectsContext';
import DataBuildingSelectsProvider from '../../hooks/DataBuildingSelectsContext';
import OptionsWeekShiftProvider from '../../hooks/OptionsWeekShiftContext';
import GenerateEnsalamentProvider from '../../hooks/GenerateEnsalamentContext';

export default () => (
  <DataCourseSelectsProvider>
    <DataBuildingSelectsProvider>
      <GenerateEnsalamentProvider>
        <OptionsWeekShiftProvider>
          <Page />
        </OptionsWeekShiftProvider>
      </GenerateEnsalamentProvider>
    </DataBuildingSelectsProvider>
  </DataCourseSelectsProvider>
);
