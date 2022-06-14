import { VStack } from '@chakra-ui/react';

import { ContainerGame } from '../components/ContainerGame';
import { Board } from '../components/Board';
import { HeadGame } from '../components/HeadGame';
import { FooterGame } from '../components/FooterGame';
export interface IPropsState {
  board: number[][];
  color: string;
  player: number;
  isWin: boolean;
}
export const GamePage = () => {
  return (
   
      <VStack mb={3} minH={'90%'} minW={'90%'}>
      <HeadGame />
        <ContainerGame>
          <Board />
        </ContainerGame>
        <FooterGame />
      </VStack>
  
  );
};
