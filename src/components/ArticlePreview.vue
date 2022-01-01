<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html" class="preview-link">
        <img :src="article.author.image" />
      </a>
      <div class="info">
        <a href="" class="author"> {{ article.author.username }}</a>
        <span class="date">
          {{ new Date(article.createdAt).toDateString() }}
        </span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> 29
      </button>
    </div>
    <a href="" class="preview-link">
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
    </a>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  article: Article
}

const props = defineProps<Props>()
</script>
