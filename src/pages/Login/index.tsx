import React from 'react';

import Page from './page';

import SignInProvider from '../../hooks/Session/SignInContext';

export default function () {
  return (
    <SignInProvider>
      <Page />
    </SignInProvider>
  );
}
