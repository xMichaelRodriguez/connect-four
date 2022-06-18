import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
export const useGame = () => {
  const {
    changePlayerAndColor,
    gameState,
    handleChangeBoard,
    handlePassUsersToPlayer,
    handlePutToken,
    updateBoard,
    updatePlayers,
    winTieOrLostPlayer
  } = useContext(GameContext);

  return {
    changePlayerAndColor,
    gameState,
    handleChangeBoard,
    handlePassUsersToPlayer,
    handlePutToken,
    updateBoard,
    updatePlayers,
    winTieOrLostPlayer
  };
};
