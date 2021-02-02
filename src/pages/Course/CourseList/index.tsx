import React from 'react';

import Page from './page';
import CoursesListProvider from '../../../hooks/Courses/ListContext';

export default function () {
  return (
    <CoursesListProvider>
      <Page />
    </CoursesListProvider>
  );
}
