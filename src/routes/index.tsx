import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from './history';
import Login from '../pages/Login';
import Content from '../pages/common/Content';
import Home from '../pages/Home';
import Building from '../pages/Building';

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Content>
          <Route
            component={() => (
              <>
                <Route exact path="/" component={Home} />
                <Route exact path="/predio" render={() => <Building />} />
              </>
            )}
          />
        </Content>
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;
