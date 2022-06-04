import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { ContainerGame } from '../components/ContainerGame';
import { UserPointsLeft } from '../components/UserPointsLeft';
import { UserPointsRight } from '../components/UserPointsRight';

export const GamePage = () => {
  return (
    <VStack w='full' h='full'>
      <Flex justifyContent={'space-around'} w='full'>
        <UserPointsLeft />
        <UserPointsRight />
      </Flex>

      <ContainerGame maxH='37.5em' maxW='67.5em'>
        <h1>Game</h1>
      </ContainerGame>
    </VStack>
  );
};
