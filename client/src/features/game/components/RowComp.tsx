import { Td } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { togglePlayer } from '../../../lib/utilsGame';

import { GameContext } from '../context/GameContext';
interface IProps {
  colIndex: number;
  rowIndex: number;
}
const initialPlayer = Math.floor(Math.random() * 2) + 1;
export const RowComp = ({ colIndex, rowIndex }: IProps) => {
  const { board, handlePutToken } = useContext(GameContext);
  const [state, setstate] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);

  const handleClick = async () => {
    console.log({ currentPlayer });
    handlePutToken({ rowIndex, currentPlayer });
    const newCurrentPlayer = await togglePlayer(currentPlayer);
    setCurrentPlayer(newCurrentPlayer);
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
    <Td onClick={handleClick} borderRadius={'30%'} borderWidth={'0.1em'} bg={state} h='5em' w='5em'></Td>
  );
};
