import { Td } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { socket } from '../../../lib/sockets';

import { GameContext, Player } from '../context/GameContext';
interface IProps {
  colIndex: number;
  rowIndex: number;
}

export const RowComp = ({ colIndex, rowIndex }: IProps) => {
  const { board, handlePutToken, players, currentPlayer } = useContext(GameContext);
  const { auth } = useContext(AuthContext);


  const [state, setstate] = useState('');
  const [currentPlayerNotActive, setCurrentPlayerNotActive] = useState(false);
  
  
  const handleClick = async () => {
    if (!currentPlayerNotActive) {
      const isValidPlayer: Player | undefined = players.users.find(
        (user) => user.id === auth.id && currentPlayer === user.token
      );
      if (!!isValidPlayer) {
        handlePutToken({ rowIndex, currentPlayer: isValidPlayer });
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
    const isValid = players.users.some((user) => user.id === auth.id && user.token !== currentPlayer);
    setCurrentPlayerNotActive(isValid);
  }, [currentPlayer]);

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
