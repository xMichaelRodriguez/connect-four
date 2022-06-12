import { AuthPage } from '../features/Auth/pages/AuthPage';
import { LobbyPage } from '../features/lobby/page/LobbyPage';
import { HomeQueue } from '../features/home/pages/HomeQueue';
import { IRoutes } from '../interfaces';
import { GamePage } from '../features/game/pages/GamePage';

export const routes: IRoutes[] = [
  {
    component: AuthPage,
    exact: true,
    name: 'Auth',
    path: '/',
  },
  {
    component: HomeQueue,
    exact: false,
    name: 'queue',
    path: '/queue',
  },
  {
    component: LobbyPage,
    exact: true,
    name: 'Lobby',
    path: '/lobby',
  },
  {
    component: GamePage,
    exact: true,
    name: 'game',
    path: '/game',
  },
];
