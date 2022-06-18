import React from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// hooks
import { useAuth } from '../../../hook/useAuth';

// utils
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ShowBoxPosition } from '../components/ShowBoxPosition';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';
interface Props {
  handleEntryGame: () => void;
}

export const LobbyView = ({ handleEntryGame }: Props) => {
  const { authState } = useAuth();
  const { players } = authState;
  return (
    <>
      <ContainerComponent>
        <Flex mb={3} w={'100%'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
          {players.map((user) => (
            <FaceUpAnimateComponent key={user.id}>
              <ShowBoxPosition user={user} key={user.id} />
            </FaceUpAnimateComponent>
          ))}
        </Flex>
        <Stack spacing={4} mt={10}>
          <FaceUpAnimateComponent>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button variant={'solid'} colorScheme='teal' onClick={handleEntryGame}>
                Entry Game
              </Button>
            </motion.div>
          </FaceUpAnimateComponent>
        </Stack>
      </ContainerComponent>
    </>
  );
};
