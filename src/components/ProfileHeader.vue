<template>
  <img :src="profile?.image" class="user-img" />
  <h4>{{ profile?.username }}</h4>
  <p>
    {{ profile?.bio }}
  </p>

  <app-link
    v-if="showEdit"
    name="settings"
    class="btn btn-sm btn-outline-secondary action-btn"
  >
    <i class="ion-gear-a"></i>
    &nbsp; Edit Profile Settings
  </app-link>
  <button v-else class="btn btn-sm btn-outline-secondary action-btn">
    <i class="ion-plus-round"></i>&nbsp;
    {{ profile?.following ? 'Unfollow' : 'Follow' }}
    {{ profile?.username }}
  </button>
</template>

<script lang="ts" setup>
import AppLink from '../components/AppLink.vue'
import { computed} from 'vue'
import { userStore } from '../store/user'
import { useRoute } from 'vue-router'
import { useProfile } from '../composable/useProfile'


const route = useRoute()
const username = computed(() => route.params?.username as string)

const { profile } = useProfile({ username })

const store = userStore()
const showEdit = computed(() => store.user?.username === username.value)
</script>
