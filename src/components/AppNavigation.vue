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
import { defineComponent, ref, computed } from 'vue'
import AppLink from './AppLink.vue'
import { AppRouteNames } from '../router'
import { RouteParams } from 'vue-router'
import { useStore } from 'vuex'

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'guest' | 'authorized'
}

export default defineComponent({
  name: 'AppNavigation',
  components: { AppLink },
  setup() {
    const store = useStore()
    const username = computed(() => store.getters.user?.username)
    const allLinks = ref<NavLink[]>([
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
        (link) =>
          link.display === 'all' ||
          link.display === (username.value ? 'authorized' : 'guest')
      )
    )
    return { navLinks }
  },
})
</script>
