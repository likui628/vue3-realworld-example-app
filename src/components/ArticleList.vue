<template>
  <ArticlePreview
    :article="article"
    v-for="(article, index) in articles"
    :key="index"
    @update="(newArticle) => updateArticle(index, newArticle)"
  />
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

const {
  page,
  articlesCount,
  changePage,
  fetchArticles,
  articles,
  updateArticle,
} = useArticles()

await fetchArticles()
</script>
