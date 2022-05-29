import { Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';

import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { ModalComponent } from '../components/ModalComponent';
import { AuthContext } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalProvider';
import { routes } from './routes';
export const Navigation = () => {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { isOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (Object.entries(auth).length === 0) {
      history.replace('/');
    }
  }, []);
  return (
    <ModalProvider>
      <Flex justifyContent='center' align='center' h={'100vh'}>
        <Switch>
          {routes.map(({ name, path, component, exact }) => (
            <Route key={name} path={path} component={component} exact={exact} />
          ))}
          <Redirect to={routes[0].path} />
         
        </Switch>
       
      </Flex>
    </ModalProvider>
  );
};
