<template>
  <ArticlePreview :article="article" v-for="article in articles" />
  <ArticlePagination
    :page="page"
    :count="articlesCount"
    @page-change="changePage"
  />
</template>
<script lang="ts" setup>
import ArticlePreview from './ArticlePreview.vue'
import ArticlePagination from './ArticlePagination.vue'

import { useArticles } from '../composable/useArticles'

const { page, articlesCount, changePage, fetchArticles, articles } =
  useArticles()
await fetchArticles()
</script>
