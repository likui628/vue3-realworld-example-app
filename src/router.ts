import { createRouter, createWebHashHistory, RouteParams } from 'vue-router'

import Home from './pages/Home.vue'

export type AppRouteNames = 'global-feed' | 'tag'

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
