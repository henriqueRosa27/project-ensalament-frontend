import React from 'react';

import Page from './page';
import DataCourseSelectsProvider from '../../hooks/DataCourseSelectsContext';
import DataBuildingSelectsProvider from '../../hooks/DataBuildingSelectsContext';
import OptionsWeekShiftProvider from '../../hooks/OptionsWeekShiftContext';
import GenerateEnsalamentProvider from '../../hooks/GenerateEnsalamentContext';
import CreateEnsalamentProvider from '../../hooks/CreateEnsalamentContext';

export default () => (
  <DataCourseSelectsProvider>
    <DataBuildingSelectsProvider>
      <GenerateEnsalamentProvider>
        <OptionsWeekShiftProvider>
          <CreateEnsalamentProvider>
            <Page />
          </CreateEnsalamentProvider>
        </OptionsWeekShiftProvider>
      </GenerateEnsalamentProvider>
    </DataBuildingSelectsProvider>
  </DataCourseSelectsProvider>
);
