import { createRouter, createWebHashHistory, RouteParams } from 'vue-router'

import Home from './pages/Home.vue'

export type AppRouteNames =
  | 'global-feed'
  | 'feed'
  | 'login'
  | 'tag'
  | 'register'
  | 'settings'
  | 'profile'
  | 'profile-favorites'
  | 'editor'
  | 'article'
  | 'create-article'
  | 'edit-article'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'global-feed',
      path: '/',
      component: Home,
    },
    {
      name: 'feed',
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
    {
      name: 'profile',
      path: '/@:username',
      component: () => import('./pages/Profile.vue'),
    },
    {
      name: 'profile-favorites',
      path: '/@:username/favorites',
      component: () => import('./pages/Profile.vue'),
    },
    {
      name: 'article',
      path: '/article/:slug',
      component: () => import('./pages/Article.vue'),
    },
    {
      name: 'create-article',
      path: '/editor',
      component: () => import('./pages/EditArticle.vue'),
    },
    {
      name: 'edit-article',
      path: '/editor/:slug',
      component: () => import('./pages/EditArticle.vue'),
    },
  ],
})

export async function routerPush(
  name: AppRouteNames,
  params?: RouteParams
): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return await router.push({
      name,
      params,
    })
  } else {
    return await router.push({
      name,
    })
  }
}
