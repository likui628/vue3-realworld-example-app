<template>
  <div class="banner">
    <div class="container">
      <h1>{{ article?.title }}</h1>
      <div class="article-meta">
        <ArticleMeta :article="article" @update-article="updateArticle" />
      </div>
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <ArticleContent :article="article" />
    </div>

    <hr />

    <div class="article-actions">
      <div class="article-meta">
        <ArticleMeta :article="article" @update-article="updateArticle" />
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <suspense>
          <template #default>
            <ArticleComments />
          </template>
          <template #fallback>
            <div class="card">
              <div class="card-block">Loading comments...</div>
            </div>
          </template>
        </suspense>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ArticleMeta from '../components/ArticleMeta.vue'
import ArticleContent from '../components/ArticleContent.vue'
import ArticleComments from '../components/ArticleComments.vue'
import { useRoute } from 'vue-router'

import { getArticleBySlug } from '../services/article/getArticle'
const route = useRoute()
const slug = route.params.slug as string

const article = ref<Article>(await getArticleBySlug(slug))

const updateArticle = (newArticle: Article) => {
  article.value = newArticle
}
</script>
