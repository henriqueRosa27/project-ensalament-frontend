import React from 'react';

import Page from './page';
import DataCourseSelectsProvider from '../../hooks/Ensalament/Datas/DataCourseSelectsContext';
import DataBuildingSelectsProvider from '../../hooks/Ensalament/Datas/DataBuildingSelectsContext';
import OptionsWeekShiftProvider from '../../hooks/Ensalament/OptionsWeekShiftContext';
import GenerateEnsalamentProvider from '../../hooks/Ensalament/GenerateEnsalamentContext';
import CreateEnsalamentProvider from '../../hooks/Ensalament/CreateEnsalamentContext';

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
