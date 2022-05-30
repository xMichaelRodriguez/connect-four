import { AuthPage } from '../features/Auth/pages/AuthPage';
import { GameScreen } from '../features/game/page/GameScreen';
import { HomeQueue } from '../features/home/pages/HomeQueue';
import { IRoutes } from '../interfaces';

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
    path: '/soloq',
  },
  {
    component: GameScreen,
    exact: false,
    name: 'game',
    path: '/game',
  },
];
