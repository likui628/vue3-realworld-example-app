<template>
  <ArticleNavigation :tag="tag" />
  <ArticlePreview :article="article" v-for="article in articles" />
  <ArticlePagination
    :page="page"
    :count="articlesCount"
    @page-change="changePage"
  />
</template>

<script lang="ts" setup>
import { useArticles } from '../composable/useArticles'
import ArticleNavigation from './ArticleNavigation.vue'
import ArticlePreview from './ArticlePreview.vue'
import ArticlePagination from './ArticlePagination.vue'

const { tag, page, articlesCount, changePage, fetchArticles, articles } =
  useArticles()
await fetchArticles()
</script>
