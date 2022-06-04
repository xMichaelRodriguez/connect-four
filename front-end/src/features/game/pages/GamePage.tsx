import { Flex, Heading, Tag, TagLabel, TagLeftIcon, VStack } from '@chakra-ui/react';
import React from 'react';
import { ContainerGame } from '../components/ContainerGame';
import { UserPointsLeft } from '../components/UserPointsLeft';
import { UserPointsRight } from '../components/UserPointsRight';
import { Board } from '../components/Board';
import { AiOutlineNodeIndex } from 'react-icons/ai';
export const GamePage = () => {
  return (
    <VStack w='full' h='full'>
      <Flex justifyContent={'space-around'} w='full'>
        <UserPointsLeft />
        <Tag my='0.5em' variant={'subtle'} colorScheme='messenger' py={'0.5em'}>
          <TagLeftIcon boxSize={'1.5em'} as={AiOutlineNodeIndex} />
          <TagLabel fontSize={'1.5em'}>Connect 4 </TagLabel>
        </Tag>
        <UserPointsRight />
      </Flex>

      <ContainerGame maxH='37.5em' maxW='67.5em'>
        <Board />
      </ContainerGame>
    </VStack>
  );
};
