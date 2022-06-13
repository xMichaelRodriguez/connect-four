import { useContext, useEffect, useState } from 'react';
import { Box, Flex, HStack, Tag, TagLabel, TagRightIcon, Text, VStack } from '@chakra-ui/react';
import { AiOutlineNodeIndex } from 'react-icons/ai';

import { UserPointsLeft } from '../components/UserPointsLeft';
import { UserPointsRight } from '../components/UserPointsRight';
import { GameContext, Player } from '../context/GameContext';
import { socket } from '../../../lib/sockets';

export const HeadGame = () => {
  const { players, updatePlayers, color, changePlayer } = useContext(GameContext);

  useEffect(() => {
    socket.on('current-user', (currentUser) => {
      changePlayer({ currentUser });
    });
  }, []);

  // useEffect(() => {
  //   const newcolor = players.users.find((user) => user.token === currentPlayer && user.color);
  //   if (newcolor !== undefined) {
  //     console.log({newcolor});
  //     setColor(newcolor.color);
  //   }
  // }, [color]);

  useEffect(() => {
    if (Object.values(players.users).length > 0) socket.emit('game:colorUser', players.users);
  }, []);

  useEffect(() => {
    socket.on('game:new-color-User', (users: Player[]) => {
      updatePlayers(users);
    });
  }, [updatePlayers]);
  return (
    <>
      <HStack>
        <Tag minW={'100%'} variant={'subtle'} colorScheme='messenger' py={'0.5em'}>
          <TagRightIcon boxSize={'1.5em'} as={AiOutlineNodeIndex} ml='auto' />
          <TagLabel fontSize={'1.5em'} mr='auto'>
            Connect 4{' '}
          </TagLabel>
        </Tag>
      </HStack>
      <Flex justifyContent={'space-between'} flexDir={['column', 'row', 'row']} gap={5}>
        <UserPointsLeft />
        <UserPointsRight />
      </Flex>

      <VStack>
        <Tag variant={'subtle'} colorScheme='blackAlpha.500' py={'0.5em'} my={3}>
          <Text fontWeight={'bold'} display='block' px={3}>
            Current Player:
          </Text>

          <TagLabel textAlign='center'>
            <Box display='block' bg={color} h='2em' w='2em' borderRadius={'100%'}></Box>
          </TagLabel>
        </Tag>
      </VStack>
    </>
  );
};
