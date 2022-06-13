import { Td } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { GameContext } from '../context/GameContext';
interface IProps {
  colIndex: number;
  rowIndex: number;
}

export const RowComp = ({ colIndex, rowIndex }: IProps) => {
  const { board, handlePutToken, players } = useContext(GameContext);
  const [state, setstate] = useState('');

  const handleClick = async () => {
    handlePutToken({ rowIndex, currentPlayer: players.users[0].token });
  };

  useEffect(() => {
    if (board[colIndex][rowIndex] === 1) {
      setstate('red');
    } else if (board[colIndex][rowIndex] === 2) {
      setstate('blue');
    } else {
      setstate('transparent');
    }

    return () => setstate('transparent');
  }, [board]);

  return (
    <Td onClick={handleClick} borderRadius={'30%'} borderWidth={'0.1em'} bg={state} h='4em' w='4em'></Td>
  );
};
