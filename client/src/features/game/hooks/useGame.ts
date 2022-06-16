import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
export const useGame = () => {
  const {
    changePlayer,
    gameState,
    handleChangeBoard,
    handlePutToken,
    handlePassUsersToPlayer,
    updatePlayers,
    updateBoard,
  } = useContext(GameContext);

  return {
    changePlayer,
    gameState,
    handleChangeBoard,
    handlePutToken,
    handlePassUsersToPlayer,
    updatePlayers,
    updateBoard,
  };
};
