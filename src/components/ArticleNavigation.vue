<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-for="link in links" :key="link.name">
        <AppLink
          class="nav-link"
          active-class="active"
          :name="link.routeName"
          :params="link.routeParams"
        >
          <i v-if="link.icon" :class="link.icon" /> {{ link.title }}
        </AppLink>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { userStore } from '../store/user'
import { AppRouteNames } from '../router'
import { RouteParams } from 'vue-router'
import { useRoute } from 'vue-router'

import AppLink from './AppLink.vue'

interface NavLink {
  name: string
  routeName: AppRouteNames
  routeParams?: RouteParams
  title: string
  show: true | false
  icon?: string
}

const props = defineProps({
  tag: String,
  username: String,
})

const store = userStore()
const username = computed(() => store.user?.username)

const route = useRoute()
const tag = computed(() =>
  typeof route.params.tag === 'string' ? route.params.tag : ''
)

const allLinks = computed<NavLink[]>(() => [
  {
    name: 'feed',
    routeName: 'feed',
    title: 'Your Feed',
    show: username.value ? true : false,
  },
  {
    name: 'global-feed',
    routeName: 'global-feed',
    title: 'Global Feed',
    show: true,
  },
  {
    name: 'tag-feed',
    routeName: 'tag',
    routeParams: { tag: tag.value },
    title: tag.value,
    icon: 'ion-pound',
    show: tag.value ? true : false,
  },
])
const links = computed(() => allLinks.value.filter((link) => link.show))
</script>
