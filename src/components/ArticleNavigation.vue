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
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../store'
import AppLink from './AppLink.vue'

export default defineComponent({
  name: 'ArticleNavigation',
  components: { AppLink },
  props: {
    tag: { type: String, required: false },
    username: { type: String, required: false },
  },
  setup(props) {
    const store = useStore()
    const username = computed(() => store.getters.user?.username)
    const allLinks = computed<any[]>(() => [
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
        routeParams: { tag: props.tag },
        title: props.tag,
        icon: 'ion-pound',
        show: props.tag ? true : false,
      },
    ])
    const links = computed(() => allLinks.value.filter((link) => link.show))
    return { links }
  },
})
</script>
