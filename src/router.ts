import { createRouter, createWebHashHistory, RouteParams } from 'vue-router'

import Home from './pages/Home.vue'

export type AppRouteNames =
  | 'global-feed'
  | 'login'
  | 'tag'
  | 'register'
  | 'settings'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'global-feed',
      path: '/',
      component: Home,
    },
    {
      name: 'tag',
      path: '/tag/:tag',
      component: Home,
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./pages/Login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('./pages/Register.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('./pages/Settings.vue'),
    },
  ],
})

export function routerPush(
  name: AppRouteNames,
  params?: RouteParams
): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    })
  } else {
    return router.push({
      name,
    })
  }
}
