<template>
  <div v-html="articleHtml" class="col-xs-12" />

  <ul class="tag-list">
    <li
      v-for="(tag, index) in article.tagList"
      :key="index"
      class="tag-pill tag-default tag-outline"
    >
      {{ tag }}
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { marked } from 'marked'
import { computed } from 'vue'

interface Props {
  article: Article
}
const { article } = defineProps<Props>()
const articleHtml = computed(() => marked(article.body))
</script>
