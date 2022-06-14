import { useContext, useEffect, useState } from 'react';
import { Box, Flex, HStack, Tag, TagLabel, TagRightIcon, Text, VStack } from '@chakra-ui/react';
import { AiOutlineNodeIndex } from 'react-icons/ai';

import { UserPointsLeft } from '../components/UserPointsLeft';
import { UserPointsRight } from '../components/UserPointsRight';
import { GameContext, Player } from '../context/GameContext';
import { socket } from '../../../lib/sockets';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';

export const HeadGame = () => {
  const { players, updatePlayers, color, changePlayer } = useContext(GameContext);

  useEffect(() => {
    socket.on('current-user', (currentUser) => {
      changePlayer({ currentUser });
    });
    return () => {
      socket.off('current-user');
    };
  }, []);

  useEffect(() => {
    socket.on('game:update-active-user', (data: number) => {
      console.log({ data });
      changePlayer({ currentUser: data });
    });
    return () => {
      socket.off('game:update-active-user');
    };
  }, []);

  useEffect(() => {
    if (Object.values(players.users).length > 0) socket.emit('game:colorUser', players.users);

    return () => {
      socket.off('game:colorUser');
    };
  }, []);

  useEffect(() => {
    socket.on('game:new-color-User', (users: Player[]) => {
      updatePlayers(users);
    });
    return () => {
      socket.off('game:new-color-User');
    };
  }, [updatePlayers]);
  return (
    <>
      <HStack>
        <FaceUpAnimateComponent>
          <Tag minW={'100%'} variant={'subtle'} colorScheme='messenger' py={'0.5em'}>
            <TagRightIcon boxSize={'1.5em'} as={AiOutlineNodeIndex} ml='auto' />
            <TagLabel fontSize={'1.5em'} mr='auto'>
              Connect 4{' '}
            </TagLabel>
          </Tag>
        </FaceUpAnimateComponent>
      </HStack>
      <FaceUpAnimateComponent>
        <Flex justifyContent={'space-between'} flexDir={['column', 'row', 'row']} gap={5}>
          <UserPointsLeft />
          <UserPointsRight />
        </Flex>
      </FaceUpAnimateComponent>

      <VStack>
        <FaceUpAnimateComponent>
          <Tag variant={'subtle'} colorScheme='blackAlpha.500' py={'0.5em'} my={3}>
            <Text fontWeight={'bold'} display='block' px={3}>
              Current Player:
            </Text>

            <TagLabel textAlign='center'>
              <Box display='block' bg={color} h='2em' w='2em' borderRadius={'100%'}></Box>
            </TagLabel>
          </Tag>
        </FaceUpAnimateComponent>
      </VStack>
    </>
  );
};
