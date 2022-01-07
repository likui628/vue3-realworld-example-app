<template>
  <ArticlePreview
    :article="article"
    v-for="(article, index) in articles"
    :key="index"
    @update="(newArticle) => updateArticle(index, newArticle)"
  />
  <div class="article-preview" v-if="articles.length === 0">
    No articles are here... yet.
  </div>
  <ArticlePagination
    :page="page"
    :count="articlesCount"
    @page-change="changePage"
  />
</template>

<script lang="ts">
export default {
  name: 'PopularTags',
}
</script>

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
