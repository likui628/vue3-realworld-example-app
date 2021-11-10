<template>
  <ArticleNavigation :tag="tag" />
  <ArticlePreview :article="article" v-for="article in articles" />
  <ArticlePagination
    :page="page"
    :count="articlesCount"
    @page-change="changePage"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useArticles } from '../composable/useArticles'
import ArticleNavigation from './ArticleNavigation.vue'
import ArticlePreview from './ArticlePreview.vue'
import ArticlePagination from './ArticlePagination.vue'

export default defineComponent({
  name: 'ArticleContainer',
  components: { ArticleNavigation, ArticlePreview, ArticlePagination },
  async setup() {
    const { tag, page, articlesCount, changePage, fetchArticles, articles } =
      useArticles()
    await fetchArticles()
    return { tag, page, articles, articlesCount, changePage }
  },
})
</script>
