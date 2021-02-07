import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { BackDropComponent } from '../components';
import { StatePage } from '../Models/enums';
import { useAuth } from '../hooks/AuthContext';
import { useSignOut } from '../hooks/Session/SignOutContext';

interface PrivateRouteProps {
  component: any;
  exact: boolean;
  path: string;
}

export default function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<StatePage>(
    StatePage.loading
  );

  const { user } = useAuth();
  const { signOut } = useSignOut();

  useEffect(() => {
    (async () => {
      try {
        if (!user.id) setIsAuthorized(StatePage.noAuthorized);
        else setIsAuthorized(StatePage.authorized);
      } catch (err) {
        setIsAuthorized(StatePage.noAuthorized);
      }
    })();
  }, []);

  if (isAuthorized === StatePage.authorized) {
    return (
      <Route {...rest} render={propsRoute => <Component {...propsRoute} />} />
    );
  }

  if (isAuthorized === StatePage.noAuthorized) {
    return <Redirect to="/login" />;
  }

  return <BackDropComponent open />;
}
