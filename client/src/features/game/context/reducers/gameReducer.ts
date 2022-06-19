import { IGame, IGameState } from '../../interface/game.interface';

export enum typesGame {
  CHANGE_ACTIVE_PLAYERS = '[GAME] change active player of game',
  SET_PLAYERS = '[GAME] set player  state',
  CHANGE_COLOR = '[GAME] change color active player',
  PLAYERS_IN_GAME = '[GAME] pass the users from the authcontext to the gamecontext',
  UPDATE_BOARD = '[GAME] update board',
  RESET_BOARD = '[GAME] reset board game',
}
type gameActions =
  | { type: typesGame.CHANGE_ACTIVE_PLAYERS; payload: number }
  | { type: typesGame.SET_PLAYERS; payload: IGame[] }
  | { type: typesGame.CHANGE_COLOR; payload: string }
  | { type: typesGame.PLAYERS_IN_GAME; payload: IGame[] }
  | { type: typesGame.RESET_BOARD; payload: number[][] }
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

    case typesGame.CHANGE_ACTIVE_PLAYERS:
      return {
        ...state,
        playerActive: action.payload,
      };
    case typesGame.CHANGE_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case typesGame.UPDATE_BOARD:
      return { ...state, board: [...action.payload] };

    case typesGame.RESET_BOARD:
      return { ...state, board: action.payload };

    default:
      return state;
  }
};
