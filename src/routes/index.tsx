import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from './history';
import Login from '../pages/Login';
import Content from '../pages/Common/Content';
import Ensalament from '../pages/Ensalament';
import { BuildingList, BuildingForm } from '../pages/Building';
import { RoomList, RoomForm } from '../pages/Room';
import { CourseList, CourseForm } from '../pages/Course';
import { TeamList, TeamForm } from '../pages/Team';
import Tests from '../pages/_Tests';

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Content>
          <Route
            component={() => (
              <>
                <Route exact path="/" render={() => <Ensalament />} />

                <Route exact path="/predio" render={() => <BuildingList />} />
                <Route
                  exact
                  path="/predio/criar"
                  render={() => <BuildingForm />}
                />
                <Route
                  exact
                  path="/predio/alterar/:id"
                  render={() => <BuildingForm />}
                />

                <Route exact path="/sala" render={() => <RoomList />} />
                <Route exact path="/sala/criar" render={() => <RoomForm />} />
                <Route
                  exact
                  path="/sala/alterar/:id"
                  render={() => <RoomForm />}
                />

                <Route exact path="/curso" render={() => <CourseList />} />
                <Route
                  exact
                  path="/curso/criar"
                  render={() => <CourseForm />}
                />
                <Route
                  exact
                  path="/curso/alterar/:id"
                  render={() => <CourseForm />}
                />

                <Route exact path="/turma" render={() => <TeamList />} />
                <Route exact path="/turma/criar" render={() => <TeamForm />} />
                <Route
                  exact
                  path="/turma/alterar/:id"
                  render={() => <TeamForm />}
                />
                <Route exact path="/tests" render={() => <Tests />} />
              </>
            )}
          />
        </Content>
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;
