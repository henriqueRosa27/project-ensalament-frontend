import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import history from './history';
import Login from '../pages/Login';
import Content from '../pages/common/Content';
import {
  GenerateEnsalamentPage,
  ListEnsalamentPage,
} from '../pages/Ensalament';
import { BuildingList, BuildingForm } from '../pages/Building';
import { RoomList, RoomForm } from '../pages/Room';
import { CourseList, CourseForm } from '../pages/Course';
import { TeamList, TeamForm } from '../pages/Team';
import Tests from '../pages/_Tests';
import { BackDropComponent } from '../components';
import { useAuth } from '../hooks/AuthContext';

const Routes: React.FC = () => {
  const { loading } = useAuth();
  if (loading) {
    return <BackDropComponent open />;
  }
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Content>
          <Route
            component={() => (
              <>
                <PrivateRoute exact path="/" component={ListEnsalamentPage} />
                <PrivateRoute
                  exact
                  path="/ensalamento/gerar"
                  component={GenerateEnsalamentPage}
                />

                <PrivateRoute exact path="/predio" component={BuildingList} />
                <PrivateRoute
                  exact
                  path="/predio/criar"
                  component={BuildingForm}
                />
                <PrivateRoute
                  exact
                  path="/predio/alterar/:id"
                  component={BuildingForm}
                />

                <PrivateRoute exact path="/sala" component={RoomList} />
                <PrivateRoute exact path="/sala/criar" component={RoomForm} />
                <PrivateRoute
                  exact
                  path="/sala/alterar/:id"
                  component={RoomForm}
                />

                <PrivateRoute exact path="/curso" component={CourseList} />
                <PrivateRoute
                  exact
                  path="/curso/criar"
                  component={CourseForm}
                />
                <PrivateRoute
                  exact
                  path="/curso/alterar/:id"
                  component={CourseForm}
                />

                <PrivateRoute exact path="/turma" component={TeamList} />
                <PrivateRoute exact path="/turma/criar" component={TeamForm} />
                <PrivateRoute
                  exact
                  path="/turma/alterar/:id"
                  component={TeamForm}
                />
                <PrivateRoute exact path="/tests" component={Tests} />
              </>
            )}
          />
        </Content>
      </Switch>
    </Router>
  );
};

export default Routes;
