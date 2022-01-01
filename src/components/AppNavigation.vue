<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <app-link class="navbar-brand" name="global-feed"> conduit </app-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item" v-for="link in navLinks" :key="link.name">
          <!-- Add "active" class when you're on that page" -->
          <app-link
            class="nav-link"
            active-class="active"
            :name="link.name"
            :params="link.params"
          >
            <i v-if="link.icon" :class="link.icon" /> {{ link.title }}
          </app-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import AppLink from './AppLink.vue'
import { AppRouteNames } from '../router'
import { RouteParams } from 'vue-router'
import { userStore } from '../store/user'

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'guest' | 'authorized'
}

const store = userStore()

const username = computed(() => store.user?.username)
const displayStatus = computed(() => (username.value ? 'authorized' : 'guest'))

const allLinks = computed<NavLink[]>(() => [
  {
    name: 'global-feed',
    title: 'Home',
    display: 'all',
  },
  {
    name: 'editor',
    title: 'New Article',
    display: 'authorized',
  },
  {
    name: 'login',
    title: 'Sign in',
    display: 'guest',
  },
  {
    name: 'register',
    title: 'Sign up',
    display: 'guest',
  },
  {
    name: 'settings',
    title: 'Settings',
    display: 'authorized',
    icon: 'ion-gear-a',
  },
  {
    name: 'profile',
    params: { username: username.value },
    title: username.value || '',
    display: 'authorized',
  },
])

const navLinks = computed(() =>
  allLinks.value.filter(
    (l) => l.display === 'all' || l.display === displayStatus.value
  )
)
</script>
