import { IGame, IGameState } from '../../interface/game.interface';

export enum typesGame {
  CHANGE_PLAYERS = '[GAME] change player of game',
  SET_PLAYERS = '[GAME] set player  state',
  CHANGE_COLOR = '[GAME] change color active player',
  PLAYERS_IN_GAME = '[GAME] pass the users from the authcontext to the gamecontext',
  UPDATE_BOARD = '[GAME] update board',
}
type gameActions =
  | { type: typesGame.CHANGE_PLAYERS; payload: IGame }
  | { type: typesGame.SET_PLAYERS; payload: IGame[] }
  | { type: typesGame.CHANGE_COLOR; payload: string }
  | { type: typesGame.PLAYERS_IN_GAME; payload: IGame[] }
  | { type: typesGame.UPDATE_BOARD; payload: number[][] };

export const gameReducer = (state: IGameState, action: gameActions): IGameState => {
  switch (action.type) {
    case typesGame.PLAYERS_IN_GAME:
      return {
        ...state,
        players: [...action.payload],
      };
    case typesGame.SET_PLAYERS:
      return { ...state, players: action.payload };

    default:
      return state;
  }
};
