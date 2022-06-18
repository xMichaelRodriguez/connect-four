import { VStack } from '@chakra-ui/react';

import { ContainerGame } from '../components/ContainerGame';
import { Board } from '../components/Board';
import { HeadGame } from '../components/HeadGame';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';
export interface IPropsState {
  board: number[][];
  color: string;
  player: number;
  isWin: boolean;
}
export const GamePage = () => {
  return (
    <VStack mb={3} minH={'80%'} minW={'80%'}>
      <HeadGame />
      <FaceUpAnimateComponent>
        <ContainerGame>
          <Board />
        </ContainerGame>
      </FaceUpAnimateComponent>
    </VStack>
  );
};
