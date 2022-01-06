<template>
  <div class="article-preview">
    <div class="article-meta">
      <AppLink
        class="preview-link"
        name="profile"
        :params="{ username: article.author.username }"
      >
        <img :src="article.author.image" />
      </AppLink>
      <div class="info">
        <AppLink
          class="author"
          name="profile"
          :params="{ username: article.author.username }"
        >
          {{ article.author.username }}
        </AppLink>
        <span class="date">
          {{ new Date(article.createdAt).toDateString() }}
        </span>
      </div>
      <button
        class="btn btn-sm pull-xs-right"
        :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
        @click="() => favoriteArticle()"
        :disabled="favoriteArticlePending"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <AppLink
      name="article"
      :params="{ slug: article.slug }"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in article.tagList"
          :key="tag"
          class="tag-default tag-pill tag-outline"
        >
          {{ tag }}
        </li>
      </ul>
    </AppLink>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useFavoriteArticle } from '../composable/useFavoriteArticle'
import AppLink from './AppLink.vue'

interface Props {
  article: Article
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update', article: Article): void
}
const emit = defineEmits<Emits>()

const { favoriteArticle, favoriteArticlePending } = useFavoriteArticle({
  isFavorited: computed(() => props.article.favorited),
  articleSlug: computed(() => props.article.slug),
  onUpdate: (newArticle) => emit('update', newArticle),
})
</script>
