<template>
  <ul class="nav nav-pills outline-active">
    <li class="nav-item" v-for="link in links" :key="link.routeName">
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
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { userStore } from '../store/user'
import { AppRouteNames } from '../router'
import { RouteParams } from 'vue-router'
import { useRoute } from 'vue-router'

import AppLink from './AppLink.vue'

interface Props {
  useGlobalFeed?: boolean
  useMyFeed?: boolean
  useTagFeed?: boolean
  useUserFeed?: boolean
  useUserFavorited?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  useGlobalFeed: false,
  useMyFeed: false,
  useTagFeed: false,
  useUserFavorited: false,
  useUserFeed: false,
})

const store = userStore()
const username = computed(() => store.user?.username)

const route = useRoute()
const tag = computed(() =>
  typeof route.params.tag === 'string' ? route.params.tag : ''
)

interface NavLink {
  routeName: AppRouteNames
  routeParams?: RouteParams
  title: string
  show: true | false
  icon?: string
}

const allLinks = computed<NavLink[]>(() => [
  {
    routeName: 'feed',
    title: 'Your Feed',
    show: props.useMyFeed && username.value ? true : false,
  },
  {
    routeName: 'global-feed',
    title: 'Global Feed',
    show: props.useGlobalFeed,
  },
  {
    routeName: 'tag',
    routeParams: <RouteParams>{ tag: tag.value },
    title: tag.value,
    icon: 'ion-pound',
    show: props.useTagFeed && tag.value ? true : false,
  },
  {
    routeName: 'profile',
    title: 'My Articles',
    routeParams: <RouteParams>{ username: 'Gerome' },
    show: props.useUserFeed,
  },
  {
    routeName: 'profile-favorites',
    title: 'Favorited Articles',
    routeParams: <RouteParams>{ username: 'Gerome' },
    show: props.useUserFavorited,
  },
])
const links = computed(() => allLinks.value.filter((link) => link.show))
</script>
