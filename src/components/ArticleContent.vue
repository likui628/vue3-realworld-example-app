<template>
  <div v-html="articleHtml" class="col-xs-12" />

  <TagList :tags="article.tagList"/>
</template>
<script lang="ts" setup>
import { marked } from 'marked'
import { computed } from 'vue'
import TagList from './TagList.vue'

interface Props {
  article: Article
}
const { article } = defineProps<Props>()
const articleHtml = computed(() => marked(article.body))
</script>
