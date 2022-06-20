import { Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalProvider';
import { routes } from './routes';

export function Navigation() {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    if (Object.entries(authState.auth).length === 0) {
      history.replace('/');
    }
  }, []);
  return (
    <ModalProvider>
      <Flex justifyContent="center" align="center" h="100vh">
        <Switch>
          {routes.map(({
            name, path, component, exact,
          }) => (
            <Route key={name} path={path} component={component} exact={exact} />
          ))}
          <Redirect to={routes[0].path} />
        </Switch>
      </Flex>
    </ModalProvider>
  );
}
