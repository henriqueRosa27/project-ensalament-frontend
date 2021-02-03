import React from 'react';

import Page from './page';
import CourseCreateProvider from '../../../hooks/Courses/CreateContext';
import CourseGetByIdProvider from '../../../hooks/Courses/GetByIdContext';
import CourseUpdateProvider from '../../../hooks/Courses/UpdateContext';

export default function () {
  return (
    <CourseCreateProvider>
      <CourseGetByIdProvider>
        <CourseUpdateProvider>
          <Page />
        </CourseUpdateProvider>
      </CourseGetByIdProvider>
    </CourseCreateProvider>
  );
}
