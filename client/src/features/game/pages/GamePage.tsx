import { useContext } from 'react';
import { Box, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';

import { ContainerGame } from '../components/ContainerGame';
import { Board } from '../components/Board';
import { HeadGame } from '../components/HeadGame';
import { GameContext } from '../context/GameContext';

export interface IPropsState {
  board: number[][];
  color: string;
  player: number;
  isWin: boolean;
}
export const GamePage = () => {
  return (
    <VStack mb={3} maxH={'90%'} maxW={'90%'}>
      <HeadGame />

      <ContainerGame maxH='33.7em' maxW='50.5em'>
        <Board />
      </ContainerGame>
    </VStack>
  );
};
