import { Flex } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { routes } from './routes';
export const Navigation = () => {
  return (
    <Router>
      <Flex justifyContent='center' align='center' h={'100vh'}>
        <Switch>
          {routes.map(({ name, path, component }) => (
            <Route key={name} path={path} component={component} exact />
          ))}
          <Redirect to={routes[0].path} />
        </Switch>
      </Flex>
    </Router>
  );
};
