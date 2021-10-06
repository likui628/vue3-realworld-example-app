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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppLink from './AppLink.vue'
import { AppRouteNames } from '../router'
import { RouteParams } from 'vue-router'

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}

export default defineComponent({
  name: 'AppNavigation',
  components: { AppLink },
  setup() {
    const navLinks = ref<NavLink[]>([
      {
        name: 'global-feed',
        title: 'Home',
        display: 'all',
      },
      {
        name: 'login',
        title: 'Sign in',
        display: 'all',
      },
      {
        name: 'register',
        title: 'Sign up',
        display: 'all',
      },
      {
        name: 'settings',
        title: 'Settings',
        display: 'authorized',
        icon: 'ion-gear-a',
      },
    ])
    return { navLinks }
  },
})
</script>
