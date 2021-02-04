import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import history from './history';
import Login from '../pages/Login';
import Content from '../pages/Common/Content';
import Ensalament from '../pages/Ensalament';
import { BuildingList, BuildingForm } from '../pages/Building';
import { RoomList, RoomForm } from '../pages/Room';
import { CourseList, CourseForm } from '../pages/Course';
import { TeamList, TeamForm } from '../pages/Team';
import Tests from '../pages/_Tests';
import Backdrop from '../pages/Common/Backdrop';

const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Content>
          <Route
            component={() => (
              <>
                <Backdrop />
                <PrivateRoute exact path="/" component={Ensalament} />

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
