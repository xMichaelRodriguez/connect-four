import { Box, Flex, HStack, Tag, TagLabel, TagLeftIcon, VStack } from '@chakra-ui/react';
import { ContainerGame } from '../components/ContainerGame';
import { UserPointsLeft } from '../components/UserPointsLeft';
import { UserPointsRight } from '../components/UserPointsRight';
import { Board } from '../components/Board';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import { SiGamejolt } from 'react-icons/si';
import { useState } from 'react';

import { GameProvider } from '../context/GameProvider';

export interface IPropsState {
  board: number[][];
  color: string;
  player: number;
  isWin: boolean;
}
export const GamePage = () => {
  const [state, setState] = useState<IPropsState>({
    board: Array(6)
      .fill(0)
      .map(() => Array(7).fill(null)),
    color: 'red',
    player: 1,
    isWin: false,
  });
  return (
    <VStack maxH={'full'} maxW={'full'}>
      <Flex
        justifyContent={'space-around'}
        flexDir={['column', 'column', 'row']}
        gap='2'
        maxW={'full'}
        px='2'
      >
        <UserPointsLeft />
        <HStack>
          <Tag my='0.5em' variant={'subtle'} colorScheme='messenger' py={'0.5em'}>
            <TagLeftIcon boxSize={'1.5em'} as={AiOutlineNodeIndex} />
            <TagLabel fontSize={'1.5em'}>Connect 4 </TagLabel>
          </Tag>
        </HStack>
        <UserPointsRight />
      </Flex>

      <VStack>
        <Tag my='0.5em' variant={'subtle'} colorScheme='blackAlpha.500' py={'0.5em'}>
          <TagLeftIcon boxSize={'1.5em'} as={SiGamejolt} />
          <TagLabel fontSize={'1.5em'}>Current Player: You </TagLabel>
        </Tag>

        <Box display='block' bg='red.500' h='3.5em' w='3.5em' borderRadius={'100%'}></Box>
      </VStack>
      <ContainerGame maxH='33.5em' maxW='50.5em'>
        <GameProvider>
          <Board {...state} />
        </GameProvider>
      </ContainerGame>
    </VStack>
  );
};
