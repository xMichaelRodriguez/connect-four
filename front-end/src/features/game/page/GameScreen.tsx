import { Box, Flex, Tag, TagLabel, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { AuthContext, User } from '../../../context/AuthContext';
import { UserBoxLeft } from '../components/UserBoxLeft';
import { UserBoxRight } from '../components/UserBoxRight';

export const GameScreen = () => {
  const { users, auth } = useContext(AuthContext);

  return (
    <ContainerComponent>
      <Flex w={'100%'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
        {users.map((user: User) => {
          return user.id === auth.id ? <UserBoxLeft user={user} /> : <UserBoxRight user={user} />;
        })}
      </Flex>
    </ContainerComponent>
  );
};
