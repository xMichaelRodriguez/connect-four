import { AuthPage } from '../features/Auth/pages/AuthPage';
import { HomeQueue } from '../features/home/pages/HomeQueue';

export const routes = [
  {
    name: 'Auth',
    path: '/login',
    component: AuthPage,
  },
  {
    name: 'home queue',
    path: '/',
    component: HomeQueue,
  },
];
