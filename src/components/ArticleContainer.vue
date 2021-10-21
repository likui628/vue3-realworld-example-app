<template>
  <ArticleNavigation />
  <ArticlePreview />
  <ArticlePagination />
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
    const { page, changePage, fetchArticles, articles } = useArticles()

    return { articles }
  },
})
</script>
