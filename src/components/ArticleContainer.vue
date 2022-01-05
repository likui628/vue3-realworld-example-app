<template>
  <div class="feed-toggle">
    <ArticleNavigation useGlobalFeed useMyFeed useTagFeed />
  </div>

  <suspense>
    <template #default>
      <ArticleList />
    </template>
    <template #fallback>
      <div class="article-preview">Loading articles...</div>
    </template>
  </suspense>
</template>

<script lang="ts" setup>
import ArticleNavigation from './ArticleNavigation.vue'

import ArticleList from './ArticleList.vue'
</script>
