<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <ProfileHeader />
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
import ProfileHeader from '../components/ProfileHeader.vue'
import ArticleNavigation from '../components/ArticleNavigation.vue'
import ArticleList from '../components/ArticleList.vue'
</script>
