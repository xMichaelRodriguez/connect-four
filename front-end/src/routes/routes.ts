import { AuthPage } from '../features/Auth/pages/AuthPage';
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
    name: 'home',
    path: '/soloq',
  },
];
