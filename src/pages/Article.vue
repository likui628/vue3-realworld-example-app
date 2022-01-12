<template>
  <div class="article-page">
    <suspense>
      <template #default>
        <ArticleDetail />
      </template>
      <template #fallback>
        <div class="container page">
          <div class="row article-content">Loading article...</div>
        </div>
      </template>
    </suspense>
  </div>
</template>
<script lang="ts" setup>
import ArticleDetail from '../components/ArticleDetail.vue'
</script>
