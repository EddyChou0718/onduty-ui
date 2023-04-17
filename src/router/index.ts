import { createRouter, createWebHistory } from 'vue-router';
import routerList from './routerList';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: routerList[0].path,
    },
    ...routerList,
  ],
});

export default router;
