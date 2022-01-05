<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile?.image" class="user-img" />
            <h4>{{ profile?.username }}</h4>
            <p>
              {{ profile?.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profile?.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ArticleNavigation useUserFeed useUserFavorited />
          </div>
          <suspense>
            <template #default>
              <ArticleList />
            </template>
            <template #fallback>
              <div class="article-preview">Loading articles...</div>
            </template>
          </suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProfile } from '../services/profile/getProfile'
import ArticleNavigation from '../components/ArticleNavigation.vue'
import ArticleList from '../components/ArticleList.vue'

const route = useRoute()

const profile = ref<Profile>()

onMounted(async () => {
  const username = route.params.username as string
  profile.value = await getProfile(username)
})

const articles = ref<Array<Article>>([
  {
    author: {
      bio: '',
      following: false,
      image: 'https://api.realworld.io/images/demo-avatar.png',
      username: 'Gerome',
    },
    body: 'Share your knowledge and enpower the community by creating a new implementation',
    createdAt: '2021-11-24T12:11:08.212Z',
    description: 'join the community by creating a new implementation',
    favorited: false,
    favoritesCount: 634,
    slug: 'Create-a-new-implementation-1',
    tagList: ['implementations'],
    title: 'Create a new implementation',
    updatedAt: '2021-11-24T12:11:08.212Z',
  },
])
</script>
