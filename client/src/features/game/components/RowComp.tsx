import { Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hook/useAuth';

import { useGame } from '../hooks/useGame';

import { IGame } from '../interface';
interface IProps {
  colIndex: number;
  rowIndex: number;
}

export const RowComp = ({ colIndex, rowIndex }: IProps) => {
  const { handlePutToken, gameState } = useGame();
  const { players, playerActive, board } = gameState;
  const { authState } = useAuth();
  const { auth } = authState;

  const [counter, setCounter] = useState(0);
  const [state, setstate] = useState('');
  const [currentPlayerNotActive, setCurrentPlayerNotActive] = useState(false);

  const handleClick = async () => {
    setCounter(counter + 1);

    if (counter === 0) {
      if (!currentPlayerNotActive) {
        const isValidPlayer: IGame | undefined = players.find(
          (user) => user.id === auth.id && playerActive === user.token
        );
        if (!!isValidPlayer) {
          handlePutToken({ rowIndex, currentPlayer: isValidPlayer });
          setCounter(0);
        }
      }
    }
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

  useEffect(() => {
    const isValid = players.some((user) => user.id === auth.id && user.token !== playerActive);
    setCurrentPlayerNotActive(isValid);
  }, [playerActive, players]);

  return (
    <Td
      cursor={currentPlayerNotActive ? 'not-allowed' : ''}
      onClick={handleClick}
      borderRadius={'30%'}
      borderWidth={'0.1em'}
      bg={state}
      h='4em'
      w='4em'
    ></Td>
  );
};
